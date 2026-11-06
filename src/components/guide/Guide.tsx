import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { DoorOpen, KeyRound, ListChecks, Sparkles, type LucideIcon } from 'lucide-react'
import { SectionHead } from '../ui'
import { CheckIn } from './CheckIn'
import { Checkout } from './Checkout'
import { Rules } from './Rules'
import { Usage } from './Usage'

const TABS: { id: string; label: string; icon: LucideIcon; panel: () => React.JSX.Element }[] = [
  { id: 'checkin', label: 'Check-in', icon: KeyRound, panel: CheckIn },
  { id: 'itens', label: 'Usando o chalé', icon: Sparkles, panel: Usage },
  { id: 'regras', label: 'Regras', icon: ListChecks, panel: Rules },
  { id: 'saida', label: 'Antes de sair', icon: DoorOpen, panel: Checkout },
]

export function Guide() {
  const [tab, setTab] = useState(TABS[0].id)
  const active = TABS.find((t) => t.id === tab) ?? TABS[0]
  const Panel = active.panel

  // setas do teclado navegam entre as abas (padrão WAI-ARIA)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = TABS.findIndex((t) => t.id === tab)
    let next = idx
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length
    else return
    e.preventDefault()
    setTab(TABS[next].id)
    document.getElementById(`tab-${TABS[next].id}`)?.focus()
  }

  return (
    <section id="manual" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Manual do hóspede" title="Tudo o que você precisa" script="para aproveitar">
          O manual da hospedagem em formato interativo: faça o check-in passo a passo, tire dúvidas sobre as
          regras e confira a lista de saída.
        </SectionHead>

        <div
          role="tablist"
          aria-label="Seções do manual"
          onKeyDown={onKeyDown}
          className="mb-8 grid grid-cols-2 gap-2 rounded-3xl bg-cream-200/70 p-2 sm:inline-grid sm:grid-cols-4"
        >
          {TABS.map((t) => {
            const Icon = t.icon
            const on = t.id === tab
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.id)}
                className="relative flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
              >
                {on && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-2xl bg-white shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative flex items-center gap-2 ${on ? 'text-terra-700' : 'text-ink/65'}`}>
                  <Icon size={17} aria-hidden />
                  {t.label}
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
