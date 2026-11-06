import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { bookingHref, site } from '../data/site'
import { useActiveSection } from '../lib/hooks'

const LINKS = [
  { id: 'chale', label: 'O chalé' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'manual', label: 'Manual do hóspede' },
  { id: 'arredores', label: 'Arredores' },
] as const

const SECTION_IDS = ['inicio', ...LINKS.map((l) => l.id), 'contato'] as const

export function Header() {
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  const linkClass = (id: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active === id ? 'bg-terra-600/10 text-terra-700' : 'text-ink/70 hover:text-ink'
    }`

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-terra-500"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? 'bg-cream-50/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label={`${site.name}, voltar ao início`}>
            <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
              <rect width="64" height="64" rx="16" fill="#a95f45" />
              <path d="M32 12 L50 52 H14 Z" fill="#f4efe7" />
              <path d="M32 26 L42 48 H22 Z" fill="#a95f45" />
              <circle cx="32" cy="42" r="3" fill="#ffd98a" />
            </svg>
            <span className="font-display text-lg leading-none font-semibold">
              Chalé <span className="font-script text-2xl font-medium text-terra-600">Paranapanema</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={linkClass(l.id)} aria-current={active === l.id ? 'true' : undefined}>
                {l.label}
              </a>
            ))}
            <a
              href={bookingHref()}
              {...(site.airbnbUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="ml-2 rounded-full bg-terra-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terra-700"
            >
              Reservar
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/70 ring-1 ring-ink/10 lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="menu-mobile"
              aria-label="Principal (celular)"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-5 pb-5">
                {[...LINKS, { id: 'contato', label: 'Reservar' }].map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`block ${linkClass(l.id)} !rounded-xl !py-3 text-base`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
