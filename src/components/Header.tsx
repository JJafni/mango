import { GooeyInput } from '@/components/ui/gooey-input'
import { useMemo, useState } from 'react'

export type HeaderSearchOption = {
  title: string
  series: string
  description: string
  coverUrl: string
}

type HeaderProps = {
  options: HeaderSearchOption[]
  onSelectOption: (option: HeaderSearchOption) => void
}

const Header = ({ options, onSelectOption }: HeaderProps) => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return options
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.series.toLowerCase().includes(q)
        )
      })
      .slice(0, 8)
  }, [query, options])

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dragon Radar
        </h1>

        <div className="relative w-full sm:w-96">
          <GooeyInput
            placeholder="Search manga..."
            value={query}
            onValueChange={(value) => {
              setQuery(value)
              setOpen(true)
            }}
            onOpenChange={setOpen}
            classNames={{
              trigger: 'bg-zinc-200 text-zinc-900',
              input: 'text-zinc-900 placeholder:text-zinc-600',
              bubbleSurface: 'bg-zinc-200 text-zinc-900',
            }}
          />

          {open && query.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden border border-zinc-700 bg-zinc-900 shadow-xl">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => (
                  <button
                    key={`${item.series}-${item.title}`}
                    type="button"
                    onClick={() => {
                      setQuery(item.title)
                      setOpen(false)
                      onSelectOption(item)
                    }}
                    className="block w-full border-b border-zinc-800 px-3 py-2 text-left last:border-b-0 hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.coverUrl}
                        alt={`${item.series} ${item.title} cover`}
                        className="h-12 w-8 shrink-0 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                        <p className="text-xs text-zinc-400">{item.series}</p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-zinc-400">No matches found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
