import { type ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import type { DraggableEvent, DraggableData } from 'react-draggable';
import { useWindowStore } from '@/store/windowStore';
import { TitleBar } from '@/components/window/TitleBar';
import type { AppId } from '@/types';

interface WindowProps {
  appId: AppId;
  title: string;
  icon: string;
  children: React.ReactNode;
}

type ResizeDir = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

const MIN_W = 320;
const MIN_H = 220;

const HANDLES: Array<{ dir: ResizeDir; className: string }> = [
  { dir: 'n',  className: 'absolute top-0 left-2 right-2 h-1.5 cursor-n-resize' },
  { dir: 's',  className: 'absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize' },
  { dir: 'e',  className: 'absolute right-0 top-2 bottom-2 w-1.5 cursor-e-resize' },
  { dir: 'w',  className: 'absolute left-0 top-2 bottom-2 w-1.5 cursor-w-resize' },
  { dir: 'ne', className: 'absolute top-0 right-0 w-3 h-3 cursor-ne-resize' },
  { dir: 'nw', className: 'absolute top-0 left-0 w-3 h-3 cursor-nw-resize' },
  { dir: 'se', className: 'absolute bottom-0 right-0 w-3 h-3 cursor-se-resize' },
  { dir: 'sw', className: 'absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize' },
];

export function Window({ appId, title, icon, children }: WindowProps): ReactElement {
  const windowState = useWindowStore((s) => s.windows[appId]);
  const bringToFront  = useWindowStore((s) => s.bringToFront);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const closeWindow   = useWindowStore((s) => s.closeWindow);
  const setPosition   = useWindowStore((s) => s.setPosition);
  const setSize       = useWindowStore((s) => s.setSize);

  const [isMaximized, setIsMaximized] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  // --- resize state ---
  const resizing = useRef<{
    dir: ResizeDir;
    startX: number; startY: number;
    startW: number; startH: number;
    startPx: number; startPy: number;
  } | null>(null);

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDir): void => {
      if (isMaximized) return;
      e.preventDefault();
      e.stopPropagation();
      const s = windowState;
      if (!s) return;
      bringToFront(appId);
      resizing.current = {
        dir,
        startX: e.clientX,
        startY: e.clientY,
        startW: s.size.width,
        startH: s.size.height,
        startPx: s.position.x,
        startPy: s.position.y,
      };
    },
    [appId, bringToFront, isMaximized, windowState],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      const r = resizing.current;
      if (!r) return;
      const dx = e.clientX - r.startX;
      const dy = e.clientY - r.startY;

      let w = r.startW;
      let h = r.startH;
      let px = r.startPx;
      let py = r.startPy;

      if (r.dir.includes('e')) w = Math.max(MIN_W, r.startW + dx);
      if (r.dir.includes('s')) h = Math.max(MIN_H, r.startH + dy);
      if (r.dir.includes('w')) {
        const newW = Math.max(MIN_W, r.startW - dx);
        px = r.startPx + (r.startW - newW);
        w = newW;
      }
      if (r.dir.includes('n')) {
        const newH = Math.max(MIN_H, r.startH - dy);
        py = r.startPy + (r.startH - newH);
        h = newH;
      }

      setSize(appId, { width: w, height: h });
      setPosition(appId, { x: px, y: py });
    };

    const onUp = (): void => { resizing.current = null; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [appId, setPosition, setSize]);

  // --- drag / other handlers ---
  const handleDragStop = useCallback(
    (_e: DraggableEvent, data: DraggableData): void => {
      setPosition(appId, { x: data.x, y: data.y });
    },
    [appId, setPosition],
  );

  const handleMouseDown = useCallback((): void => {
    bringToFront(appId);
  }, [appId, bringToFront]);

  const handleMinimize = useCallback((): void => { minimizeWindow(appId); }, [appId, minimizeWindow]);
  const handleMaximize = useCallback((): void => { setIsMaximized((p) => !p); }, []);
  const handleClose    = useCallback((): void => { closeWindow(appId); }, [appId, closeWindow]);

  if (!windowState) return <></>;

  const { size, position, zIndex, isMinimized } = windowState;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={handleDragStop}
      disabled={isMaximized}
      bounds={{
        top: 0,
        left: 0,
        right: window.innerWidth - size.width,
        bottom: window.innerHeight - 48 - size.height,
      }}
    >
      <div
        ref={nodeRef}
        style={{
          zIndex,
          position: 'absolute',
          display: isMinimized ? 'none' : undefined,
          width: isMaximized ? '100vw' : size.width,
          height: isMaximized ? 'calc(100vh - 48px)' : size.height,
        }}
        onMouseDown={handleMouseDown}
      >
        <AnimatePresence>
          <motion.div
            key={appId}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative flex w-full h-full flex-col overflow-hidden rounded-lg border border-white/20 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-2xl"
          >
            <TitleBar
              title={title}
              icon={icon}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
              onClose={handleClose}
              isMaximized={isMaximized}
            />
            <div className="flex-1 overflow-hidden">
              {children}
            </div>

            {/* Resize handles — invisible hit areas on all 8 edges/corners */}
            {!isMaximized && HANDLES.map(({ dir, className }) => (
              <div
                key={dir}
                className={className}
                onMouseDown={(e) => { handleResizeMouseDown(e, dir); }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Draggable>
  );
}
