import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react'
import { checkInSteps, formatPhone, keyWhatsappHref, site, whatsappHref } from '../../data/site'
import { Img } from '../ui'

export function CheckIn() {
  const [i, setI] = useState(0)
  const step = checkInSteps[i]
  const Icon = step.icon
  const wa = whatsappHref()
  const keyWa = keyWhatsappHref()

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <ol className="space-y-2">
        {checkInSteps.map((s, idx) => {
          const active = idx === i
          const done = idx < i
          const StepIcon = s.icon
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setI(idx)}
                aria-current={active ? 'step' : undefined}
                className={`flex w-full items-center gap-4 rounded-2xl p-3 text-left transition ${
                  active ? 'bg-white shadow-md ring-1 ring-ink/5' : 'hover:bg-white/60'
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${
                    active
                      ? 'bg-terra-600 text-white'
                      : done
                        ? 'bg-sage-500 text-white'
                        : 'bg-cream-200 text-ink/60'
                  }`}
                >
                  {done ? <Check size={18} aria-hidden /> : <StepIcon size={18} aria-hidden />}
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wider text-ink/55 uppercase">
                    Passo {idx + 1}
                  </span>
                  <span className={`block font-semibold ${active ? 'text-ink' : 'text-ink/75'}`}>{s.title}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-ink/5">
        <div className="h-1.5 bg-cream-200">
          <motion.div
            className="h-full bg-terra-500"
            animate={{ width: `${((i + 1) / checkInSteps.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <Img
              name={step.photo}
              alt={step.alt}
              eager
              sizes="(min-width: 1024px) 768px, 100vw"
              className="aspect-[16/9] w-full object-cover sm:aspect-[16/7]"
            />
            <div className="p-6 sm:p-8">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wider text-terra-700 uppercase">
                <Icon size={16} aria-hidden />
                Passo {i + 1} de {checkInSteps.length}
              </p>
              <h3 className="font-display text-3xl">{step.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/75">{step.text}</p>
              {step.contact === 'key' && keyWa && (
                <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-cream-100 p-4">
                  <div className="mr-auto">
                    <p className="text-sm text-ink/60">Quem entrega a chave</p>
                    <p className="font-display text-xl">
                      {site.keyContact.name}{' '}
                      <a
                        href={`tel:+55${site.keyContact.whatsapp.replace(/^55/, '')}`}
                        className="font-sans text-base font-semibold text-terra-700 underline-offset-4 hover:underline"
                      >
                        {formatPhone(site.keyContact.whatsapp)}
                      </a>
                    </p>
                  </div>
                  <a
                    href={keyWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-sage-700 px-5 py-2.5 font-semibold text-white transition hover:bg-sage-500"
                  >
                    <MessageCircle size={18} aria-hidden /> Chamar no WhatsApp
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/5 p-4 sm:px-8">
          <button
            type="button"
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-ink/70 transition hover:bg-cream-100 disabled:opacity-30"
          >
            <ArrowLeft size={18} aria-hidden /> Anterior
          </button>
          {i === checkInSteps.length - 1 ? (
            wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sage-700 px-5 py-2.5 font-semibold text-white transition hover:bg-sage-500"
              >
                <MessageCircle size={18} aria-hidden /> Falar com o anfitrião
              </a>
            ) : (
              <span className="text-sm font-semibold text-sage-700">Estamos felizes em receber vocês!</span>
            )
          ) : (
            <button
              type="button"
              onClick={() => setI((v) => Math.min(checkInSteps.length - 1, v + 1))}
              className="inline-flex items-center gap-2 rounded-full bg-terra-600 px-5 py-2.5 font-semibold text-white transition hover:bg-terra-700"
            >
              Próximo <ArrowRight size={18} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
