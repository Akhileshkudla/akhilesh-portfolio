---
applyTo: "src/**/*.tsx"
---

# Tailwind CSS — Windows 11 Design System

## Window Glass Effect
```tsx
// Standard window
className="backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-white/10 rounded-lg shadow-2xl"

// Title bar
className="h-8 bg-white/50 dark:bg-zinc-800/50 border-b border-white/20 dark:border-white/10 flex items-center px-3 rounded-t-lg"
```

## Taskbar
```tsx
className="fixed bottom-0 left-0 right-0 h-12 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-white/20 dark:border-white/10 flex items-center justify-between px-4 z-[100]"
```

## Start Menu
```tsx
className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[500px] bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-xl shadow-2xl p-6 z-[200]"
```

## Desktop Icon
```tsx
className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 cursor-pointer select-none w-20 text-center"
```

## Accent Colors
- Primary button: `bg-[#0078d4] hover:bg-[#006cbd] text-white`
- Active/selected: `bg-[#0078d4]/20 border border-[#0078d4]`
- Icon accent dot (minimized indicator): `bg-[#0078d4]`

## Typography
```tsx
// Window title
className="text-sm font-medium text-zinc-800 dark:text-zinc-100"

// Body text in apps
className="text-sm text-zinc-700 dark:text-zinc-300"

// Muted / secondary
className="text-xs text-zinc-500 dark:text-zinc-400"
```

## Scrollbars (in app windows)
```tsx
className="overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
```

## Skill Progress Bar
```tsx
// Container
className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2"
// Fill (animated width via Framer Motion)
className="bg-[#0078d4] h-2 rounded-full"
```
