# Story S-02: Desktop Shell + Wallpaper + Icon Grid

## Goal
Render the Windows 11 desktop — a full-screen wallpaper with 4 clickable app icons — so the portfolio feels like an OS from the first render.

## Acceptance Criteria
- [ ] Full-viewport desktop renders with dark wallpaper (navy gradient) by default
- [ ] 4 desktop icons render in the top-left area: About Me, Projects, Skills, Contact
- [ ] Double-clicking an icon calls `openWindow(appId)` from Zustand windowStore
- [ ] Icons have hover animation (scale up) via Framer Motion
- [ ] No taskbar or windows yet (those are separate stories)

## Components to Create

### `src/config/apps.ts`
Central app config — all 4 apps defined here with id, label, icon, defaultSize, defaultPosition.

### `src/components/desktop/Desktop.tsx`
Root desktop component. Renders `<Wallpaper>` and `<DesktopIconGrid>`.

### `src/components/desktop/Wallpaper.tsx`
Full-screen div. Dark: `bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3e]`. Light: `bg-gradient-to-br from-[#c8e6f7] to-[#e8f4fd]`. Reads from `useThemeStore`.

### `src/components/desktop/DesktopIconGrid.tsx`
Renders a grid of `<DesktopIcon>` components from `APP_CONFIG`. Position: `absolute top-6 left-6 grid grid-cols-1 gap-2`.

### `src/components/desktop/DesktopIcon.tsx`
Single icon button. Props: `{ appId, label, icon }`. Double-click → `openWindow`. Hover: `motion.whileHover scale 1.05`.

## Types / Interfaces Needed
```typescript
// src/types/index.ts
export type AppId = 'about' | 'projects' | 'skills' | 'contact';

export interface AppConfig {
  id: AppId;
  label: string;
  icon: string;
  windowTitle: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}
```

## Zustand Store Stub
Create `src/store/windowStore.ts` with `openWindow` action (even if windows don't render yet — console.log is fine for now).
Create `src/store/themeStore.ts` with `theme: 'dark'` default.

## App.tsx update
Replace placeholder with `<Desktop />`.

## Definition of Done
- [ ] Desktop renders with correct dark gradient wallpaper
- [ ] 4 icons visible with correct labels and emoji icons
- [ ] Double-clicking an icon logs the appId to console
- [ ] Hover animation works on all icons
- [ ] No TypeScript errors
