import { type ReactElement, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContextMenuStore, type ContextMenuItem } from '@/store/contextMenuStore';

const MENU_WIDTH = 220;
const ITEM_HEIGHT = 32;
const PADDING = 8;

function clampPosition(
  x: number,
  y: number,
  itemCount: number,
): { x: number; y: number } {
  const estimatedHeight = itemCount * ITEM_HEIGHT + PADDING * 2;
  const clampedX = x + MENU_WIDTH > window.innerWidth ? x - MENU_WIDTH : x;
  const clampedY = y + estimatedHeight > window.innerHeight ? y - estimatedHeight : y;
  return { x: Math.max(0, clampedX), y: Math.max(0, clampedY) };
}

interface SubmenuProps {
  items: ContextMenuItem[];
  onClose: () => void;
}

function MenuItems({ items, onClose }: SubmenuProps): ReactElement {
  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'separator') {
          return <div key={i} className="my-1 h-px bg-zinc-200 dark:bg-zinc-700" />;
        }

        if (item.type === 'submenu') {
          return (
            <SubMenu key={i} item={item} onClose={onClose} />
          );
        }

        return (
          <button
            key={i}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                item.action();
                onClose();
              }
            }}
            className={`flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-sm text-left transition-colors ${
              item.disabled
                ? 'opacity-40 cursor-default'
                : 'hover:bg-[#0078d4] hover:text-white cursor-default'
            } text-zinc-800 dark:text-zinc-200`}
          >
            {item.icon !== undefined && (
              <span className="w-4 text-center text-sm leading-none flex-shrink-0">{item.icon}</span>
            )}
            <span className="flex-1">{item.label}</span>
          </button>
        );
      })}
    </>
  );
}

function SubMenu({ item, onClose }: { item: Extract<ContextMenuItem, { type: 'submenu' }>; onClose: () => void }): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-[#0078d4] hover:text-white cursor-default transition-colors">
        {item.icon && <span className="w-4 text-center text-sm leading-none flex-shrink-0">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        <span className="text-xs opacity-60">›</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: -4 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-full top-0 ml-1 min-w-[180px] rounded-xl border border-white/20 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl p-1.5"
            style={{ zIndex: 700 }}
          >
            <MenuItems items={item.items} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContextMenu(): ReactElement {
  const { isOpen, position, items, close } = useContextMenuStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const clamped = clampPosition(position.x, position.y, items.length);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          key="context-menu"
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          className="fixed min-w-[220px] rounded-xl border border-white/20 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl p-1.5"
          style={{ left: clamped.x, top: clamped.y, zIndex: 600 }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <MenuItems items={items} onClose={close} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
