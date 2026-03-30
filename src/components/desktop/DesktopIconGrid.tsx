import type { ReactElement } from 'react';
import { APP_CONFIG, APP_ORDER } from '@/config/apps';
import { DesktopIcon } from '@/components/desktop/DesktopIcon';

export function DesktopIconGrid(): ReactElement {
  return (
    <div className="absolute left-6 top-6 grid grid-cols-1 gap-2">
      {APP_ORDER.map((appId) => {
        const app = APP_CONFIG[appId];
        return (
          <DesktopIcon
            key={app.id}
            appId={app.id}
            label={app.label}
            icon={app.icon}
          />
        );
      })}
    </div>
  );
}
