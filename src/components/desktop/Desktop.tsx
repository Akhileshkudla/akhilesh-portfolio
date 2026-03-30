import type { ReactElement } from 'react';
import { Wallpaper } from '@/components/desktop/Wallpaper';
import { DesktopIconGrid } from '@/components/desktop/DesktopIconGrid';
import { WindowLayer } from '@/components/desktop/WindowLayer';

export function Desktop(): ReactElement {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Wallpaper />
      <DesktopIconGrid />
      <WindowLayer />
    </div>
  );
}
