import type { ReactElement } from 'react';

interface TitleBarProps {
  title: string;
  icon: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
}

export function TitleBar({
  title,
  icon,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized,
}: TitleBarProps): ReactElement {
  return (
    <div className="window-titlebar flex h-8 shrink-0 cursor-grab items-center justify-between rounded-t-lg bg-white/50 dark:bg-zinc-800/50 active:cursor-grabbing select-none">
      <div className="flex items-center gap-2 px-3 text-sm text-zinc-700 dark:text-zinc-200">
        <span>{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex h-full items-stretch">
        <button
          type="button"
          onClick={onMinimize}
          className="flex w-11 items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-600/70 transition-colors"
          aria-label="Minimize window"
        >
          <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor">
            <rect width="10" height="1" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onMaximize}
          className="flex w-11 items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-600/70 transition-colors"
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
        >
          {isMaximized ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="0" width="8" height="8" />
              <polyline points="0,2 0,10 8,10" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="0" y="0" width="10" height="10" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex w-11 items-center justify-center rounded-tr-lg text-zinc-600 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition-colors"
          aria-label="Close window"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <line x1="0" y1="0" x2="10" y2="10" />
            <line x1="10" y1="0" x2="0" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
