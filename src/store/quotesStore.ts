import { create } from 'zustand';

interface QuotesStore {
  isPinned: boolean; // manually opened, stays until explicitly dismissed
  pin: () => void;
  unpin: () => void;
}

export const useQuotesStore = create<QuotesStore>()((set) => ({
  isPinned: false,
  pin: () => set({ isPinned: true }),
  unpin: () => set({ isPinned: false }),
}));
