# Story S-09: Start Menu

## Goal
Implement the Windows 11 Start Menu that opens above the taskbar when the Start button is clicked — with pinned app icons, recommended projects, and Akhilesh's profile at the bottom.

## Acceptance Criteria
- [ ] Start Menu opens/closes when Start button is clicked
- [ ] Closes when clicking outside (clicking the desktop or any window)
- [ ] Closes when pressing `Escape`
- [ ] Frosted glass panel, centered above taskbar, ~500px wide
- [ ] Pinned section: 2-row grid of all 4 app icons
- [ ] Recommended section: 2 project cards
- [ ] Footer: "Akhilesh K" name + email
- [ ] Clicking a pinned app opens that window AND closes the Start Menu
- [ ] Open/close animated (slide up + fade in from taskbar)

## Component to Create

### `src/components/taskbar/StartMenu.tsx`

#### Store Update — `windowStore.ts`
Add `isStartMenuOpen: boolean` and `toggleStartMenu / closeStartMenu` actions.

#### Layout
```
┌──────────────────────────────────────────┐
│  Pinned                        All apps → │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  ⚙️  │ │  📁  │ │  📊  │ │  ✉️  │    │
│  │About │ │Projs │ │Skills│ │Contact│   │
│  └──────┘ └──────┘ └──────┘ └──────┘    │
│                                           │
│  Recommended                              │
│  ┌─────────────────┐ ┌─────────────────┐ │
│  │ 📁 F.A.S.T      │ │ 📁 Substation   │ │
│  │ AI / SDLC Auto  │ │ Energy / Viz    │ │
│  └─────────────────┘ └─────────────────┘ │
│───────────────────────────────────────────│
│  👤 Akhilesh K          akhikudla@gmail  │
└──────────────────────────────────────────┘
```

#### Pinned App Button
```tsx
<button
  onClick={() => { openWindow(app.id); closeStartMenu(); }}
  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 w-24 transition-colors"
>
  <span className="text-3xl">{app.icon}</span>
  <span className="text-xs text-zinc-800 dark:text-zinc-200 text-center">{app.label}</span>
</button>
```

#### Recommended Project Card
```tsx
<button
  onClick={() => { openWindow('projects'); closeStartMenu(); }}
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 flex-1 text-left transition-colors"
>
  <span className="text-2xl">📁</span>
  <div>
    <p className="text-sm font-medium dark:text-zinc-200">{project.shortName}</p>
    <p className="text-xs text-zinc-500 dark:text-zinc-400">{project.domain}</p>
  </div>
</button>
```

#### Footer
```tsx
<div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-[#0078d4] flex items-center justify-center text-white text-xs font-medium">AK</div>
    <div>
      <p className="text-sm font-medium dark:text-zinc-200">Akhilesh K</p>
      <p className="text-xs text-zinc-500">akhikudla@gmail.com</p>
    </div>
  </div>
</div>
```

## Animation
```tsx
<AnimatePresence>
  {isStartMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[500px] ..."
    >
```

## Outside Click — Use a hook
```typescript
// src/hooks/useOutsideClick.ts
export const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};
```

## Escape Key — in StartMenu component
```typescript
useEffect(() => {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeStartMenu(); };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [closeStartMenu]);
```

## Definition of Done
- [ ] Start Menu opens and closes correctly
- [ ] Outside click and Escape both close it
- [ ] All 4 pinned apps render and open their window on click
- [ ] Both recommended projects show with name and domain
- [ ] Footer shows AK avatar, name, and email
- [ ] Open/close animation plays
- [ ] Dark and light mode correct
- [ ] No TypeScript errors
