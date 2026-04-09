import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import landingBgImg from "./assets/dragon-ball-super-3840x2160-25208.png";
import secondBgImg from "./assets/superhero.jpg";

import Header from "./components/Header";
import { BackgroundSlideshow, GridPlatform, LandingHero } from "./components";
import { dragonBallSuperItems, dragonBallZItems } from "./data/mangaData";

import type { HeaderSearchOption } from "./components/Header";
import Reader from "./pages/dragon-ball-super/[id]";

const HomePage = ({
  activeSearchItem,
  setActiveSearchItem,
}: {
  activeSearchItem: HeaderSearchOption | null;
  setActiveSearchItem: (item: HeaderSearchOption | null) => void;
}) => {
  const searchOptions = [
    ...dragonBallSuperItems.map((item) => ({
      title: item.title,
      series: "Dragon Ball Super",
      description: item.description,
      coverUrl: item.coverUrl,
    })),
    ...dragonBallZItems.map((item) => ({
      title: item.title,
      series: "Dragon Ball Z",
      description: item.description,
      coverUrl: item.coverUrl,
    })),
  ];

  useEffect(() => {
    if (!activeSearchItem) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSearchItem(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow || "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSearchItem, setActiveSearchItem]);

  return (
    <main className="text-white">
      <section className="relative min-h-screen overflow-hidden">
        <BackgroundSlideshow
          images={[landingBgImg, secondBgImg]}
          intervalMs={8000}
        />

        <div className="relative z-20">
          <Header
            options={searchOptions}
            onSelectOption={setActiveSearchItem}
          />
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

      <AnimatePresence>
        {activeSearchItem && (
          <>
            <motion.button
              type="button"
              aria-label="Close search result modal"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSearchItem(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,920px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/20 bg-zinc-900 shadow-2xl"
            >
              <div className="grid md:grid-cols-[300px_1fr]">
                <img
                  src={activeSearchItem.coverUrl}
                  alt={`${activeSearchItem.series} ${activeSearchItem.title} cover`}
                  className="h-full w-full object-cover md:max-h-[520px]"
                />
                <div className="p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    {activeSearchItem.series}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">
                    {activeSearchItem.title}
                  </h3>
                  <p className="mt-4 text-base text-zinc-300">
                    {activeSearchItem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

const App = () => {
  const [activeSearchItem, setActiveSearchItem] =
    useState<HeaderSearchOption | null>(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            activeSearchItem={activeSearchItem}
            setActiveSearchItem={setActiveSearchItem}
          />
        }
      />

      <Route path="/volume/:series/:id" element={<Reader />} />
    </Routes>
  );
};

export default App;