import { create } from 'zustand';

export type ContextMenuItem =
  | { type: 'action'; label: string; icon?: string; action: () => void; disabled?: boolean }
  | { type: 'separator' }
  | { type: 'submenu'; label: string; icon?: string; items: ContextMenuItem[] };

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  open: (position: { x: number; y: number }, items: ContextMenuItem[]) => void;
  close: () => void;
}

export const useContextMenuStore = create<ContextMenuState>()((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },
  items: [],
  open: (position, items) => set({ isOpen: true, position, items }),
  close: () => set({ isOpen: false }),
}));
