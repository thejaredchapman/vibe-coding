import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface UiState {
  sidebarOpen: boolean;
  activeCategory: string;
  selectedRegion: string;
  mapStyle: 'streets' | 'satellite' | 'outdoors';
  theme: Theme;
  toggleSidebar: () => void;
  setActiveCategory: (cat: string) => void;
  setSelectedRegion: (region: string) => void;
  setMapStyle: (style: 'streets' | 'satellite' | 'outdoors') => void;
  toggleTheme: () => void;
}

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  activeCategory: 'hotels',
  selectedRegion: 'All Regions',
  mapStyle: 'outdoors',
  theme: getInitialTheme(),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setMapStyle: (style) => set({ mapStyle: style }),
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return { theme: next };
    }),
}));
