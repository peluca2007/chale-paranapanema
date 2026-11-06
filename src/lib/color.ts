/** Utilitários de cor e interpolação usados pela ilustração do chalé (ciclo do dia). */

export type RGB = readonly [number, number, number]
export type NumFrames = ReadonlyArray<readonly [hour: number, value: number]>
export type ColorFrames = ReadonlyArray<readonly [hour: number, color: string]>

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

/** smoothstep: 0 antes de e0, 1 depois de e1, curva suave no meio. */
export const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0))
  return t * t * (3 - 2 * t)
}

export function hex(h: string): RGB {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function mix(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

export const css = (c: RGB) => `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`

function segment<T>(frames: ReadonlyArray<readonly [number, T]>, h: number) {
  const last = frames.length - 1
  if (h <= frames[0][0]) return { a: frames[0][1], b: frames[0][1], t: 0 }
  if (h >= frames[last][0]) return { a: frames[last][1], b: frames[last][1], t: 0 }
  for (let i = 0; i < last; i++) {
    const [h0, v0] = frames[i]
    const [h1, v1] = frames[i + 1]
    if (h >= h0 && h <= h1) {
      const t = (h - h0) / (h1 - h0)
      return { a: v0, b: v1, t: t * t * (3 - 2 * t) }
    }
  }
  return { a: frames[last][1], b: frames[last][1], t: 0 }
}

/** Valor numérico interpolado entre keyframes (hora -> valor). */
export function sample(frames: NumFrames, h: number): number {
  const { a, b, t } = segment(frames, h)
  return a + (b - a) * t
}

/** Cor interpolada entre keyframes (hora -> cor hex). */
export function sampleColor(frames: ColorFrames, h: number): RGB {
  const { a, b, t } = segment(frames, h)
  return mix(hex(a), hex(b), t)
}
