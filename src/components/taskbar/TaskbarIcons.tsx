import type { ReactElement } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { useContextMenuStore } from '@/store/contextMenuStore';
import { APP_CONFIG, APP_ORDER } from '@/config/apps';
import type { AppId } from '@/types';

export function TaskbarIcons(): ReactElement {
  const windows = useWindowStore((s) => s.windows);
  const topZIndex = useWindowStore((s) => s.topZIndex);
  const openWindow = useWindowStore((s) => s.openWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const bringToFront = useWindowStore((s) => s.bringToFront);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const openMenu = useContextMenuStore((s) => s.open);

  const handleClick = (appId: AppId): void => {
    const win = windows[appId];
    if (!win) return;

    if (!win.isOpen) {
      openWindow(appId);
    } else if (win.isMinimized) {
      restoreWindow(appId);
    } else if (win.zIndex < topZIndex) {
      bringToFront(appId);
    } else {
      minimizeWindow(appId);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, appId: AppId): void => {
    e.preventDefault();
    e.stopPropagation();
    const win = windows[appId];
    if (!win) return;

    const items = win.isOpen
      ? win.isMinimized
        ? [
            { type: 'action' as const, icon: '▶', label: 'Restore', action: () => restoreWindow(appId) },
            { type: 'separator' as const },
            { type: 'action' as const, icon: '✕', label: 'Close', action: () => closeWindow(appId) },
          ]
        : [
            { type: 'action' as const, icon: '─', label: 'Minimize', action: () => minimizeWindow(appId) },
            { type: 'separator' as const },
            { type: 'action' as const, icon: '✕', label: 'Close', action: () => closeWindow(appId) },
          ]
      : [{ type: 'action' as const, icon: '▶', label: 'Open', action: () => openWindow(appId) }];

    openMenu({ x: e.clientX, y: e.clientY }, items);
  };

  return (
    <div className="flex items-center gap-1">
      {APP_ORDER.map((appId) => {
        const app = APP_CONFIG[appId];
        const win = windows[appId];
        const isActive = win?.isOpen && !win.isMinimized;

        return (
          <button
            key={appId}
            type="button"
            onClick={() => { handleClick(appId); }}
            onContextMenu={(e) => { handleContextMenu(e, appId); }}
            className="flex h-9 w-9 flex-col items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-white/10 active:scale-90 transition-all"
            aria-label={
              !win?.isOpen
                ? `Open ${app.label}`
                : win.isMinimized
                  ? `Restore ${app.label}`
                  : `Minimize ${app.label}`
            }
          >
            <span className="text-xl leading-none">{app.icon}</span>
            <div
              className={`mt-0.5 h-1 w-1 rounded-full transition-colors ${
                isActive ? 'bg-[#0078d4]' : win?.isOpen ? 'bg-zinc-400 dark:bg-zinc-500' : 'bg-transparent'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
