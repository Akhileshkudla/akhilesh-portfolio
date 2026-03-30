import { create } from 'zustand';
import type { AppId } from '@/types';
import { APP_CONFIG } from '@/config/apps';

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowStore {
  windows: Record<AppId, WindowState>;
  topZIndex: number;
  isStartMenuOpen: boolean;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  setPosition: (id: AppId, position: { x: number; y: number }) => void;
  setSize: (id: AppId, size: { width: number; height: number }) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

function createInitialWindows(): Record<AppId, WindowState> {
  const entries = Object.values(APP_CONFIG).map((app) => [
    app.id,
    {
      id: app.id,
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: app.defaultPosition,
      size: app.defaultSize,
    },
  ]);
  return Object.fromEntries(entries) as Record<AppId, WindowState>;
}

export const useWindowStore = create<WindowStore>()((set) => ({
  windows: createInitialWindows(),
  topZIndex: 10,
  isStartMenuOpen: false,

  openWindow: (id): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      const newZ = state.topZIndex + 1;
      return {
        topZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...window, isOpen: true, isMinimized: false, zIndex: newZ },
        },
      };
    }),

  closeWindow: (id): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...window, isOpen: false, isMinimized: false },
        },
      };
    }),

  minimizeWindow: (id): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...window, isMinimized: true },
        },
      };
    }),

  restoreWindow: (id): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      const newZ = state.topZIndex + 1;
      return {
        topZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...window, isMinimized: false, zIndex: newZ },
        },
      };
    }),

  bringToFront: (id): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      const newZ = state.topZIndex + 1;
      return {
        topZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...window, zIndex: newZ },
        },
      };
    }),

  setPosition: (id, position): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...window, position },
        },
      };
    }),

  setSize: (id, size): void =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...window, size },
        },
      };
    }),

  toggleStartMenu: (): void => {
    set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen }));
  },

  closeStartMenu: (): void => {
    set({ isStartMenuOpen: false });
  },
}));
