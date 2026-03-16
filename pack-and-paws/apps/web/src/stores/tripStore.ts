import { create } from 'zustand';

type DashboardTab = 'itinerary' | 'budget' | 'packing';

interface TripStoreState {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  showExpenseForm: boolean;
  editingExpenseId: string | null;
  openExpenseForm: (expenseId?: string) => void;
  closeExpenseForm: () => void;
  showPackingForm: boolean;
  setShowPackingForm: (show: boolean) => void;
}

export const useTripStore = create<TripStoreState>((set) => ({
  activeTab: 'itinerary',
  setActiveTab: (tab) => set({ activeTab: tab }),
  showExpenseForm: false,
  editingExpenseId: null,
  openExpenseForm: (expenseId) => set({ showExpenseForm: true, editingExpenseId: expenseId ?? null }),
  closeExpenseForm: () => set({ showExpenseForm: false, editingExpenseId: null }),
  showPackingForm: false,
  setShowPackingForm: (show) => set({ showPackingForm: show }),
}));
