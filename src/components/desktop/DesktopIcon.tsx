import type { KeyboardEvent, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { useContextMenuStore } from '@/store/contextMenuStore';
import type { AppId } from '@/types';

interface DesktopIconProps {
  appId: AppId;
  label: string;
  icon: string;
}

export function DesktopIcon({ appId, label, icon }: DesktopIconProps): ReactElement {
  const openWindow = useWindowStore((s) => s.openWindow);
  const openMenu = useContextMenuStore((s) => s.open);

  const handleClick = (): void => {
    openWindow(appId);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') openWindow(appId);
  };

  const handleContextMenu = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation(); // prevent desktop menu firing too
    openMenu({ x: e.clientX, y: e.clientY }, [
      { type: 'action', icon: '▶', label: `Open ${label}`, action: () => openWindow(appId) },
      { type: 'separator' },
      {
        type: 'action',
        icon: 'ℹ️',
        label: 'Properties',
        action: () => openWindow(appId), // opens the app as its own "properties"
      },
    ]);
  };

  return (
    <motion.button
      type="button"
      className="flex w-20 flex-col items-center gap-1 rounded-lg p-2 text-zinc-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:drop-shadow-[0_0_8px_rgba(0,120,212,0.5)] focus:outline-none focus:ring-2 focus:ring-[#0078d4]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={handleContextMenu}
      aria-label={`Open ${label}`}
    >
      <span className="text-4xl leading-none drop-shadow-lg">{icon}</span>
      <span className="text-xs font-medium drop-shadow-md dark:drop-shadow-md">{label}</span>
    </motion.button>
  );
}
