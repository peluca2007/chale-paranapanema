import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { site, whatsappHref } from '../data/site'
import { Reveal } from './ui'

export function Contact() {
  const wa = whatsappHref()
  const hasAny = Boolean(site.airbnbUrl || wa)

  return (
    <section id="contato" className="px-5 py-20">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-terra-600 p-10 text-white sm:p-16">
          <div aria-hidden className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10" />
          <div aria-hidden className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-terra-700/50" />

          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">
              Reserve sua estadia
              <span className="mt-1 block font-script text-5xl sm:text-7xl">em Paranapanema</span>
            </h2>
            <p className="mt-5 text-lg text-white/90">
              Esperamos que você tenha dias incríveis por aqui. Check-in a partir das {site.checkIn} e
              check-out até as {site.checkOut}.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {site.airbnbUrl && (
                <a
                  href={site.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-terra-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-cream-100"
                >
                  Reservar no Airbnb <ArrowUpRight size={18} aria-hidden />
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <MessageCircle size={18} aria-hidden /> Chamar no WhatsApp
                </a>
              )}
              {!hasAny && (
                <p className="rounded-2xl bg-white/15 px-5 py-3 font-semibold">
                  Em breve, mais informações sobre reservas.
                </p>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
