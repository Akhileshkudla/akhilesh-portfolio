import type { ReactElement } from 'react';
import { StartButton } from '@/components/taskbar/StartButton';
import { StartMenu } from '@/components/taskbar/StartMenu';
import { TaskbarIcons } from '@/components/taskbar/TaskbarIcons';
import { SystemTray } from '@/components/taskbar/SystemTray';

export function Taskbar(): ReactElement {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] h-12 flex items-center border-t border-white/20 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-3">
      {/* Left: Start button */}
      <StartButton />
      {/* Center: App icons — absolutely positioned for true centering */}
      <div className="absolute left-1/2 -translate-x-1/2">
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
