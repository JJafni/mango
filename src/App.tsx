import landingBgImg from './assets/dragon-ball-super-3840x2160-25208.png'
import { HeroBackground, LandingHero } from './components'

const App = () => {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <HeroBackground imageSrc={landingBgImg} />
      <LandingHero />
    </main>
  )
}

export default App
