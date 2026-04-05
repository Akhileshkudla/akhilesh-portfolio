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
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
        isOpen ? 'bg-white/15 dark:bg-white/10 scale-95' : 'hover:bg-white/10 dark:hover:bg-white/10'
      }`}
      aria-label={isOpen ? 'Close Start menu' : 'Open Start menu'}
      aria-expanded={isOpen}
    >
      <img src="/logo.svg" alt="AK Logo" className="w-7 h-7 object-contain" />
    </button>
  );
}
