import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { tour } from '../data/site'
import { Img, SectionHead } from './ui'

function useWide() {
  const [wide, setWide] = useState(() => matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = matchMedia('(min-width: 1024px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

function Card({ item, i }: { item: (typeof tour)[number]; i: number }) {
  return (
    <figure className="group relative h-full w-full overflow-hidden rounded-[2rem] bg-ink shadow-2xl shadow-ink/20">
      <Img
        name={item.file}
        alt={item.title}
        sizes="(min-width: 1024px) 60vw, 85vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <span className="font-display text-sm text-white/60 tabular-nums">
          {String(i + 1).padStart(2, '0')} / {String(tour.length).padStart(2, '0')}
        </span>
        <h3 className="mt-1 font-display text-3xl sm:text-4xl">{item.title}</h3>
        <p className="mt-2 max-w-md leading-relaxed text-white/80">{item.text}</p>
      </figcaption>
    </figure>
  )
}

/** Desktop: a rolagem vertical empurra as fotos para o lado. */
function Pinned() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })
  // cada cartão tem 60vw + 2rem de espaço; o trilho anda até o último ficar centralizado
  const x = useTransform(smooth, [0, 1], ['0vw', `${-(tour.length - 1) * 62}vw`])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} style={{ height: `${tour.length * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5">
          <SectionHead eyebrow="Por dentro" title="Conheça cada" script="cantinho">
            Role a página para passear pelo chalé.
          </SectionHead>
        </div>
        <motion.ul style={{ x }} className="flex gap-[2vw] pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
          {tour.map((t, i) => (
            <li key={t.file} className="h-[58vh] w-[60vw] shrink-0">
              <Card item={t} i={i} />
            </li>
          ))}
        </motion.ul>
        <div className="mx-auto mt-8 h-1 w-full max-w-6xl overflow-hidden rounded-full bg-ink/10 px-0">
          <motion.div style={{ width: bar }} className="h-full rounded-full bg-terra-500" />
        </div>
      </div>
    </div>
  )
}

/** Celular/tablet: deslizar com o dedo, encaixando foto a foto. */
function Swipe() {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        }),
      { root: el, threshold: 0.6 },
    )
    el.querySelectorAll('li').forEach((li) => io.observe(li))
    return () => io.disconnect()
  }, [])

  const go = (i: number) =>
    track.current?.querySelectorAll('li')[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Por dentro" title="Conheça cada" script="cantinho">
          Deslize para o lado para passear pelo chalé.
        </SectionHead>
      </div>
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tour.map((t, i) => (
          <li key={t.file} data-i={i} className="aspect-[4/5] w-[85vw] max-w-md shrink-0 snap-center sm:aspect-[4/3]">
            <Card item={t} i={i} />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Escolher foto">
        {tour.map((t, i) => (
          <button
            key={t.file}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ver ${t.title}`}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-terra-600' : 'w-2.5 bg-ink/20'
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => go((active + 1) % tour.length)}
          aria-label="Próxima foto"
          className="ml-3 grid h-10 w-10 place-items-center rounded-full bg-white shadow ring-1 ring-ink/10"
        >
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function Tour() {
  const wide = useWide()
  const reduce = useReducedMotion()
  return (
    <section id="por-dentro" className="bg-cream-50">
      {wide && !reduce ? <Pinned /> : <Swipe />}
    </section>
  )
}
