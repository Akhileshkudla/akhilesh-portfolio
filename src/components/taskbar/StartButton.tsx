import type { ReactElement } from 'react';
import { useWindowStore } from '@/store/windowStore';

export function StartButton(): ReactElement {
  const toggleStartMenu = useWindowStore((s) => s.toggleStartMenu);
  const isOpen = useWindowStore((s) => s.isStartMenuOpen);

  const handleClick = (): void => {
    toggleStartMenu();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={(e) => { e.stopPropagation(); }}
      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
      aria-label={isOpen ? 'Close Start menu' : 'Open Start menu'}
      aria-expanded={isOpen}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-zinc-700 dark:text-zinc-200"
      >
        <rect x="1" y="1" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="11" y="1" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="1" y="11" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="11" y="11" width="8" height="8" rx="1.5" fill="currentColor" />
      </svg>
    </button>
  );
}
