import type { ReactElement } from 'react';

export function SearchBar(): ReactElement {
  return (
    <div className="flex items-center gap-2 h-8 w-48 px-3 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 cursor-text group hover:bg-white/15 dark:hover:bg-white/10 transition-colors">
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        className="text-zinc-500 dark:text-zinc-400 flex-shrink-0"
      >
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="flex-1 text-xs text-zinc-400 dark:text-zinc-500 select-none">Search</span>
      <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono hidden sm:block">⌃K</span>
    </div>
  );
}
