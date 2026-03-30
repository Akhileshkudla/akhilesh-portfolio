import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'dark' | 'light';
  toggle: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark' as const,
      toggle: () => {
        set((state) => ({
          theme: state.theme === 'dark' ? ('light' as const) : ('dark' as const),
        }));
      },
    }),
    { name: 'theme-storage' },
  ),
);
