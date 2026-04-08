const Header = () => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dragon Radar
        </h1>

        <form className="w-full sm:w-96" role="search">
          <label htmlFor="dragon-search" className="sr-only">
            Search
          </label>
          <input
            id="dragon-search"
            type="search"
            placeholder="Search dragons..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
          />
        </form>
      </div>
    </header>
  )
}

export default Header
