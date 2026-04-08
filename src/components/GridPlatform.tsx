import { useMemo, useState } from 'react'
import type { GridItem } from '../data/mangaData'

type GridPlatformProps = {
  title: string
  subtitle: string
  seriesLabel: string
  items: GridItem[]
}

const GridPlatform = ({
  title,
  subtitle,
  seriesLabel,
  items,
}: GridPlatformProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const normalizedItems = useMemo(() => {
    return items.map((item) => {
      if (item.coverUrl) return item
      const fallbackCover = `https://placehold.co/400x600/27272a/a1a1aa?text=${encodeURIComponent(
        item.title
      )}`
      return { ...item, coverUrl: fallbackCover }
    })
  }, [items])

  const pagedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return normalizedItems.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, normalizedItems])

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
            <img
              src={item.coverUrl}
              alt={`${seriesLabel} ${item.title} cover`}
              className="aspect-[2/3] w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
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
