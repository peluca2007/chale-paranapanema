import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ExternalLink, Footprints, Car, Globe, House, MapPin, Phone } from 'lucide-react'
import { discover, mapsHref, photo, places, site } from '../data/site'
import { Reveal, SectionHead } from './ui'

const SIZE = 420
const C = SIZE / 2
const KM_MIN = 0.1
const KM_MAX = 30
const R_MIN = 46
const R_MAX = 188

/** Escala logarítmica: 100 m e 30 km cabem no mesmo desenho. */
const radius = (km: number) =>
  R_MIN + ((Math.log10(km) - Math.log10(KM_MIN)) / (Math.log10(KM_MAX) - Math.log10(KM_MIN))) * (R_MAX - R_MIN)

const polar = (r: number, deg: number) => ({
  x: C + r * Math.cos((deg * Math.PI) / 180),
  y: C + r * Math.sin((deg * Math.PI) / 180),
})

const RINGS = [
  { km: 0.3, label: '300 m', at: 'bottom' },
  { km: 1, label: '1 km', at: 'bottom' },
  { km: 5, label: '5 km', at: 'bottom' },
  { km: 20, label: '20 km', at: 'bottom' },
  { km: 30, label: '30 km', at: 'top' },
] as const

function Radar({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const onKey = (e: KeyboardEvent<SVGGElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(id)
    }
  }

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="mx-auto block w-full max-w-[460px]"
      role="group"
      aria-label="Esquema de distâncias a partir do chalé, em escala comprimida"
    >
      {RINGS.map((ring) => {
        const r = radius(ring.km)
        return (
          <g key={ring.km}>
            <circle cx={C} cy={C} r={r} fill="none" stroke="#7c8b6b" strokeOpacity="0.35" strokeDasharray="3 5" />
            <text
              x={C}
              y={ring.at === 'top' ? C - r - 4 : C + r + 11}
              textAnchor="middle"
              fontSize="12"
              fill="#4f5c43"
              fontWeight="600"
            >
              {ring.label}
            </text>
          </g>
        )
      })}

      {places.map((p, i) => {
        const pos = polar(radius(p.km), p.angle)
        const on = p.id === selected
        return (
          <g key={p.id}>
            <line
              x1={C}
              y1={C}
              x2={pos.x}
              y2={pos.y}
              stroke="#c4785d"
              strokeOpacity={on ? 0.8 : 0.22}
              strokeWidth={on ? 2 : 1}
              style={{ transition: 'all .25s' }}
            />
            <g
              role="button"
              tabIndex={0}
              aria-label={`${p.name}, ${p.label}`}
              aria-pressed={on}
              onClick={() => onSelect(p.id)}
              onKeyDown={(e) => onKey(e, p.id)}
              className="group cursor-pointer outline-none"
            >
              {on && (
                <circle cx={pos.x} cy={pos.y} r="20" fill="#c4785d" opacity="0.2">
                  <animate attributeName="r" values="16;27;16" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* anel de foco (teclado) desenhado como círculo, em vez do retângulo padrão */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="21"
                fill="none"
                stroke="#c4785d"
                strokeWidth="3"
                className="opacity-0 group-focus-visible:opacity-100"
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={on ? 16 : 13}
                fill={on ? '#a95f45' : '#fbf8f3'}
                stroke="#a95f45"
                strokeWidth="2"
                style={{ transition: 'all .25s' }}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={on ? '#fff' : '#8a4a34'}
              >
                {i + 1}
              </text>
            </g>
          </g>
        )
      })}

      <circle cx={C} cy={C} r="24" fill="#4f5c43" />
      <House x={C - 11} y={C - 11} size={22} color="#fff" aria-hidden />
    </svg>
  )
}

export function Explore() {
  const [id, setId] = useState(places[1].id)
  const idx = places.findIndex((p) => p.id === id)
  const place = places[idx]
  const walk = place.km <= 1
  const minutes = Math.max(1, Math.round((place.km * 1000) / 80))

  return (
    <section id="arredores" className="bg-cream-200/50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Arredores" title="Descubra" script="Paranapanema">
          Um destino encantador do interior de São Paulo, perfeito para relaxar, curtir a natureza e viver
          momentos inesquecíveis.
        </SectionHead>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discover.map((d, i) => (
            <li key={d.title}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="overflow-hidden">
                    <img
                      src={photo(d.photo)}
                      alt={d.alt}
                      loading="lazy"
                      className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl leading-snug">{d.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/70">{d.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16">
          <div className="rounded-[2rem] bg-sage-100 p-6 ring-1 ring-sage-300/60 sm:p-10">
            <h3 className="mb-1 flex items-center gap-3 font-display text-3xl">
              <MapPin className="text-sage-700" aria-hidden />
              <span>
                Locais <span className="font-script text-4xl text-terra-600">imperdíveis</span>
              </span>
            </h3>
            <p className="mb-8 text-ink/70">Clique em um ponto para ver a distância a partir do chalé.</p>

            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <Radar selected={id} onSelect={setId} />
                <p className="mt-2 text-center text-xs text-ink/55">
                  Esquema em escala comprimida: não é um mapa, e os ângulos são só ilustrativos.
                </p>
              </div>

              <div>
                <ol className="space-y-2">
                  {places.map((p, i) => {
                    const on = p.id === id
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setId(p.id)}
                          aria-pressed={on}
                          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                            on ? 'bg-white shadow-md ring-1 ring-ink/5' : 'hover:bg-white/60'
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                              on ? 'bg-terra-600 text-white' : 'bg-white text-terra-700 ring-1 ring-terra-400'
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span className="flex-1 font-semibold">{p.name}</span>
                          <span className="font-display text-lg text-sage-700 tabular-nums">{p.label}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>

                <div aria-live="polite" className="mt-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={place.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5"
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-terra-700">
                        {walk ? <Footprints size={16} aria-hidden /> : <Car size={16} aria-hidden />}
                        {walk ? `Cerca de ${minutes} min a pé` : 'Melhor de carro'}
                      </p>
                      <p className="mt-1 leading-relaxed text-ink/75">{place.blurb}</p>
                      <a
                        href={mapsHref(place.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-terra-700 underline-offset-4 hover:underline"
                      >
                        Ver no Google Maps <ExternalLink size={14} aria-hidden />
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <aside className="relative h-full rotate-[-1deg] rounded-3xl bg-white p-7 shadow-lg ring-1 ring-ink/5">
              <p className="font-script text-3xl text-terra-600">Dica da anfitriã</p>
              <p className="mt-2 text-lg leading-relaxed text-ink/80">
                Reserve um tempinho para caminhar sem pressa pela cidade, respirar o ar puro e se encantar com
                cada detalhe!
              </p>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
              <h3 className="font-display text-xl">Informações turísticas</h3>
              <ul className="mt-4 space-y-3 text-ink/80">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 shrink-0 text-sage-700" aria-hidden />
                  <a href={site.tourism.phoneHref} className="font-semibold underline-offset-4 hover:underline">
                    {site.tourism.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-sage-700" aria-hidden />
                  {site.tourism.address}
                </li>
                <li className="flex items-start gap-3">
                  <Globe size={18} className="mt-1 shrink-0 text-sage-700" aria-hidden />
                  <a
                    href={site.tourism.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    {site.tourism.siteLabel}
                  </a>
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
