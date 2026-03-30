# Story S-03: Reusable Window Component + Zustand Window Store

## Goal
Build the reusable draggable Window shell and wire it to Zustand so that double-clicking a desktop icon actually opens a window on screen.

## Acceptance Criteria
- [ ] Double-clicking a desktop icon opens a floating window
- [ ] Window is draggable by its title bar
- [ ] Clicking a window brings it to the front (correct z-index)
- [ ] Minimize button hides the window (window stays in store as minimized)
- [ ] Close button removes the window from view
- [ ] Open animation: scale 0.8→1 + opacity 0→1 (Framer Motion)
- [ ] Close animation: scale 1→0.8 + opacity 1→0
- [ ] Frosted glass effect applied to window

## Components to Create

### `src/components/window/Window.tsx`
Main reusable window shell. Props:
```typescript
interface WindowProps {
  appId: AppId;
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}
```
Uses `Draggable` from react-draggable, `motion.div` from Framer Motion.
Reads `zIndex`, `isMinimized` from `useWindowStore`.
Title bar handles drag via `handle=".window-titlebar"`.

### `src/components/window/TitleBar.tsx`
Props: `{ title, icon, onMinimize, onClose }`.
Height 32px. Window controls on right (close = red, minimize = yellow, maximize = green circles — Win11 style).

### `src/components/desktop/WindowLayer.tsx`
Renders all open, non-minimized windows from `windowStore`. Maps over `APP_CONFIG` and renders `<Window>` with the correct app component as children. Uses `AnimatePresence` for exit animations.

## Complete windowStore
```typescript
interface WindowInstance {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

interface WindowStore {
  windows: Record<AppId, WindowInstance>;
  topZIndex: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  updatePosition: (id: AppId, pos: { x: number; y: number }) => void;
}
```

## App placeholder content
Each app window shows a simple placeholder `<div>` with the app name until the real app components are built (S-06 through S-09).

## Definition of Done
- [ ] Opening a window shows it on screen with frosted glass
- [ ] Drag works — window follows mouse by title bar
- [ ] Multiple windows can be open simultaneously
- [ ] Clicking a window raises it above others
- [ ] Minimize hides window; close removes it
- [ ] Animations play on open and close
- [ ] No TypeScript errors
