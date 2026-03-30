# Akhilesh K — Portfolio (Windows 11 OS Theme)

## Project Overview
This is a personal portfolio website for **Akhilesh K**, a Software Architect & AI Systems Builder with 10+ years of experience in scalable backend systems, now building AI applications. The site is styled as a fully interactive **Windows 11 desktop OS** in the browser.

## Owner & Identity
- **Name:** Akhilesh K
- **Tagline:** Software Architect & AI Systems Builder — 10+ years crafting scalable backends, now engineering the future with intelligent, autonomous systems.
- **Email:** akhikudla@gmail.com
- **Skills:** .NET, Azure, Docker, Kubernetes, AI/ML (LLMs, agents, pipelines)
- **Projects:**
  - **F.A.S.T** (Fully Automated Software Transformation) — AI-driven system to automate the complete SDLC
  - **Unified Substation Visualiser** — Visualizes entire electrical substations from equipment to communication layer

## Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Drag:** react-draggable
- **State:** Zustand
- **Notifications:** react-hot-toast
- **Language:** TypeScript
- **Deploy:** Vercel

## Project Structure
```
src/
  components/
    desktop/          # Desktop shell, icons, wallpaper
    taskbar/          # Taskbar, Start menu, clock, tray
    window/           # Reusable draggable Window shell
    apps/
      AboutApp.tsx    # Settings-style About Me
      ProjectsApp.tsx # File Explorer-style Projects
      SkillsApp.tsx   # Task Manager-style Skills
      ContactApp.tsx  # Mail-style Contact
    notifications/    # Toast notifications
  store/
    windowStore.ts    # Zustand: open/minimize/z-index state
    themeStore.ts     # Zustand: dark/light mode
  hooks/
  types/
  assets/
    wallpapers/
```

## Coding Standards
- Always use **TypeScript** with explicit types. No `any`.
- Use **functional components** with hooks only. No class components.
- Keep components **small and single-responsibility**.
- Use **Tailwind CSS** for all styling. No inline styles except for dynamic values (e.g., window positions).
- Use **Framer Motion** for all open/close/minimize animations on windows.
- Use **Zustand** for all cross-component state (window open state, z-index stacking, theme).
- Export all components as **named exports**, not default exports (except pages).
- Use **path aliases** (`@/components`, `@/store`, `@/hooks`) — configured in `vite.config.ts`.
- File naming: `PascalCase` for components, `camelCase` for hooks and utilities.

## Windows 11 Design Rules
- Frosted glass effect on windows: `backdrop-blur-md bg-white/70 dark:bg-zinc-900/70`
- Window title bar height: `32px`, with traffic-light-style close/minimize/maximize buttons on the right
- Taskbar height: `48px`, centered icons, pinned to bottom
- Desktop icons: `80x80px` clickable areas with label below
- Dark mode wallpaper: deep navy/purple gradient (`#0a0a1a` to `#1a1a3e`)
- Light mode wallpaper: soft blue/white gradient (`#e8f4fd` to `#c8e6f7`)
- Accent color: Windows 11 blue `#0078d4`
- Font: `Segoe UI` with fallback to system-ui
- Border radius on windows: `8px`
- Window shadow: `shadow-2xl`

## Key Behaviours
- **Multiple windows** can be open simultaneously with correct z-index stacking (clicking a window brings it to front).
- **Dragging** windows is handled by `react-draggable` — constrain to viewport bounds.
- **Minimize** hides the window but keeps it in taskbar; clicking taskbar icon restores it.
- **Start menu** opens on taskbar Windows icon click; closes on outside click.
- **Notifications** fire on page load: welcome toast + "New project: F.A.S.T" toast.
- **Theme toggle** in taskbar tray switches dark/light; persists in `localStorage`.

## What NOT to do
- Do not use CSS Modules or styled-components — Tailwind only.
- Do not use Redux — Zustand only.
- Do not use class components.
- Do not hardcode window positions — use Zustand store with initial positions.
- Do not add external UI libraries (MUI, Chakra, shadcn) — build Win11 UI from scratch with Tailwind.
