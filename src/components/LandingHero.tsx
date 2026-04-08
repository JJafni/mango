const LandingHero = () => {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <div className="text-left">
        <p className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm">
          Welcome to
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Dragon Radar
        </h1>
        <p className="mt-5 max-w-xl text-base text-zinc-200 sm:text-lg">
          Track legends, discover dragon locations, and build your ultimate
          collection from one place.
        </p>
        <button
          type="button"
          className="mt-8 rounded-lg bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}

export default LandingHero
