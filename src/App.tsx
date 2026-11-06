import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Contacts } from './components/Contacts'
import { Explore } from './components/Explore'
import { Marquee, MobileBar } from './components/Extras'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Guide } from './components/guide/Guide'
import { Hero } from './components/hero/Hero'
import { Tour } from './components/Tour'

export default function App() {
  return (
    // respeita a preferência "reduzir movimento" do sistema do visitante
    <MotionConfig reducedMotion="user">
      <a
        href="#chale"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Tour />
        <Gallery />
        <Guide />
        <Explore />
        <Contacts />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  )
}
