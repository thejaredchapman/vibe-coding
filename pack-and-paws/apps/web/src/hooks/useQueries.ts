import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useCities(region?: string) {
  return useQuery({
    queryKey: ['cities', region],
    queryFn: async () => {
      const params: Record<string, any> = { pageSize: 250 };
      if (region && region !== 'All Regions') params.region = region;
      const { data } = await api.get('/cities', { params });
      return data;
    },
  });
}

export function useCityDetail(id: string) {
  return useQuery({
    queryKey: ['city', id],
    queryFn: async () => {
      const { data } = await api.get(`/cities/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCityHotels(cityId: string, filters?: Record<string, any>) {
  return useQuery({
    queryKey: ['city-hotels', cityId, filters],
    queryFn: async () => {
      const { data } = await api.get(`/cities/${cityId}/hotels`, { params: filters });
      return data;
    },
    enabled: !!cityId,
  });
}

export function useCityParks(cityId: string) {
  return useQuery({
    queryKey: ['city-parks', cityId],
    queryFn: async () => {
      const { data } = await api.get(`/cities/${cityId}/parks`);
      return data;
    },
    enabled: !!cityId,
  });
}

export function useCityRestaurants(cityId: string, filters?: Record<string, any>) {
  return useQuery({
    queryKey: ['city-restaurants', cityId, filters],
    queryFn: async () => {
      const { data } = await api.get(`/cities/${cityId}/restaurants`, { params: filters });
      return data;
    },
    enabled: !!cityId,
  });
}

export function useCityCafes(cityId: string) {
  return useQuery({
    queryKey: ['city-cafes', cityId],
    queryFn: async () => {
      const { data } = await api.get(`/cities/${cityId}/cafes`);
      return data;
    },
    enabled: !!cityId,
  });
}

export function useCityDogParks(cityId: string, filters?: Record<string, any>) {
  return useQuery({
    queryKey: ['city-dog-parks', cityId, filters],
    queryFn: async () => {
      const { data } = await api.get(`/cities/${cityId}/dog-parks`, { params: filters });
      return data;
    },
    enabled: !!cityId,
  });
}

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      const { data } = await api.get('/routes');
      return data;
    },
  });
}

export function useRouteDetail(id: string) {
  return useQuery({
    queryKey: ['route', id],
    queryFn: async () => {
      const { data } = await api.get(`/routes/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useTripPlan(startCityId: string, endCityId: string, radius: number) {
  return useQuery({
    queryKey: ['trip-plan', startCityId, endCityId, radius],
    queryFn: async () => {
      const { data } = await api.get('/trip/plan', {
        params: { startCityId, endCityId, radius },
      });
      return data;
    },
    enabled: !!startCityId && !!endCityId,
  });
}

export function useMultiStopTripPlan(cityIds: string[], radius: number) {
  return useQuery({
    queryKey: ['multi-stop-plan', cityIds, radius],
    queryFn: async () => {
      const { data } = await api.get('/trip/plan-multi', {
        params: { cityIds: cityIds.join(','), radius },
      });
      return data;
    },
    enabled: cityIds.length >= 2,
  });
}

// ─── Trip Dashboard Queries ─────────────────────────────────────

export function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await api.get('/trips');
      return data.data;
    },
  });
}

export function useTrip(tripId: string) {
  return useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${tripId}`);
      return data.data;
    },
    enabled: !!tripId,
  });
}

export function useTripExpenses(tripId: string) {
  return useQuery({
    queryKey: ['trip-expenses', tripId],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${tripId}/expenses`);
      return data.data;
    },
    enabled: !!tripId,
  });
}

export function useTripPacking(tripId: string) {
  return useQuery({
    queryKey: ['trip-packing', tripId],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${tripId}/packing`);
      return data.data;
    },
    enabled: !!tripId,
  });
}

export function useTripItinerary(tripId: string) {
  return useQuery({
    queryKey: ['trip-itinerary', tripId],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${tripId}/itinerary`);
      return data.data;
    },
    enabled: !!tripId,
  });
}
