# Story S-01: Project Scaffold

## Goal
Set up the Vite + React + TypeScript + Tailwind + Framer Motion project so every developer can start building immediately.

## Acceptance Criteria
- [ ] `npm run dev` starts the dev server on `localhost:5173` with no errors
- [ ] TypeScript strict mode is enabled
- [ ] Tailwind dark mode is configured as `class`
- [ ] Path aliases `@/` resolve to `src/`
- [ ] Framer Motion, Zustand, react-draggable, react-hot-toast are installed
- [ ] `src/` folder structure matches `docs/ARCHITECTURE.md`
- [ ] A placeholder `App.tsx` renders "Akhilesh OS — Coming Soon" centered on screen

## Commands to Run
```bash
npm create vite@latest akhilesh-portfolio -- --template react-ts
cd akhilesh-portfolio
npm install framer-motion zustand react-draggable react-hot-toast
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Config Files to Create/Modify

### `tailwind.config.ts`
```ts
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

### `vite.config.ts` — add path alias
```ts
import path from 'path'
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

### `tsconfig.json` — add paths
```json
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }
```

### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Folder Structure to Create
```
src/
  components/desktop/
  components/taskbar/
  components/window/
  components/apps/
  components/notifications/
  store/
  hooks/
  types/
  data/
  config/
```

## Definition of Done
- [ ] Dev server runs clean
- [ ] No TypeScript errors in `App.tsx`
- [ ] Tailwind styles apply (test with `bg-blue-500` on a div)
- [ ] Dark mode toggles by adding `dark` class to `<html>`
