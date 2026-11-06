import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Info, Minus, PawPrint, Plus, TriangleAlert, User, Baby, X, type LucideIcon } from 'lucide-react'
import { limits, rules, type RuleTone } from '../../data/site'

const TONES: Record<RuleTone, { label: string; icon: LucideIcon; box: string; badge: string }> = {
  ok: { label: 'Permitido', icon: Check, box: 'bg-sage-100 ring-sage-300', badge: 'bg-sage-700 text-white' },
  warn: { label: 'Com condição', icon: TriangleAlert, box: 'bg-amber-100 ring-amber-300', badge: 'bg-amber-800 text-white' },
  no: { label: 'Não permitido', icon: X, box: 'bg-terra-400/20 ring-terra-400/50', badge: 'bg-terra-700 text-white' },
  info: { label: 'Bom saber', icon: Info, box: 'bg-white ring-ink/10', badge: 'bg-ink text-white' },
}

function Counter({
  icon: Icon,
  label,
  value,
  onChange,
  max,
}: {
  icon: LucideIcon
  label: string
  value: number
  onChange: (v: number) => void
  max: number
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-cream-100 p-3">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <Icon size={18} className="text-terra-600" aria-hidden />
        {label}
      </span>
      <span className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          aria-label={`Diminuir ${label}`}
          className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-ink/10 transition hover:bg-cream-200 disabled:opacity-30"
        >
          <Minus size={16} aria-hidden />
        </button>
        <output className="w-6 text-center font-display text-xl tabular-nums" aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value === max}
          aria-label={`Aumentar ${label}`}
          className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-ink/10 transition hover:bg-cream-200 disabled:opacity-30"
        >
          <Plus size={16} aria-hidden />
        </button>
      </span>
    </div>
  )
}

function ReservationCheck() {
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [pets, setPets] = useState(0)

  const problems: string[] = []
  const notes: string[] = []
  if (adults > limits.adults) problems.push(`O limite é de ${limits.adults} hóspedes.`)
  if (kids > limits.children) problems.push(`Só cabe ${limits.children} criança extra.`)
  if (kids > 0) notes.push(`A criança deve ter até ${limits.childMaxAge} anos.`)
  if (pets > 0) notes.push('Avise a anfitriã antes da chegada. Apenas pets de pequeno porte.')
  const ok = problems.length === 0

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
      <h3 className="font-display text-2xl">Confira sua reserva</h3>
      <p className="mt-1 text-ink/70">Monte o grupo e veja se ele cabe nas regras do chalé.</p>

      <div className="mt-5 space-y-2.5">
        <Counter icon={User} label="Hóspedes" value={adults} onChange={setAdults} max={5} />
        <Counter icon={Baby} label="Crianças" value={kids} onChange={setKids} max={3} />
        <Counter icon={PawPrint} label="Pets" value={pets} onChange={setPets} max={3} />
      </div>

      <div
        aria-live="polite"
        className={`mt-5 rounded-2xl p-4 ring-1 transition-colors ${
          ok ? 'bg-sage-100 ring-sage-300' : 'bg-terra-400/20 ring-terra-400/50'
        }`}
      >
        <p className={`flex items-center gap-2 font-semibold ${ok ? 'text-sage-700' : 'text-terra-700'}`}>
          {ok ? <Check size={18} aria-hidden /> : <TriangleAlert size={18} aria-hidden />}
          {ok ? 'Dentro das regras' : 'Atenção'}
        </p>
        {(problems.length > 0 || notes.length > 0) && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
            {[...problems, ...notes].map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function Rules() {
  const [id, setId] = useState(rules[1].id)
  const rule = rules.find((r) => r.id === id) ?? rules[0]
  const tone = TONES[rule.tone]
  const ToneIcon = tone.icon
  const RuleIcon = rule.icon

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <p className="mb-3 font-semibold text-ink/70">Escolha uma dúvida:</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Dúvidas sobre as regras">
          {rules.map((r) => {
            const Icon = r.icon
            const on = r.id === id
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                onClick={() => setId(r.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  on
                    ? 'bg-terra-600 text-white shadow-md'
                    : 'bg-white text-ink/80 ring-1 ring-ink/10 hover:bg-cream-50 hover:ring-terra-400'
                }`}
              >
                <Icon size={16} aria-hidden />
                {r.chip}
              </button>
            )
          })}
        </div>

        <div aria-live="polite" className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className={`rounded-3xl p-7 ring-1 ${tone.box}`}
            >
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${tone.badge}`}>
                <ToneIcon size={14} aria-hidden />
                {tone.label}
              </span>
              <h3 className="mt-4 flex items-center gap-3 font-display text-3xl sm:text-4xl">
                <RuleIcon size={30} className="shrink-0 text-terra-600" aria-hidden />
                {rule.verdict}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/80">{rule.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ReservationCheck />
    </div>
  )
}
