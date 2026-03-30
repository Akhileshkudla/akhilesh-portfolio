import { type ReactElement, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { Desktop } from '@/components/desktop/Desktop';
import { Taskbar } from '@/components/taskbar/Taskbar';
import { NotificationManager } from '@/components/notifications/NotificationManager';
import { BootScreen } from '@/components/desktop/BootScreen';

export function App(): ReactElement {
  const theme = useThemeStore((s) => s.theme);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleBootComplete = useCallback((): void => {
    setBooting(false);
  }, []);

  return (
    <>
      <Desktop />
      <Taskbar />
      {!booting && <NotificationManager />}
      <AnimatePresence>
        {booting && <BootScreen key="boot" onComplete={handleBootComplete} />}
      </AnimatePresence>
    </>
  );
}
