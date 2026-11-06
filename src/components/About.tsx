import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Heart, Quote, Star } from 'lucide-react'
import { AB, amenities, review, stats } from '../data/site'
import { Img, Reveal, SectionHead } from './ui'

function Collage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBig = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const ySmall = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  const rot = useTransform(scrollYProgress, [0, 1], [5, -3])

  return (
    <div ref={ref} className="relative mx-auto mb-10 w-full max-w-lg pb-16 lg:mb-0 lg:max-w-none lg:pb-0">
      <motion.div
        style={{ y: yBig }}
        initial={{ clipPath: 'inset(12% 12% 12% 12% round 2rem)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20"
      >
        <Img
          name={`ab:${AB.fachada}`}
          alt="Fachada do chalé em A, toda em vidro"
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="aspect-[4/3] w-full object-cover"
        />
      </motion.div>
      <motion.div
        style={{ y: ySmall, rotate: rot }}
        className="absolute -bottom-2 -left-2 w-[48%] overflow-hidden rounded-3xl border-[6px] border-cream-100 shadow-xl sm:-left-8 lg:-bottom-10"
      >
        <Img
          name={`ab:${AB.quartoJanela}`}
          alt="Cama de casal diante do janelão"
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="aspect-square w-full object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.6 }}
        className="absolute -top-5 -right-3 grid h-24 w-24 place-items-center rounded-full bg-terra-600 text-center text-white shadow-lg sm:-right-6"
      >
        <span className="font-script text-xl leading-tight">
          A-frame
          <br />
          <span className="font-sans text-xs tracking-widest uppercase">design</span>
        </span>
      </motion.div>
    </div>
  )
}

export function About() {
  return (
    <section id="chale" className="overflow-hidden px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="O chalé" title="Privacidade, conforto e" script="tranquilidade">
              Cabana A-frame moderna, com deck e fachada em vidro, em bairro tranquilo perto do centro e com
              vista para o Recinto de Festas. O chalé inteiro é só seu: não há áreas compartilhadas.
            </SectionHead>
            <Reveal delay={0.15}>
              <figure className="flex gap-4 rounded-3xl bg-white/70 p-5 ring-1 ring-ink/5 backdrop-blur">
                <Quote size={28} className="shrink-0 text-terra-400" aria-hidden />
                <div>
                  <div className="mb-1 flex gap-0.5 text-terra-500" aria-label="5 estrelas">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={16} fill="currentColor" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl">“{review.text}”</blockquote>
                  <figcaption className="mt-1 text-sm text-ink/60">
                    {review.author}, {review.source}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          </div>
          <div>
            <Collage />
          </div>
        </div>

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
                Mensagem do anfitrião
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
