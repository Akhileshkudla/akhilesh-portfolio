import { type ReactElement, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { useWindowStore } from '@/store/windowStore';
import { Desktop } from '@/components/desktop/Desktop';
import { Taskbar } from '@/components/taskbar/Taskbar';
import { NotificationManager } from '@/components/notifications/NotificationManager';
import { BootScreen } from '@/components/desktop/BootScreen';
import { IdleOverlay } from '@/components/desktop/IdleOverlay';
import { ContextMenu } from '@/components/ui/ContextMenu';
import { useQuotesStore } from '@/store/quotesStore';
import type { AppId } from '@/types';

export function App(): ReactElement {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const openWindow = useWindowStore((s) => s.openWindow);
  const pinQuotes = useQuotesStore((s) => s.pin);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Suppress native browser context menu globally
  useEffect(() => {
    const suppress = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', suppress);
    return () => document.removeEventListener('contextmenu', suppress);
  }, []);

  // Ctrl+Q shortcut to open quotes overlay manually
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'q' && e.ctrlKey) {
        e.preventDefault();
        pinQuotes();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pinQuotes]);

  // Handle terminal cross-app commands via custom events (avoids circular imports)
  useEffect(() => {
    const handleOpen = (e: Event) => {
      openWindow((e as CustomEvent<string>).detail as AppId);
    };
    const handleTheme = (e: Event) => {
      const target = (e as CustomEvent<string>).detail;
      if (target === 'toggle') {
        toggleTheme();
      } else if (target === 'dark' && theme !== 'dark') {
        toggleTheme();
      } else if (target === 'light' && theme !== 'light') {
        toggleTheme();
      }
    };
    window.addEventListener('terminal:open-app', handleOpen);
    window.addEventListener('terminal:toggle-theme', handleTheme);
    return () => {
      window.removeEventListener('terminal:open-app', handleOpen);
      window.removeEventListener('terminal:toggle-theme', handleTheme);
    };
  }, [openWindow, toggleTheme, theme]);

  const handleBootComplete = useCallback((): void => {
    setBooting(false);
  }, []);

  return (
    <>
      <Desktop />
      <Taskbar />
      {!booting && <NotificationManager />}
      <IdleOverlay />
      <ContextMenu />
      <AnimatePresence>
        {booting && <BootScreen key="boot" onComplete={handleBootComplete} />}
      </AnimatePresence>
    </>
  );
}
