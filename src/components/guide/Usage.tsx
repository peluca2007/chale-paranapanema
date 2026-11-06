import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site, usageItems, type UsageItem } from '../../data/site'
import { useCopy } from '../../lib/hooks'
import { Img, Reveal } from '../ui'

function WifiTool() {
  const { copied, copy } = useCopy()
  const { network, password } = site.wifi
  return (
    <div className="mt-4 space-y-2 rounded-2xl bg-cream-100 p-3 text-sm">
      <div className="flex items-center justify-between gap-2">
        <span>
          <span className="text-ink/60">Rede: </span>
          <strong>{network}</strong>
        </span>
        <button
          type="button"
          onClick={() => copy('rede', network)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-semibold text-terra-700 ring-1 ring-ink/10 transition hover:bg-terra-600 hover:text-white"
        >
          {copied === 'rede' ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied === 'rede' ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        {password ? (
          <>
            <span>
              <span className="text-ink/60">Senha: </span>
              <strong>{password}</strong>
            </span>
            <button
              type="button"
              onClick={() => copy('senha', password)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-semibold text-terra-700 ring-1 ring-ink/10 transition hover:bg-terra-600 hover:text-white"
            >
              {copied === 'senha' ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied === 'senha' ? 'Copiado' : 'Copiar'}
            </button>
          </>
        ) : (
          <span className="text-ink/70">
            <span className="text-ink/60">Senha: </span>informada pela anfitriã na chegada.
          </span>
        )}
      </div>
    </div>
  )
}

function TempTool() {
  const [t, setT] = useState(23)
  const ok = t >= 22 && t <= 24
  return (
    <div className="mt-4 rounded-2xl bg-cream-100 p-3 text-sm">
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor="termostato" className="font-semibold">
          Teste o termostato
        </label>
        <span className={`font-semibold tabular-nums ${ok ? 'text-sage-700' : 'text-terra-700'}`}>
          {t}°C · {ok ? 'faixa recomendada' : t < 22 ? 'muito frio' : 'muito quente'}
        </span>
      </div>
      <input
        id="termostato"
        type="range"
        min={16}
        max={30}
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

function Tool({ id }: { id: UsageItem['id'] }) {
  if (id === 'wifi') return <WifiTool />
  if (id === 'ar') return <TempTool />
  return null
}

export function Usage() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {usageItems.map((item, i) => {
        const Icon = item.icon
        return (
          <li key={item.id}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden">
                  <Img
                    name={item.photo}
                    alt={item.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[16/8] w-full object-cover group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="flex items-center gap-3 font-display text-2xl">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-100 text-sage-700">
                      <Icon size={20} aria-hidden />
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{item.text}</p>
                  <Tool id={item.id} />
                </div>
              </article>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
