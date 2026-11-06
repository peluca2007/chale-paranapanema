import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-terra-600 px-6 py-3 font-semibold text-white shadow-lg shadow-terra-600/25 transition hover:-translate-y-0.5 hover:bg-terra-700 active:translate-y-0'

export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3 font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0'

/** Aparece suavemente quando entra na tela. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Cabeçalho de seção no estilo dos manuais: serifa + palavra em script. */
export function SectionHead({
  eyebrow,
  title,
  script,
  children,
}: {
  eyebrow: string
  title: string
  script: string
  children?: ReactNode
}) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <p className="mb-3 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-terra-700 uppercase">
        {eyebrow}
        <span aria-hidden className="h-px w-16 bg-terra-500/50" />
      </p>
      <h2 className="font-display text-4xl leading-tight text-balance sm:text-5xl">
        {title} <span className="font-script text-5xl text-terra-600 sm:text-6xl">{script}</span>
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-ink/75">{children}</p>}
    </Reveal>
  )
}
