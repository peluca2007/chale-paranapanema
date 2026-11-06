import { useCallback, useEffect, useState } from 'react'

/** useState que persiste no localStorage (com fallback silencioso em modo privado). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível: segue sem persistir */
    }
  }, [key, value])

  return [value, setValue] as const
}

/** Descobre qual seção está na área central da tela (para destacar o menu). */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}

/** Copia texto para a área de transferência e informa qual item foi copiado. */
export function useCopy(resetMs = 1800) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = useCallback(
    async (id: string, text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(id)
        window.setTimeout(() => setCopied((c) => (c === id ? null : c)), resetMs)
      } catch {
        /* sem permissão de clipboard */
      }
    },
    [resetMs],
  )

  return { copied, copy }
}
