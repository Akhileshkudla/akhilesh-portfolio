# Story S-04: Taskbar + Clock + System Tray

## Goal
Render the Windows 11 taskbar fixed at the bottom of the screen with centered app icons, a live clock, and a theme toggle — making the OS feel complete and navigable.

## Acceptance Criteria
- [ ] Taskbar renders fixed to bottom, full width, height 48px
- [ ] Frosted glass effect matches Win11 style
- [ ] Start button (Windows logo) on the left
- [ ] Centered pinned app icons (mirrors the 4 desktop apps)
- [ ] Clicking a taskbar icon opens the window (if closed) or restores it (if minimized)
- [ ] Active/open window shows a blue dot indicator below its taskbar icon
- [ ] System tray on right: live clock (updates every second), theme toggle icon
- [ ] Theme toggle switches dark ↔ light and persists to localStorage

## Components to Create

### `src/components/taskbar/Taskbar.tsx`
Root taskbar component. Layout: `flex items-center justify-between`.
Three sections: `<StartButton>`, `<TaskbarIcons>`, `<SystemTray>`.

### `src/components/taskbar/StartButton.tsx`
Windows logo SVG button on the left.
Click → toggles `isStartMenuOpen` in a local boolean state (Start Menu is S-10).
For now: `onClick={() => console.log('Start menu coming in S-10')}`.

### `src/components/taskbar/TaskbarIcons.tsx`
Renders 4 pinned icons from `APP_CONFIG` in a row, centered.
Each icon:
- Shows the app emoji icon
- Has a blue dot below if `windows[appId].isOpen && !windows[appId].isMinimized`
- Click: if closed → `openWindow(id)`, if minimized → `restoreWindow(id)`, if open → `minimizeWindow(id)`

### `src/components/taskbar/SystemTray.tsx`
Right side of taskbar.
Contains `<ThemeToggle>` and `<Clock>`.

### `src/components/taskbar/Clock.tsx`
Live clock. Uses `setInterval` in a `useEffect` to update every 1000ms.
Format: `HH:MM AM/PM` on one line, `MM/DD/YYYY` below.
Clean up interval on unmount.

### `src/components/taskbar/ThemeToggle.tsx`
Icon button: 🌙 (dark mode) / ☀️ (light mode).
Calls `useThemeStore().toggle()` on click.

## Types Needed
No new types — uses existing `AppId` and `windowStore`.

## Implementation Notes
- Taskbar z-index: `z-[100]` — above all windows except Start Menu
- Taskbar icon size: `36x36px` touch target, `20px` emoji inside
- Active dot: `w-1 h-1 rounded-full bg-[#0078d4] mx-auto mt-0.5`
- Hover effect on taskbar icons: `hover:bg-white/10 rounded-lg`

## Definition of Done
- [ ] Taskbar renders correctly in dark and light mode
- [ ] Clicking taskbar icons opens/restores/minimizes windows correctly
- [ ] Active dot appears on open window icons
- [ ] Clock updates live every second
- [ ] Theme toggle switches wallpaper and all window colors
- [ ] No TypeScript errors
