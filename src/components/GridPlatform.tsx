import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
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
  const [activeItem, setActiveItem] = useState<(GridItem & { slot: number }) | null>(
    null
  )
  const gridRef = useRef<HTMLDivElement | null>(null)
  const itemsPerPage = 4
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

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

  useEffect(() => {
    setCurrentPage(1)
    setActiveItem(null)
  }, [items])

  useEffect(() => {
    if (!gridRef.current) return

    const cards = Array.from(
      gridRef.current.querySelectorAll<HTMLElement>('[data-reveal-card]')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    cards.forEach((card, index) => {
      card.classList.remove('is-visible')
      card.style.transitionDelay = `${index * 90}ms`
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [currentPage])

  useEffect(() => {
    if (!activeItem) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveItem(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeItem])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (activeItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow || ''
    }

    return () => {
      document.body.style.overflow = previousOverflow || ''
    }
  }, [activeItem])

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

      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {pagedItems.map((item, index) => (
          <motion.article
            key={item.title}
            data-reveal-card
            whileHover={{
              y: -10,
              transition: { duration: 0.08, ease: 'easeOut' },
            }}
            onClick={() =>
              setActiveItem({
                ...item,
                slot: (currentPage - 1) * itemsPerPage + index + 1,
              })
            }
            className="reveal-card group flex h-full flex-col overflow-hidden border border-white/15 bg-zinc-900/80 shadow-xl hover:border-violet-300/40"
          >
            <motion.img
              layoutId={`${seriesLabel}-${item.title}-cover`}
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
          </motion.article>
        ))}
      </div>

      {pagedItems.length === 0 && (
        <p className="mt-6 text-sm text-zinc-300">No volumes match your search.</p>
      )}

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

      <AnimatePresence>
        {activeItem && (
          <>
            <motion.button
              type="button"
              aria-label="Close expanded card"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,920px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/20 bg-zinc-900 shadow-2xl"
            >
              <div className="grid md:grid-cols-[300px_1fr]">
                <motion.img
                  layoutId={`${seriesLabel}-${activeItem.title}-cover`}
                  src={activeItem.coverUrl}
                  alt={`${seriesLabel} ${activeItem.title} cover`}
                  className="h-full w-full object-cover md:max-h-[520px]"
                />
                <div className="p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    {seriesLabel}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">{activeItem.title}</h3>
                  <p className="mt-4 text-base text-zinc-300">
                    {activeItem.description}
                  </p>
                  <p className="mt-5 text-xs text-violet-300">
                    Cover slot #{activeItem.slot}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GridPlatform
