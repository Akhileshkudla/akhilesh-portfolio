import type { ReactElement } from 'react';
import { useThemeStore } from '@/store/themeStore';

export function ThemeToggle(): ReactElement {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="text-base">{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  );
}
