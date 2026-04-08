const gridItems = [
  { title: 'Volume 1', description: 'The Dragon Ball Super manga begins.' },
  { title: 'Volume 2', description: 'New arcs and stronger rivals emerge.' },
  { title: 'Volume 3', description: 'The battles escalate across universes.' },
  { title: 'Volume 4', description: 'Alliances and stakes keep rising.' },
  { title: 'Volume 5', description: 'A new threat challenges the heroes.' },
  { title: 'Volume 6', description: 'Major turning points and epic clashes.' },
]

const GridPlatform = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Dragon Ball Super Manga
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-200">
          Browse volumes and follow the story arc by arc.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gridItems.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/20 bg-black/35 p-5 shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default GridPlatform
