import { create } from 'zustand';

interface SelectedStop {
  cityId: string;
  cityName: string;
  state: string;
  lat: number;
  lng: number;
  dayNumber: number;
  dogFriendlinessScore: number;
}

interface TripPlannerState {
  selectedStops: SelectedStop[];
  tripName: string;
  startDate: string;
  endDate: string;
  addStop: (stop: Omit<SelectedStop, 'dayNumber'>) => void;
  removeStop: (cityId: string) => void;
  moveStopUp: (index: number) => void;
  moveStopDown: (index: number) => void;
  assignDay: (index: number, dayNumber: number) => void;
  setTripName: (name: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  clearStops: () => void;
}

export const useTripPlannerStore = create<TripPlannerState>((set) => ({
  selectedStops: [],
  tripName: '',
  startDate: '',
  endDate: '',

  addStop: (stop) =>
    set((s) => {
      if (s.selectedStops.some((ss) => ss.cityId === stop.cityId)) return s;
      return {
        selectedStops: [...s.selectedStops, { ...stop, dayNumber: s.selectedStops.length + 1 }],
      };
    }),

  removeStop: (cityId) =>
    set((s) => ({
      selectedStops: s.selectedStops
        .filter((ss) => ss.cityId !== cityId)
        .map((ss, i) => ({ ...ss, dayNumber: i + 1 })),
    })),

  moveStopUp: (index) =>
    set((s) => {
      if (index <= 0) return s;
      const stops = [...s.selectedStops];
      [stops[index - 1], stops[index]] = [stops[index], stops[index - 1]];
      return { selectedStops: stops.map((ss, i) => ({ ...ss, dayNumber: i + 1 })) };
    }),

  moveStopDown: (index) =>
    set((s) => {
      if (index >= s.selectedStops.length - 1) return s;
      const stops = [...s.selectedStops];
      [stops[index], stops[index + 1]] = [stops[index + 1], stops[index]];
      return { selectedStops: stops.map((ss, i) => ({ ...ss, dayNumber: i + 1 })) };
    }),

  assignDay: (index, dayNumber) =>
    set((s) => ({
      selectedStops: s.selectedStops.map((ss, i) => (i === index ? { ...ss, dayNumber } : ss)),
    })),

  setTripName: (tripName) => set({ tripName }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  clearStops: () => set({ selectedStops: [], tripName: '', startDate: '', endDate: '' }),
}));
