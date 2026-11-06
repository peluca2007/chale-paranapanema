import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Moon,
  Pause,
  PawPrint,
  Play,
  Sun,
  Sunrise,
  Sunset,
  Users,
  Wifi,
} from 'lucide-react'
import { booking, site } from '../../data/site'
import { btnGhost, btnPrimary } from '../ui'
import { Scene, formatHour, phaseLabel } from './Scene'

const PRESETS = [
  { label: 'Amanhecer', hour: 6.5, icon: Sunrise },
  { label: 'Meio-dia', hour: 12.5, icon: Sun },
  { label: 'Entardecer', hour: 17.4, icon: Sunset },
  { label: 'Noite', hour: 21.5, icon: Moon },
]

const FACTS = [
  { icon: Users, text: 'Até 3 hóspedes' },
  { icon: PawPrint, text: 'Pets pequenos' },
  { icon: Wifi, text: 'Wi-Fi' },
  { icon: Clock, text: `Check-in às ${site.checkIn}` },
]

export function Hero() {
  // começa na hora real de quem está visitando
  const [hour, setHour] = useState(() => {
    const d = new Date()
    return d.getHours() + d.getMinutes() / 60
  })
  const [playing, setPlaying] = useState(false)
  const tween = useRef<ReturnType<typeof animate> | null>(null)
  const reduce = useReducedMotion()
  const cta = booking()

  const pointer = useMotionValue(0)
  const smoothPointer = useSpring(pointer, { stiffness: 80, damping: 20 })

  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setHour((h) => (h + dt * 1.2) % 24)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const goTo = (target: number) => {
    setPlaying(false)
    tween.current?.stop()
    if (reduce) return setHour(target)
    tween.current = animate(hour, target, { duration: 1.2, ease: 'easeInOut', onUpdate: setHour })
  }

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    pointer.set(((e.clientX - r.left) / r.width - 0.5) * 2)
  }

  return (
    <section id="inicio" className="relative overflow-x-clip px-5 pt-28 pb-16 lg:pt-32">
      <div aria-hidden className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sage-300/40 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-terra-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-sage-700 uppercase"
          >
            Paranapanema · São Paulo
            <span aria-hidden className="h-px w-16 bg-sage-500/60" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-7xl leading-[0.9] sm:text-8xl lg:text-9xl"
          >
            Chalé
            <span className="-mt-1 block font-script text-6xl text-terra-600 sm:text-7xl lg:text-8xl">
              Paranapanema
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80"
          >
            Um chalé privativo em estilo A-frame, a 300 m da Praça da Matriz. Conforto, privacidade e
            tranquilidade para relaxar, curtir a natureza e viver momentos inesquecíveis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={btnPrimary}
            >
              {cta.label}
              <ArrowUpRight size={18} aria-hidden />
            </a>
            <a href="#manual" className={btnGhost}>
              <BookOpen size={18} aria-hidden />
              Manual do hóspede
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {FACTS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink/80 ring-1 ring-ink/10"
              >
                <Icon size={16} className="text-terra-600" aria-hidden />
                {text}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          <div
            onPointerMove={onMove}
            onPointerLeave={() => pointer.set(0)}
            className="relative aspect-[5/6] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-2xl ring-1 shadow-ink/25 ring-ink/10"
          >
            <Scene hour={hour} pointer={smoothPointer} />
          </div>

          <div className="relative z-10 -mt-7 mx-3 rounded-2xl bg-white/95 p-4 shadow-xl ring-1 shadow-ink/10 ring-ink/5 backdrop-blur">
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="hora-do-dia" className="text-sm font-semibold text-ink">
                Hora do dia{' '}
                <span className="font-normal text-ink/60">· {phaseLabel(hour)}</span>
              </label>
              <div className="flex items-center gap-2">
                <output className="font-display text-xl tabular-nums" aria-live="off">
                  {formatHour(hour)}
                </output>
                <button
                  type="button"
                  onClick={() => {
                    tween.current?.stop()
                    setPlaying((p) => !p)
                  }}
                  aria-pressed={playing}
                  aria-label={playing ? 'Pausar o ciclo do dia' : 'Tocar o ciclo do dia'}
                  className="grid h-9 w-9 place-items-center rounded-full bg-terra-600 text-white transition hover:bg-terra-700"
                >
                  {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                </button>
              </div>
            </div>
            <input
              id="hora-do-dia"
              type="range"
              min={0}
              max={24}
              step={0.05}
              value={hour}
              aria-valuetext={`${formatHour(hour)}, ${phaseLabel(hour)}`}
              onChange={(e) => {
                setPlaying(false)
                tween.current?.stop()
                setHour(Number(e.target.value))
              }}
              className="w-full"
            />
            <div className="mt-2 grid grid-cols-4 gap-2">
              {PRESETS.map(({ label, hour: h, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => goTo(h)}
                  className="flex flex-col items-center gap-1 rounded-xl bg-cream-100 px-1 py-2 text-xs font-semibold text-ink/80 transition hover:bg-cream-200"
                >
                  <Icon size={16} className="text-terra-600" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
