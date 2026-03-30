import type { ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { APP_CONFIG, APP_ORDER } from '@/config/apps';
import { Window } from '@/components/window/Window';

export function WindowLayer(): ReactElement {
  const windows = useWindowStore((s) => s.windows);

  const openAppIds = APP_ORDER.filter((appId) => windows[appId]?.isOpen);

  return (
    <AnimatePresence>
      {openAppIds.map((appId) => {
        const appConfig = APP_CONFIG[appId];
        const AppComponent = appConfig.component;
        return (
          <Window
            key={appId}
            appId={appId}
            title={appConfig.windowTitle}
            icon={appConfig.icon}
          >
            <AppComponent />
          </Window>
        );
      })}
    </AnimatePresence>
  );
}
