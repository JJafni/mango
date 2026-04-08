import landingBgImg from './assets/dragon-ball-super-3840x2160-25208.png'
import secondBgImg from './assets/superhero.jpg'
import Header from './components/Header'
import { BackgroundSlideshow, GridPlatform, LandingHero } from './components'
import { dragonBallSuperItems, dragonBallZItems } from './data/mangaData'

const App = () => {
  return (
    <main className="text-white">
      <section className="relative min-h-screen overflow-hidden">
        <BackgroundSlideshow images={[landingBgImg, secondBgImg]} intervalMs={8000} />
        <div className="relative z-20">
          <Header />
        </div>
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
