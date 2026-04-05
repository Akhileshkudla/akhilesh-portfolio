import type { ReactElement } from 'react';
import { Wallpaper } from '@/components/desktop/Wallpaper';
import { DesktopIconGrid } from '@/components/desktop/DesktopIconGrid';
import { WindowLayer } from '@/components/desktop/WindowLayer';
import { useContextMenuStore } from '@/store/contextMenuStore';
import { useThemeStore } from '@/store/themeStore';
import { useWindowStore } from '@/store/windowStore';
import { useQuotesStore } from '@/store/quotesStore';
import { APP_CONFIG, APP_ORDER } from '@/config/apps';

export function Desktop(): ReactElement {
  const openMenu = useContextMenuStore((s) => s.open);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const theme = useThemeStore((s) => s.theme);
  const openWindow = useWindowStore((s) => s.openWindow);
  const pinQuotes = useQuotesStore((s) => s.pin);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    openMenu({ x: e.clientX, y: e.clientY }, [
      {
        type: 'action',
        icon: theme === 'dark' ? '☀️' : '🌙',
        label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        action: toggleTheme,
      },
      { type: 'separator' },
      ...APP_ORDER.map((id) => ({
        type: 'action' as const,
        icon: APP_CONFIG[id].icon,
        label: APP_CONFIG[id].label,
        action: () => openWindow(id),
      })),
      { type: 'separator' },
      { type: 'action', icon: '💬', label: 'View Quotes', action: pinQuotes },
      { type: 'separator' },
      { type: 'action', icon: 'ℹ️', label: 'Portfolio v1.0', action: () => {}, disabled: true },
    ]);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      onContextMenu={handleContextMenu}
    >
      <Wallpaper />
      <DesktopIconGrid />
      <WindowLayer />
    </div>
  );
}
