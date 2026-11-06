import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { gallery, photo, photoSrcSet } from '../data/site'
import { Img, SectionHead } from './ui'

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const move = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  )
  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
  }, [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open === null, close, move])

  const current = open === null ? null : gallery[open]

  return (
    <section id="galeria" className="bg-cream-200/50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Galeria" title="Um olhar por" script="dentro e por fora">
          Toque em uma foto para ampliar. No celular, arraste para o lado para passar; no computador, use as setas.
        </SectionHead>

        <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {gallery.map((g, i) => (
            <motion.li
              key={g.file}
              className="mb-3 break-inside-avoid sm:mb-4"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`Ampliar foto: ${g.caption}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-cream-200 shadow-sm ring-1 ring-ink/5"
              >
                <Img
                  name={g.file}
                  alt={g.alt}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className={`block w-full object-cover duration-700 group-hover:scale-105 ${
                    g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/75 to-transparent p-3 pt-10 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.caption}
                  <Maximize2 size={16} aria-hidden />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${open + 1} de ${gallery.length}: ${current.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <X aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                move(-1)
              }}
              aria-label="Foto anterior"
              className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                move(1)
              }}
              aria-label="Próxima foto"
              className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6"
            >
              <ChevronRight aria-hidden />
            </button>

            <motion.figure
              key={current.file}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={photo(current.file)}
                srcSet={photoSrcSet(current.file)}
                sizes="(min-width: 1024px) 896px, 100vw"
                alt={current.alt}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -400) move(1)
                  else if (info.offset.x > 60 || info.velocity.x > 400) move(-1)
                }}
                className="max-h-[78vh] w-auto max-w-full cursor-grab touch-pan-y rounded-2xl object-contain shadow-2xl select-none active:cursor-grabbing"
                draggable={false}
              />
              <figcaption className="mt-3 text-center text-white/90">
                <span className="font-display text-lg">{current.caption}</span>
                <span className="ml-3 text-sm text-white/60 tabular-nums">
                  {open + 1} / {gallery.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
