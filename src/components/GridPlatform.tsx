import { useMemo, useState } from 'react'

type GridItem = {
  title: string
  description: string
}

type GridPlatformProps = {
  title: string
  subtitle: string
  seriesLabel: string
  items: GridItem[]
}

export const dragonBallSuperItems: GridItem[] = [
  { title: 'Volume 1', description: 'The Dragon Ball Super manga begins.' },
  { title: 'Volume 2', description: 'New arcs and stronger rivals emerge.' },
  { title: 'Volume 3', description: 'The battles escalate across universes.' },
  { title: 'Volume 4', description: 'Alliances and stakes keep rising.' },
  { title: 'Volume 5', description: 'A new threat challenges the heroes.' },
  { title: 'Volume 6', description: 'Major turning points and epic clashes.' },
  { title: 'Volume 7', description: 'Warriors train for impossible battles.' },
  { title: 'Volume 8', description: 'Hidden strengths start to awaken.' },
  { title: 'Volume 9', description: 'Enemies push each universe to the edge.' },
  { title: 'Volume 10', description: 'The tournament aftermath changes everything.' },
  { title: 'Volume 11', description: 'A dangerous legacy returns from the past.' },
  { title: 'Volume 12', description: 'New techniques reshape every fight.' },
]

export const dragonBallZItems: GridItem[] = [
  { title: 'Volume 1', description: 'Raditz arrives and the Saiyan saga begins.' },
  { title: 'Volume 2', description: 'Training continues before the invasion.' },
  { title: 'Volume 3', description: 'Goku and friends face Nappa and Vegeta.' },
  { title: 'Volume 4', description: 'The heroes head to Planet Namek.' },
  { title: 'Volume 5', description: 'The Ginyu Force enters the battlefield.' },
  { title: 'Volume 6', description: 'Frieza reveals terrifying new forms.' },
  { title: 'Volume 7', description: 'A Super Saiyan is born.' },
  { title: 'Volume 8', description: 'Future Trunks changes the timeline.' },
  { title: 'Volume 9', description: 'Androids awaken and chaos spreads.' },
  { title: 'Volume 10', description: 'Cell Games push everyone to the limit.' },
  { title: 'Volume 11', description: 'The Great Saiyaman arc begins.' },
  { title: 'Volume 12', description: 'Majin Buu threatens the universe.' },
]

const GridPlatform = ({
  title,
  subtitle,
  seriesLabel,
  items,
}: GridPlatformProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const pagedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, items])

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl ">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-200">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pagedItems.map((item, index) => (
          <article
            key={item.title}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/80 shadow-xl transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="aspect-[2/3] w-full bg-gradient-to-b from-zinc-700 to-zinc-900" />
            <div className="flex min-h-36 flex-1 flex-col p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                {seriesLabel}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 min-h-10 text-sm text-zinc-300">
                {item.description}
              </p>
              <p className="mt-auto pt-3 text-xs text-violet-300">
                Cover slot #{(currentPage - 1) * itemsPerPage + index + 1}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`rounded-lg border px-3 py-2 text-sm ${
              currentPage === page
                ? 'border-violet-400 bg-violet-500 text-white'
                : 'border-white/20 bg-zinc-900 text-zinc-200'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default GridPlatform
