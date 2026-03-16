import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

// ─── Trip Mutations ──────────────────────────────────────────────

export function useCreateTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; startDate: string; endDate: string; routeId?: string }) =>
      api.post('/trips', data).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  });
}

export function useUpdateTrip(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, any>) =>
      api.patch(`/trips/${tripId}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trips'] });
      qc.invalidateQueries({ queryKey: ['trip', tripId] });
    },
  });
}

export function useDeleteTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tripId: string) => api.delete(`/trips/${tripId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  });
}

export function useCreateTripFromPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; startDate: string; endDate: string; stops: Array<{ cityId: string; dayNumber: number; activities?: string[]; notes?: string }> }) =>
      api.post('/trips/from-plan', data).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  });
}

// ─── Expense Mutations ───────────────────────────────────────────

export function useAddExpense(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { category: string; amount: number; description: string; currency?: string }) =>
      api.post(`/trips/${tripId}/expenses`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-expenses', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useUpdateExpense(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ expenseId, ...data }: { expenseId: string } & Record<string, any>) =>
      api.patch(`/trips/${tripId}/expenses/${expenseId}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-expenses', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useDeleteExpense(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (expenseId: string) => api.delete(`/trips/${tripId}/expenses/${expenseId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-expenses', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

// ─── Packing Mutations ──────────────────────────────────────────

export function useAddPackingItem(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { item: string; category: string; forDog?: boolean }) =>
      api.post(`/trips/${tripId}/packing`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-packing', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useTogglePacked(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) =>
      api.patch(`/trips/${tripId}/packing/${itemId}/toggle`).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-packing', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useDeletePackingItem(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => api.delete(`/trips/${tripId}/packing/${itemId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-packing', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useAddDefaultPackingItems(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.post(`/trips/${tripId}/packing/defaults`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip-packing', tripId] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

// ─── Itinerary Mutations ────────────────────────────────────────

export function useAddItineraryDay(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { dayNumber: number; cityId: string; hotelId?: string; activities?: string[]; notes?: string }) =>
      api.post(`/trips/${tripId}/itinerary`, data).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trip-itinerary', tripId] }),
  });
}

export function useUpdateItineraryDay(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ dayId, ...data }: { dayId: string } & Record<string, any>) =>
      api.patch(`/trips/${tripId}/itinerary/${dayId}`, data).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trip-itinerary', tripId] }),
  });
}

export function useDeleteItineraryDay(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dayId: string) => api.delete(`/trips/${tripId}/itinerary/${dayId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trip-itinerary', tripId] }),
  });
}
