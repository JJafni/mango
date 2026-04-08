import landingBgImg from './assets/dragon-ball-super-3840x2160-25208.png'
import { GridPlatform, HeroBackground, LandingHero } from './components'
import { dragonBallSuperItems, dragonBallZItems } from './data/mangaData'

const App = () => {
  return (
    <main className="text-white">
      <section className="relative min-h-screen overflow-hidden">
        <HeroBackground imageSrc={landingBgImg} />
        <LandingHero />
      </section>

      <section className="relative bg-zinc-950">
        <GridPlatform
          title="Dragon Ball Super Manga"
          subtitle="Browse volumes and follow the story arc by arc."
          seriesLabel="Dragon Ball Super"
          items={dragonBallSuperItems}
        />
        <GridPlatform
          title="Dragon Ball Z Manga"
          subtitle="Explore the classic DBZ saga volume by volume."
          seriesLabel="Dragon Ball Z"
          items={dragonBallZItems}
        />
      </section>
    </main>
  )
}

export default App
