import { useId } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import {
  clamp,
  css,
  hex,
  mix,
  sample,
  sampleColor,
  smooth,
  type ColorFrames,
  type NumFrames,
} from '../../lib/color'

/* Keyframes do dia: hora (0-24) -> valor. */
const SKY_TOP: ColorFrames = [
  [0, '#0a1020'], [4.5, '#0d1530'], [5.8, '#35457a'], [6.8, '#5f86bb'], [9, '#6fa8dc'],
  [12.5, '#4a95d6'], [16, '#5f9fd8'], [17.8, '#5367a3'], [18.8, '#2f3a72'], [20.3, '#111a3a'], [24, '#0a1020'],
]
const SKY_BOTTOM: ColorFrames = [
  [0, '#1a2744'], [4.5, '#1f2c4d'], [5.8, '#8d7596'], [6.6, '#f3b184'], [8.5, '#cfe6f3'],
  [12.5, '#b7dbf2'], [16, '#f0e3bd'], [17.8, '#f4a46a'], [18.8, '#b86a7a'], [20.3, '#2a3560'], [24, '#1a2744'],
]
const NIGHT: NumFrames = [[0, 1], [4.6, 1], [6.4, 0], [18.6, 0], [20.6, 1], [24, 1]]
const GLOW: NumFrames = [[0, 0], [5.3, 0], [6.4, 1], [8, 0.15], [12, 0], [16.6, 0.1], [18, 1], [19.6, 0.45], [21, 0], [24, 0]]

const rnd = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

const STARS = Array.from({ length: 48 }, (_, i) => ({
  x: rnd(i + 1) * 600,
  y: rnd(i + 101) * 340,
  r: 0.6 + rnd(i + 201) * 1.3,
  delay: rnd(i + 301) * 4,
}))

const FIREFLIES = [
  { x: 120, y: 600, d: 0 }, { x: 205, y: 650, d: 1.2 }, { x: 470, y: 590, d: 0.6 },
  { x: 545, y: 640, d: 2 }, { x: 90, y: 680, d: 1.7 }, { x: 330, y: 690, d: 0.9 }, { x: 430, y: 670, d: 2.6 },
]

type Pt = readonly [number, number]
const quad = (p0: Pt, c: Pt, p2: Pt, t: number): Pt => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p2[1],
]

const STRANDS: { p0: Pt; c: Pt; p2: Pt }[] = [
  { p0: [86, 488], c: [158, 548], p2: [229, 452] },
  { p0: [371, 452], c: [442, 548], p2: [514, 488] },
]

const FRONDS = [-86, -58, -30, -2, 26, 52]

function Palm({
  x, y, lean, height, trunk, leaf,
}: { x: number; y: number; lean: number; height: number; trunk: string; leaf: string }) {
  const cx = x + lean
  const cy = y - height
  return (
    <g>
      <path
        d={`M${x} ${y} Q ${x + lean * 0.1} ${y - height * 0.55} ${cx} ${cy}`}
        stroke={trunk}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <g transform={`translate(${cx} ${cy})`}>
        {FRONDS.map((a) => (
          <g key={a}>
            <path d="M0 0 Q 44 -40 104 10 Q 48 -14 0 0Z" fill={leaf} transform={`rotate(${a})`} />
            <path d="M0 0 Q 44 -40 104 10 Q 48 -14 0 0Z" fill={leaf} transform={`scale(-1 1) rotate(${a})`} />
          </g>
        ))}
        <circle cx="-5" cy="8" r="5" fill={trunk} />
        <circle cx="5" cy="9" r="5" fill={trunk} />
      </g>
    </g>
  )
}

export function phaseLabel(hour: number) {
  if (hour < 5) return 'Madrugada'
  if (hour < 7.5) return 'Amanhecer'
  if (hour < 11) return 'Manhã'
  if (hour < 15) return 'Meio-dia'
  if (hour < 17.3) return 'Tarde'
  if (hour < 19.5) return 'Entardecer'
  return 'Noite'
}

