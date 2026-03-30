import type { ReactElement } from 'react';
import { ThemeToggle } from '@/components/taskbar/ThemeToggle';
import { Clock } from '@/components/taskbar/Clock';

export function SystemTray(): ReactElement {
  return (
    <div className="flex items-center gap-1">
      <ThemeToggle />
      <Clock />
    </div>
  );
}
