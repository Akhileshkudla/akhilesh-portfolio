import { type ReactElement, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { APP_CONFIG, APP_ORDER } from '@/config/apps';
import { PROJECTS } from '@/data/projects';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export function StartMenu(): ReactElement {
  const isOpen = useWindowStore((s) => s.isStartMenuOpen);
  const closeStartMenu = useWindowStore((s) => s.closeStartMenu);
  const openWindow = useWindowStore((s) => s.openWindow);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback((): void => {
    closeStartMenu();
  }, [closeStartMenu]);

  useOutsideClick(menuRef, handleClose);

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeStartMenu();
      }
    };
    document.addEventListener('keydown', handler);
    return () => { document.removeEventListener('keydown', handler); };
  }, [closeStartMenu]);

  const handlePinnedClick = (id: Parameters<typeof openWindow>[0]): void => {
    openWindow(id);
    closeStartMenu();
  };

  const handleRecommendedClick = (): void => {
    openWindow('projects');
    closeStartMenu();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute bottom-14 left-2 z-[200] w-[500px] rounded-xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl p-6"
        >
          {/* Pinned section */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Pinned</h2>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">All apps &rarr;</span>
            </div>
            <div className="flex justify-center gap-2">
              {APP_ORDER.map((id) => {
                const app = APP_CONFIG[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { handlePinnedClick(id); }}
                    className="flex w-24 flex-col items-center gap-1.5 rounded-xl p-3 transition-colors hover:bg-white/10 dark:hover:bg-white/5"
                  >
                    <span className="text-3xl">{app.icon}</span>
                    <span className="text-xs text-center text-zinc-800 dark:text-zinc-200">{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommended section */}
          <div className="mb-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Recommended</h2>
            <div className="flex gap-2">
              {PROJECTS.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={handleRecommendedClick}
                  className="flex flex-1 items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10 dark:hover:bg-white/5"
                >
                  <span className="text-2xl">📁</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{project.shortName}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{project.domain}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0078d4] text-xs font-medium text-white">
                AK
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Akhilesh K</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">akhismail@ymail.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
