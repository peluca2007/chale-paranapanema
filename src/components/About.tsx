import { Heart } from 'lucide-react'
import { amenities, stats } from '../data/site'
import { Reveal, SectionHead } from './ui'

export function About() {
  return (
    <section id="chale" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="O chalé" title="Privacidade, conforto e" script="tranquilidade">
          Este imóvel foi preparado para você e sua família. Aqui você terá acesso ao chalé inteiro de forma
          exclusiva: não há áreas compartilhadas com outros hóspedes ou com o anfitrião.
        </SectionHead>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="group h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-terra-600/10">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-cream-100 text-terra-600 transition group-hover:bg-terra-600 group-hover:text-white">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/70">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <dl className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl bg-sage-500/30 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col justify-between gap-2 bg-sage-100 p-6">
                  <dd className="order-1 font-display text-4xl text-sage-700">{s.value}</dd>
                  <dt className="order-2 text-sm leading-snug text-ink/70">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="relative h-full rotate-[-1.2deg] rounded-3xl bg-white p-7 shadow-lg ring-1 ring-ink/5">
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 rounded-sm bg-terra-400/40"
              />
              <Heart size={20} className="mb-3 text-terra-500" aria-hidden />
              <blockquote className="font-script text-2xl leading-snug text-ink/85">
                Olá! Seja muito bem-vindo. Preparamos tudo com carinho para que vocês aproveitem dias
                incríveis. Qualquer dúvida durante a estadia, estarei à disposição pelo WhatsApp.
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold tracking-wide text-terra-700 uppercase">
                Mensagem da anfitriã
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
