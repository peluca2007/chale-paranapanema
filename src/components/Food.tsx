import { motion } from 'motion/react'
import { MapPin, MessageCircle, Phone, Utensils } from 'lucide-react'
import { food, foodWhatsapp, mapsHref, telHref } from '../data/site'
import { Img, SectionHead } from './ui'

export function Food() {
  return (
    <section id="onde-comer" className="overflow-hidden bg-cream-50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
          <SectionHead eyebrow="Onde comer" title="Contatos gastronômicos e" script="entretenimento">
            Os lugares que a gente recomenda na cidade. Toque em <strong className="font-semibold">WhatsApp</strong>{' '}
            para pedir ou reservar: a mensagem já vai pronta.
          </SectionHead>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-10 hidden overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20 lg:block"
          >
            <Img name="food-mesa.jpg" alt="Mesa farta com carnes, batata frita, arroz e saladas" className="aspect-[16/9] w-full object-cover" />
            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink backdrop-blur">
              <Utensils size={16} className="text-terra-600" aria-hidden /> {food.length} lugares para conhecer
            </span>
          </motion.div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {food.map((f, i) => (
            <motion.li
              key={f.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="group flex h-full flex-row overflow-hidden rounded-3xl sm:flex-col bg-white shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative w-32 shrink-0 overflow-hidden bg-ink sm:w-auto">
                  <Img name={f.photo} alt={f.alt} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover group-hover:scale-105 sm:aspect-[4/3] sm:h-auto" />
                  {f.note && (
                    <span className="absolute top-2 left-2 rounded-full bg-terra-600 px-2.5 py-1 text-[11px] sm:top-3 sm:left-3 sm:px-3 sm:text-xs font-semibold text-white shadow">
                      {f.note}
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                  <h3 className="font-display text-xl leading-snug">{f.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-ink/65">{f.kind}</p>
                  {f.address && (
                    <a
                      href={mapsHref(f.mapsQuery ?? `${f.name}, ${f.address}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-start gap-1.5 text-sm text-ink/70 hover:text-terra-700 hover:underline"
                    >
                      <MapPin size={15} className="mt-0.5 shrink-0 text-terra-600" aria-hidden />
                      {f.address}
                    </a>
                  )}
                  <div className="mt-auto flex gap-2 pt-4 sm:pt-5">
                    <a
                      href={foodWhatsapp(f.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sage-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-500"
                    >
                      <MessageCircle size={16} aria-hidden /> WhatsApp
                    </a>
                    <a
                      href={telHref(f.phone)}
                      aria-label={`Ligar para ${f.name}: ${f.phone}`}
                      title={f.phone}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-100 text-ink transition hover:bg-cream-200"
                    >
                      <Phone size={16} aria-hidden />
                    </a>
                  </div>
                  <p className="mt-2 text-center text-xs text-ink/50 tabular-nums">{f.phone}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
