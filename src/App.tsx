import landingBgImg from './assets/dragon-ball-super-3840x2160-25208.png'
import { GridPlatform, HeroBackground, LandingHero } from './components'

const App = () => {
  return (
    <main className="text-white">
      <section className="relative min-h-screen overflow-hidden">
        <HeroBackground imageSrc={landingBgImg} />
        <LandingHero />
      </section>

      <section className="relative bg-zinc-950">
        <GridPlatform />
      </section>
    </main>
  )
}

export default App
