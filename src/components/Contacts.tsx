import { Clock, Fuel, House, KeyRound, MapPin, MessageCircle, Phone, Pill, Shield, Siren, Stethoscope, type LucideIcon } from 'lucide-react'
import {
  emergencyNumbers,
  formatPhone,
  mapsHref,
  photo,
  site,
  telHref,
  usefulContacts,
} from '../data/site'
import { Reveal, SectionHead } from './ui'

const ICONS: Record<string, LucideIcon> = {
  hospital: Stethoscope,
  farmacia: Pill,
  policia: Shield,
  chaveiro: KeyRound,
  posto: Fuel,
}

export function Contacts() {
  const host = site.keyContact.whatsapp

  return (
    <section id="contatos" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Contatos úteis" title="Contatos úteis" script="e emergência">
          Guarde esta seção para ter sempre à mão os principais contatos durante a sua estadia. Toque no número
          para ligar.
        </SectionHead>

        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-3xl bg-terra-600 p-4 text-white sm:p-5">
            <span className="flex items-center gap-2 pr-2 font-semibold">
              <Siren size={20} aria-hidden /> Emergência
            </span>
            {emergencyNumbers.map((e) => (
              <a
                key={e.number}
                href={telHref(e.number)}
                className="inline-flex items-baseline gap-2 rounded-full bg-white/15 px-4 py-2 transition hover:bg-white/25"
              >
                <span className="font-display text-2xl leading-none tabular-nums">{e.number}</span>
                <span className="text-sm text-white/85">{e.label}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {host && (
            <li>
              <Reveal className="h-full">
                <article className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-sage-100 p-6 ring-1 ring-sage-300/60">
                  <div>
                    <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-sage-700">
                      <House size={22} aria-hidden />
                    </span>
                    <h3 className="font-display text-2xl">Anfitrião</h3>
                    <p className="mt-2 leading-relaxed text-ink/70">
                      Dúvidas, imprevistos ou a chave do chalé: fale direto com a gente.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/${host}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-sage-700 px-5 py-2.5 font-semibold text-white transition hover:-translate-y-0.5"
                    >
                      <MessageCircle size={17} aria-hidden /> WhatsApp
                    </a>
                    <a
                      href={`tel:+${host}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-ink tabular-nums transition hover:-translate-y-0.5"
                    >
                      <Phone size={17} aria-hidden /> {formatPhone(host)}
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          )}

          {usefulContacts.map((c, i) => {
            const Icon = ICONS[c.id] ?? Phone
            return (
              <li key={c.id}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={photo(c.photo)}
                        alt={c.alt}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-terra-700 shadow">
                        <Icon size={20} aria-hidden />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm font-semibold tracking-wide text-terra-700 uppercase">{c.title}</p>
                      <h3 className="mt-1 font-display text-xl leading-snug">{c.name}</h3>

                      <div className="mt-4 flex flex-1 flex-col justify-end gap-2 text-ink/75">
                        <a
                          href={telHref(c.phone)}
                          className="inline-flex w-fit items-center gap-2 rounded-full bg-cream-200/80 px-4 py-2 font-semibold text-ink tabular-nums transition hover:bg-cream-200"
                        >
                          <Phone size={16} className="text-terra-600" aria-hidden /> {c.phone}
                        </a>
                        {c.address && (
                          <a
                            href={mapsHref(c.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-sm hover:text-terra-700 hover:underline"
                          >
                            <MapPin size={16} className="mt-0.5 shrink-0 text-terra-600" aria-hidden />
                            {c.address}
                          </a>
                        )}
                        {c.note && (
                          <p className="inline-flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-terra-600" aria-hidden /> {c.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
