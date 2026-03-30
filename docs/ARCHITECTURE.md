# Architecture Document
## Akhilesh K — Windows 11 Portfolio

---

## 1. Overview

The portfolio is a **single-page React application** that simulates a Windows 11 desktop environment. There is no backend — all content is hardcoded in TypeScript data files. State is managed entirely client-side with Zustand. Deployed as a static site on Vercel.

---

## 2. Technology Decisions

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | React 18 + Vite | Fast builds, HMR, modern React features |
| Language | TypeScript | Type safety for window state, props, app configs |
| Styling | Tailwind CSS v3 | Utility-first, dark mode via `dark:` prefix, no CSS files |
| Animation | Framer Motion | Declarative enter/exit animations on windows |
| Drag | react-draggable | Lightweight, works with Framer Motion |
| State | Zustand | Minimal boilerplate, perfect for window manager state |
| Notifications | react-hot-toast | Lightweight, Win11-style positioning |
| Deploy | Vercel | Zero-config static deploy, free tier |

---

## 3. Component Architecture

```
App.tsx
├── ThemeProvider           # Reads themeStore, applies dark class to <html>
├── Desktop
│   ├── Wallpaper           # Background gradient div, theme-aware
│   ├── DesktopIconGrid     # Renders 4 icons from APP_CONFIG
│   │   └── DesktopIcon     # Individual icon (click → open window)
│   └── WindowLayer         # Renders all open windows (z-index managed)
│       └── Window          # Reusable draggable window shell
│           ├── TitleBar    # Drag handle + app name + window controls
│           └── {AppContent} # Injected: AboutApp | ProjectsApp | SkillsApp | ContactApp
├── Taskbar
│   ├── StartButton         # Opens/closes StartMenu
│   ├── TaskbarIcons        # Pinned app icons, active indicator dots
│   └── SystemTray
│       ├── ThemeToggle
│       └── Clock
├── StartMenu               # Conditional render, above taskbar
└── NotificationManager     # Mounts toasts on load
```

---

## 4. State Management (Zustand)

### `windowStore.ts`
```typescript
interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowStore {
  windows: Record<AppId, WindowState>;
  topZIndex: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  setPosition: (id: AppId, position: { x: number; y: number }) => void;
}
```

### `themeStore.ts`
```typescript
interface ThemeStore {
  theme: 'dark' | 'light';
  toggle: () => void;
}
// Persists to localStorage via Zustand persist middleware
```

---

## 5. App Configuration

All app metadata lives in a single config file — no hardcoded strings in components:

```typescript
// src/config/apps.ts
export type AppId = 'about' | 'projects' | 'skills' | 'contact';

export const APP_CONFIG: Record<AppId, AppConfig> = {
  about: {
    id: 'about',
    label: 'About Me',
    icon: '⚙️',
    windowTitle: 'Settings',
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 80, y: 60 },
    component: AboutApp,
  },
  projects: { ... },
  skills: { ... },
  contact: { ... },
};
```

---

## 6. Window Lifecycle

```
User clicks icon
      ↓
openWindow(id) [Zustand]
      ↓
WindowLayer renders <Window id={id} />
      ↓
Framer Motion: animate({ scale: 0.8→1, opacity: 0→1 })
      ↓
User drags TitleBar → react-draggable → setPosition(id, {x,y})
      ↓
User clicks window body → bringToFront(id) → increments topZIndex
      ↓
User clicks minimize → minimizeWindow(id) → display:none + taskbar dot
      ↓
User clicks close → closeWindow(id) → Framer Motion exit animation
```

---

## 7. Folder Structure

```
akhilesh-portfolio/
├── .github/
│   ├── copilot-instructions.md
│   ├── chatmodes/
│   │   ├── architect.chatmode.md
│   │   ├── developer.chatmode.md
│   │   └── reviewer.chatmode.md
│   ├── instructions/
│   │   ├── react-components.instructions.md
│   │   ├── tailwind-win11.instructions.md
│   │   └── zustand-store.instructions.md
│   └── prompts/
│       ├── new-app-window.prompt.md
│       ├── new-desktop-icon.prompt.md
│       └── scaffold-story.prompt.md
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   └── stories/
│       ├── S-01-scaffold.md
│       ├── S-02-desktop.md
│       └── ...
├── src/
│   ├── config/
│   │   └── apps.ts
│   ├── components/
│   │   ├── desktop/
│   │   ├── taskbar/
│   │   ├── window/
│   │   ├── apps/
│   │   └── notifications/
│   ├── store/
│   │   ├── windowStore.ts
│   │   └── themeStore.ts
│   ├── hooks/
│   │   └── useWindowManager.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 8. Key Implementation Notes

**Z-index strategy:** Taskbar = 100, Windows start at 10, `topZIndex` increments by 1 on each `bringToFront`. Start Menu = 200.

**Drag bounds:** `react-draggable` `bounds` prop set to `{ top: 0, left: 0, right: window.innerWidth - windowWidth, bottom: window.innerHeight - 48 }` (48 = taskbar height).

**Tailwind dark mode:** Set `darkMode: 'class'` in `tailwind.config.ts`. ThemeProvider adds/removes `dark` class on `document.documentElement`.

**Frosted glass:** `bg-white/70 backdrop-blur-md border border-white/20` (light) / `bg-zinc-900/70 backdrop-blur-md border border-white/10` (dark).
