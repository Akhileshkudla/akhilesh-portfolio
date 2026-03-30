---
applyTo: "src/store/**/*.ts"
---

# Zustand Store Rules

## Store Template
```typescript
import { create } from 'zustand';

interface StoreState {
  // state properties
}

interface StoreActions {
  // action methods
}

export const useMyStore = create<StoreState & StoreActions>((set, get) => ({
  // initial state
  // actions using set()
}));
```

## Rules
- Never mutate state directly — always use `set()`
- Use `get()` inside actions to read current state
- Keep state flat — no nested objects deeper than 2 levels
- Action names: verb-first — `openWindow`, `setTheme`, `bringToFront`
- Export the hook, not the store: `export const useWindowStore = create(...)`

## windowStore Pattern
```typescript
openWindow: (id) => set((state) => ({
  windows: {
    ...state.windows,
    [id]: {
      ...state.windows[id],
      isOpen: true,
      isMinimized: false,
      zIndex: state.topZIndex + 1,
    }
  },
  topZIndex: state.topZIndex + 1,
}))
```

## themeStore Pattern
```typescript
// Use persist middleware to save to localStorage
import { persist } from 'zustand/middleware';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggle: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),
    }),
    { name: 'akhilesh-portfolio-theme' }
  )
);
```
