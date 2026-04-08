import { GooeyInput } from '@/components/ui/gooey-input'

const Header = () => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dragon Radar
        </h1>

        <div className="w-full sm:w-96">
          <GooeyInput
            placeholder="Search manga..."
            classNames={{
              trigger: 'bg-zinc-200 text-zinc-900',
              input: 'text-zinc-900 placeholder:text-zinc-600',
              bubbleSurface: 'bg-zinc-200 text-zinc-900',
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
