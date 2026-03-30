---
applyTo: "src/components/**/*.tsx"
---

# React Component Rules

## Structure
Every component file must follow this order:
1. Imports
2. Type/interface definitions
3. Component function
4. (No default export — use named exports)

## Example Pattern
```tsx
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

interface DesktopIconProps {
  appId: AppId;
  label: string;
  icon: string;
  onDoubleClick: () => void;
}

export const DesktopIcon = ({ appId, label, icon, onDoubleClick }: DesktopIconProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onDoubleClick}
      aria-label={`Open ${label}`}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 cursor-pointer w-20"
    >
      <span className="text-4xl">{icon}</span>
      <span className="text-xs text-white text-center leading-tight drop-shadow">{label}</span>
    </motion.button>
  );
};
```

## Mandatory Rules
- Use `motion.` prefix from Framer Motion on any element that animates
- All interactive elements must have `aria-label`
- Use `cursor-pointer` on all clickable elements
- Never use `onClick` for double-click — always `onDoubleClick` for desktop icons
- All text on dark wallpaper: `text-white` + `drop-shadow`
