import type { ReactElement } from 'react';
import { StartButton } from '@/components/taskbar/StartButton';
import { StartMenu } from '@/components/taskbar/StartMenu';
import { TaskbarIcons } from '@/components/taskbar/TaskbarIcons';
import { SystemTray } from '@/components/taskbar/SystemTray';
import { SearchBar } from '@/components/taskbar/SearchBar';

export function Taskbar(): ReactElement {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] h-12 flex items-center border-t border-white/20 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-3">
      {/* Left: Start button + Search + App icons */}
      <div className="flex items-center gap-1.5">
        <StartButton />
        <SearchBar />
        <TaskbarIcons />
      </div>
      {/* Right: System tray */}
      <div className="ml-auto">
        <SystemTray />
      </div>
      <StartMenu />
    </div>
  );
}
