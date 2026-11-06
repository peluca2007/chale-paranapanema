import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { booking, whatsappHref } from '../data/site'

const WORDS = [
  'Cabana A-frame',
  'Fachada em vidro',
  'Ar-condicionado',
  'Wi-Fi',
  'Smart TV',
  'Cofre',
  'Cozinha compacta',
  'Pet friendly',
  'Estacionamento',
  '300 m da Matriz',
]

/** Faixa de palavras correndo devagar entre as seções. */
export function Marquee() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((w) => (
        <li key={w} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-display text-2xl text-cream-50 italic sm:text-3xl">{w}</span>
          <span aria-hidden className="text-terra-400">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="-my-px overflow-hidden bg-ink py-5 sm:py-6">
      <div className="marquee flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  )
}

/** Barra fixa no rodapé do celular com o botão de reserva (aparece depois do topo). */
export function MobileBar() {
  const [show, setShow] = useState(false)
  const cta = booking()
  const wa = whatsappHref()

  useEffect(() => {
    const on = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 240
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed inset-x-3 bottom-3 z-50 flex gap-2 rounded-full bg-white/90 p-2 shadow-2xl shadow-ink/25 ring-1 ring-ink/10 backdrop-blur-md md:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <a
            href={cta.href}
            {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terra-600 px-5 py-3 font-semibold text-white"
          >
            {cta.label} <ArrowUpRight size={18} aria-hidden />
          </a>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar pelo WhatsApp"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-700 text-white"
            >
              <MessageCircle size={20} aria-hidden />
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
