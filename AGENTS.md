# AGENTS.md

## Cursor Cloud specific instructions

`mango` is a single-page **Dragon Ball manga reader** built with Vite 5 + React 19 + TypeScript, styled with Tailwind CSS v4. It is a **pure client-side SPA** — there is no backend, database, or other service to run. Manga catalog data is static in `src/data/mangaData.ts`.

### Running the app
- Start the dev server with `npm run dev` (Vite, serves on `http://localhost:5173`). This is the only service.
- The update script already runs `npm ci`, so dependencies are installed on startup; no extra setup is needed.

### Non-obvious notes
- `src/App.tsx` fetches `/api/user` and `/api/config` on startup. **No backend exists**, so these calls fail and are caught — `setIsReady(true)` runs in the `finally` block, so the app renders fully anyway. This is expected; do not treat those failed network requests as a broken environment.
- The Reader route `/volume/:series/:id` references volume page images under `public/images/...` that are not in the repo, so reader pages show broken images. The rest of the app (landing hero, search, detail modal, volume grids) works fully.
- `npm run build` (`tsc -b && vite build`) and `npm run lint` currently **fail on pre-existing code issues** (e.g. unused `ReactDOM` import in `src/main.tsx`, missing `@types/react-lines-ellipsis`, `react-hooks/set-state-in-effect` errors). These are code-quality/type issues in the repo, not environment problems. `npm run dev` does not type-check, so the app runs regardless. Do not "fix" these unless the task asks for it.
- There is **no test framework or `test` script** configured.
