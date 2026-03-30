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
    <div className="window-titlebar flex h-8 shrink-0 cursor-grab items-center justify-between rounded-t-lg bg-white/50 dark:bg-zinc-800/50 px-3 active:cursor-grabbing select-none">
      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        <span>{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onMinimize}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ffbd2e] hover:bg-[#e5a928] transition-colors"
          aria-label="Minimize window"
        >
          <span className="text-[8px] leading-none text-yellow-900/60">−</span>
        </button>
        <button
          type="button"
          onClick={onMaximize}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#28c940] hover:bg-[#1fb636] transition-colors"
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
        >
          <span className="text-[8px] leading-none text-green-900/60">
            {isMaximized ? '⧉' : '□'}
          </span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5f57] hover:bg-[#e5453d] transition-colors"
          aria-label="Close window"
        >
          <span className="text-[8px] leading-none text-red-900/60">✕</span>
        </button>
      </div>
    </div>
  );
}
