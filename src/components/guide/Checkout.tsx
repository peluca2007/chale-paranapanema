import { AnimatePresence, motion } from 'motion/react'
import { Check, Clock, Heart, RotateCcw } from 'lucide-react'
import { checkoutChecklist, site } from '../../data/site'
import { useLocalStorage } from '../../lib/hooks'

const R = 46
const C = 2 * Math.PI * R

export function Checkout() {
  const [done, setDone] = useLocalStorage<string[]>('chale:saida', [])
  const total = checkoutChecklist.length
  const count = checkoutChecklist.filter((i) => done.includes(i.id)).length
  const complete = count === total

  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <ul className="space-y-2.5">
        {checkoutChecklist.map((item) => {
          const on = done.includes(item.id)
          const Icon = item.icon
          return (
            <li key={item.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left ring-1 transition ${
                  on ? 'bg-sage-100 ring-sage-300' : 'bg-white ring-ink/5 hover:shadow-md'
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition ${
                    on ? 'border-sage-700 bg-sage-700 text-white' : 'border-terra-400 text-transparent'
                  }`}
                >
                  <Check size={18} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-semibold transition ${on ? 'text-ink/50 line-through' : ''}`}>
                    {item.label}
                  </span>
                  <span className="block text-sm leading-snug text-ink/65">{item.hint}</span>
                </span>
                <Icon size={20} className="hidden shrink-0 text-ink/30 sm:block" aria-hidden />
              </button>
            </li>
          )
        })}
      </ul>

      <aside className="space-y-4">
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-ink/5">
          <div className="relative mx-auto h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
              <circle cx="60" cy="60" r={R} fill="none" stroke="#e9e1d3" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={complete ? '#7c8b6b' : '#c4785d'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - count / total)}
                style={{ transition: 'stroke-dashoffset .5s ease, stroke .3s' }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-4xl tabular-nums">
                {count}
                <span className="text-xl text-ink/40">/{total}</span>
              </span>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 font-semibold text-terra-700">
            <Clock size={16} aria-hidden /> Check-out até as {site.checkOut}
          </p>
          <button
            type="button"
            onClick={() => setDone([])}
            disabled={count === 0}
            className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink/60 transition hover:bg-cream-100 disabled:opacity-30"
          >
            <RotateCcw size={14} aria-hidden /> Recomeçar
          </button>
        </div>

        <div aria-live="polite">
          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -1.2 }}
                exit={{ opacity: 0, y: 8 }}
                className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-ink/5"
              >
                <Heart className="mb-2 text-terra-500" aria-hidden />
                <p className="font-script text-2xl leading-snug text-ink/85">
                  Obrigado por cuidar da casa como se fosse sua! Sua atenção faz toda a diferença.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  )
}