export function formatHour(hour: number) {
  const h = Math.floor(hour) % 24
  const m = Math.floor((hour - Math.floor(hour)) * 60 / 15) * 15
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function Scene({ hour, pointer }: { hour: number; pointer: MotionValue<number> }) {
  const id = useId().replace(/:/g, '')

  // parallax pelo ponteiro (-1..1)
  const farX = useTransform(pointer, (v) => v * -7)
  const nearX = useTransform(pointer, (v) => v * -13)
  const frontX = useTransform(pointer, (v) => v * -20)

  const night = sample(NIGHT, hour)
  const glow = sample(GLOW, hour)
  const top = sampleColor(SKY_TOP, hour)
  const bottom = sampleColor(SKY_BOTTOM, hour)
  const warm = hex('#ff9a5a')
  const shade = (day: string, nightColor: string, tint = 0.16) =>
    css(mix(mix(hex(day), hex(nightColor), night), warm, glow * tint))

  // sol e lua percorrem um arco
  const tSun = (hour - 6) / 12
  const sunElev = Math.sin(Math.PI * tSun)
  const sunX = 70 + tSun * 460
  const sunY = 470 - sunElev * 360
  const sunOpacity = smooth(-0.04, 0.09, sunElev)
  const sunColor = css(mix(hex('#ff7d45'), hex('#fff3c0'), smooth(0.02, 0.55, sunElev)))

  const tMoon = ((hour + 6) % 24) / 12
  const moonElev = Math.sin(Math.PI * tMoon)
  const moonX = 70 + tMoon * 460
  const moonY = 470 - moonElev * 360
  const moonOpacity = smooth(-0.03, 0.12, moonElev) * (0.3 + 0.7 * night)

  const lit = clamp(night * 1.15 + glow * 0.45)
  const lightsOn = clamp(night * 1.2 + glow * 0.6)
  const glass = css(mix(mix(bottom, hex('#1d2a28'), 0.45), hex('#ffc873'), lit * 0.9))
  const cloud = css(mix(mix(hex('#ffffff'), hex('#2b3555'), night * 0.85), warm, glow * 0.35))
  const deck = shade('#8b6a4a', '#2b2119', 0.2)
  const bedCover = css(mix(hex('#d9d3c6'), hex('#8a6f3b'), lit * 0.55))

  return (
    <svg
      viewBox="0 0 600 720"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label={`Ilustração do chalé durante o período: ${phaseLabel(hour).toLowerCase()}`}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={css(top)} />
          <stop offset="1" stopColor={css(bottom)} />
        </linearGradient>
        <linearGradient id={`${id}-horizon`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a5a" stopOpacity="0" />
          <stop offset="1" stopColor="#ff9a5a" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id={`${id}-warm`}>
          <stop offset="0" stopColor="#ffc873" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffc873" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor={sunColor} stopOpacity="0.9" />
          <stop offset="1" stopColor={sunColor} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-b4`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <rect width="600" height="720" fill={`url(#${id}-sky)`} />

      {/* estrelas */}
      <g opacity={smooth(0.15, 0.9, night)}>
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#fff8e6"
            className="twinkle"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </g>

      {/* brilho do horizonte */}
      <rect y="250" width="600" height="260" fill={`url(#${id}-horizon)`} opacity={glow * 0.8} />

      {/* sol */}
      <g opacity={sunOpacity}>
        <circle cx={sunX} cy={sunY} r="130" fill={`url(#${id}-sun)`} />
        <circle cx={sunX} cy={sunY} r="34" fill={sunColor} />
      </g>

      {/* lua */}
      <g opacity={moonOpacity}>
        <circle cx={moonX} cy={moonY} r="60" fill="#dfe7ff" opacity="0.16" />
        <circle cx={moonX} cy={moonY} r="24" fill="#f6f1de" />
        <circle cx={moonX - 7} cy={moonY - 5} r="4" fill="#e1dac2" />
        <circle cx={moonX + 8} cy={moonY + 7} r="5" fill="#e1dac2" />
        <circle cx={moonX + 4} cy={moonY - 10} r="2.5" fill="#e1dac2" />
      </g>

      {/* nuvens */}
      <g fill={cloud} opacity={0.92 - night * 0.45}>
        <g className="drift" style={{ animationDuration: '16s' }}>
          <ellipse cx="130" cy="150" rx="46" ry="13" />
          <ellipse cx="160" cy="140" rx="30" ry="14" />
          <ellipse cx="108" cy="142" rx="24" ry="11" />
        </g>
        <g className="drift" style={{ animationDuration: '21s', animationDirection: 'alternate-reverse' }}>
          <ellipse cx="440" cy="205" rx="52" ry="14" />
          <ellipse cx="470" cy="193" rx="30" ry="14" />
          <ellipse cx="418" cy="196" rx="24" ry="11" />
        </g>
      </g>

      {/* morros ao fundo */}
      <motion.g style={{ x: farX }}>
        <path
          d="M-60 470 C 40 410, 170 430, 260 452 S 430 408, 520 438 S 640 452 680 440 V 720 H -60 Z"
          fill={shade('#8fa17f', '#1c2a2c')}
        />
      </motion.g>
      <motion.g style={{ x: nearX }}>
        <path
          d="M-60 522 C 60 478, 190 500, 300 506 S 500 480, 680 512 V 720 H -60 Z"
          fill={shade('#6f8a5f', '#16241f')}
        />
      </motion.g>
      <path
        d="M-60 580 Q 150 552 300 565 T 680 572 V 720 H -60 Z"
        fill={shade('#5f7d4e', '#122019')}
      />

      {/* coqueiros */}
      <motion.g style={{ x: frontX }}>
        <Palm x={58} y={606} lean={26} height={250} trunk={shade('#7a5a3f', '#2a1f1a')} leaf={shade('#4f7a45', '#142319')} />
        <Palm x={546} y={606} lean={-24} height={220} trunk={shade('#7a5a3f', '#2a1f1a')} leaf={shade('#4f7a45', '#142319')} />
      </motion.g>

      {/* chalé */}
      <motion.g style={{ x: nearX }}>
        <ellipse cx="300" cy="620" rx="190" ry="9" fill="#000" opacity="0.22" filter={`url(#${id}-b4)`} />
        <circle cx="300" cy="470" r="200" fill={`url(#${id}-warm)`} opacity={lit * 0.55} />

        <polygon points="300,290 440,614 160,614" fill="#262626" />
        <polygon points="300,290 440,614 160,614" fill="none" stroke="#b5732d" strokeWidth="7" strokeLinejoin="round" />

        <polygon points="300,328 418,602 182,602" fill={glass} />
        <polygon points="300,328 355,602 182,602" fill="#fff" opacity={0.07 * (1 - night)} />

        {/* interior */}
        <g>
          <line x1="300" y1="328" x2="300" y2="372" stroke="#1b1b1b" strokeWidth="1.5" opacity="0.6" />
          <circle cx="300" cy="380" r="16" fill={`url(#${id}-warm)`} opacity={lit} />
          <circle cx="300" cy="380" r="6" fill="#ffd98a" opacity={0.35 + 0.65 * lit} />
          <rect x="226" y="566" width="148" height="30" rx="7" fill={bedCover} />
          <rect x="234" y="555" width="44" height="16" rx="7" fill={css(mix(hex('#ece7dc'), hex('#a98a4a'), lit * 0.5))} />
        </g>

        <g stroke="#1b1b1b" strokeWidth="4" strokeLinecap="round">
          <line x1="300" y1="328" x2="300" y2="602" />
          <line x1="260" y1="420" x2="340" y2="420" />
          <line x1="226" y1="500" x2="374" y2="500" />
        </g>
        <polygon points="300,328 418,602 182,602" fill="none" stroke="#1b1b1b" strokeWidth="5" strokeLinejoin="round" />

        {/* deck */}
        <polygon points="124,614 476,614 524,664 76,664" fill={deck} />
        <polygon points="76,664 524,664 524,673 76,673" fill={shade('#5f4631', '#1b140f', 0.12)} />
        <g stroke="#000" strokeOpacity="0.15" strokeWidth="1.3">
          <line x1="112" y1="626" x2="488" y2="626" />
          <line x1="100" y1="639" x2="500" y2="639" />
          <line x1="88" y1="652" x2="512" y2="652" />
        </g>

        {/* mesa e cadeiras */}
        <g>
          <rect x="327" y="632" width="16" height="22" rx="6" fill={shade('#2d3a58', '#0f1524', 0.1)} />
          <rect x="443" y="632" width="16" height="22" rx="6" fill={shade('#2d3a58', '#0f1524', 0.1)} />
          <rect x="386" y="640" width="4" height="15" fill="#2a2522" />
          <ellipse cx="388" cy="656" rx="14" ry="4" fill="#2a2522" />
          <ellipse cx="388" cy="640" rx="34" ry="8" fill="#3b3633" />
          <ellipse cx="388" cy="638.5" rx="30" ry="6" fill="#4a443f" />
        </g>

        {/* luzinhas */}
        {STRANDS.map((s, si) => {
          const bulbs = Array.from({ length: 8 }, (_, k) => quad(s.p0, s.c, s.p2, (k + 1) / 9))
          return (
            <g key={si}>
              <path d={`M${s.p0[0]} ${s.p0[1]} Q ${s.c[0]} ${s.c[1]} ${s.p2[0]} ${s.p2[1]}`} fill="none" stroke="#3b332c" strokeWidth="1.2" />
              {bulbs.map(([bx, by], k) => (
                <g key={k}>
                  <circle cx={bx} cy={by + 3} r="9" fill="#ffd98a" opacity={lightsOn * 0.38} filter={`url(#${id}-b4)`} />
                  <circle cx={bx} cy={by + 3} r="3.4" fill="#ffd98a" opacity={0.25 + 0.75 * lightsOn} />
                </g>
              ))}
            </g>
          )
        })}
      </motion.g>

      {/* vagalumes */}
      <g opacity={smooth(0.5, 1, night)}>
        {FIREFLIES.map((f, i) => (
          <circle
            key={i}
            cx={f.x}
            cy={f.y}
            r="2.6"
            fill="#eaff9d"
            className="firefly"
            style={{ animationDelay: `${f.d}s`, transformBox: 'fill-box' }}
          />
        ))}
      </g>
    </svg>
  )
}
