// ─── City & Venue Types ───────────────────────────────────────────
export interface City {
  id: string;
  name: string;
  state: string;
  region: string;
  lat: number;
  lng: number;
  dogFriendlinessScore: number; // 1-10
  description: string;
  heroImage: string;
  climate: string;
  population: number;
}

export interface Hotel {
  id: string;
  cityId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  priceRange: PriceRange;
  dogPolicy: string;
  maxDogWeight: number; // lbs, 0 = no limit
  petFee: number;
  amenities: string[];
  rating: number;
  imageUrl: string;
  website: string;
  phone: string;
}

export interface NationalPark {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  dogPolicy: string;
  dogTrails: string[];
  restrictions: string[];
  description: string;
  imageUrl: string;
  website: string;
}

export interface Restaurant {
  id: string;
  cityId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  cuisine: string;
  priceRange: PriceRange;
  dogPolicy: string;
  hasDogMenu: boolean;
  outdoorSeating: boolean;
  waterBowls: boolean;
  rating: number;
  imageUrl: string;
  website: string;
}

export interface Cafe {
  id: string;
  cityId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  dogPolicy: string;
  hasOutdoorPatio: boolean;
  dogTreats: boolean;
  rating: number;
  imageUrl: string;
  website: string;
}

export interface DogPark {
  id: string;
  cityId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  offLeash: boolean;
  fenced: boolean;
  acres: number;
  amenities: string[];
  rating: number;
  imageUrl: string;
  description: string;
}

// ─── Route Types ──────────────────────────────────────────────────
export interface TravelRoute {
  id: string;
  name: string;
  description: string;
  totalMiles: number;
  estimatedDays: number;
  difficulty: RouteDifficulty;
  imageUrl: string;
  highlights: string[];
}

export interface Waypoint {
  id: string;
  routeId: string;
  name: string;
  lat: number;
  lng: number;
  dayNumber: number;
  driveTimeFromPrev: number; // minutes
  description: string;
  nearbyDogStops: string[];
  overnightCityId?: string;
}

export interface RouteCityJunction {
  routeId: string;
  cityId: string;
  orderIndex: number;
}

// ─── User & Household Types ──────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  householdId?: string;
  createdAt: string;
}

export interface Household {
  id: string;
  name: string;
  createdAt: string;
}

export interface Dog {
  id: string;
  householdId: string;
  name: string;
  breed: string;
  weight: number;
  age: number;
  temperament: string;
  specialNeeds?: string;
  imageUrl?: string;
}

export interface DogDocument {
  id: string;
  dogId: string;
  type: DocumentType;
  name: string;
  fileUrl: string;
  expiresAt?: string;
}

// ─── Trip Types ──────────────────────────────────────────────────
export interface Trip {
  id: string;
  householdId: string;
  name: string;
  startDate: string;
  endDate: string;
  routeId?: string;
  status: TripStatus;
  createdAt: string;
}

export interface TripMember {
  id: string;
  tripId: string;
  userId: string;
  role: TripRole;
}

export interface Itinerary {
  id: string;
  tripId: string;
  dayNumber: number;
  cityId: string;
  hotelId?: string;
  activities: string[];
  notes: string;
}

export interface Expense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  description: string;
  paidById: string;
  createdAt: string;
}

export interface PackingList {
  id: string;
  tripId: string;
  item: string;
  category: PackingCategory;
  packed: boolean;
  forDog: boolean;
}

export interface SavedHotel {
  id: string;
  userId: string;
  hotelId: string;
  savedAt: string;
}

// ─── Enums ───────────────────────────────────────────────────────
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';
export type RouteDifficulty = 'easy' | 'moderate' | 'challenging';
export type TripStatus = 'planning' | 'active' | 'completed' | 'cancelled';
export type TripRole = 'organizer' | 'member';
export type DocumentType = 'vaccine' | 'health_cert' | 'registration' | 'other';
export type ExpenseCategory = 'lodging' | 'food' | 'gas' | 'activities' | 'pet' | 'other';
export type PackingCategory = 'clothing' | 'toiletries' | 'electronics' | 'dog_essentials' | 'dog_food' | 'documents' | 'other';

// ─── API Response Types ──────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface ApiError {
  error: string;
  code: string;
  status: number;
}

export interface CityWithStats extends City {
  hotelCount: number;
  parkCount: number;
  restaurantCount: number;
  cafeCount: number;
  dogParkCount: number;
}

export interface TripWithSummary {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  routeId?: string;
  createdAt: string;
  totalExpenses: number;
  itineraryDays: number;
  packingTotal: number;
  packingPacked: number;
}

export interface ExpensesByCategory {
  category: ExpenseCategory;
  total: number;
  count: number;
}

export interface MultiStopTripPlan {
  legs: Array<{
    startCity: { id: string; name: string; state: string; lat: number; lng: number };
    endCity: { id: string; name: string; state: string; lat: number; lng: number };
    distanceMiles: number;
    durationHours: number;
    polyline: Array<{ lat: number; lng: number }>;
  }>;
  totalDistanceMiles: number;
  totalDurationHours: number;
  suggestedStops: Array<{
    city: { id: string; name: string; state: string; lat: number; lng: number; dogFriendlinessScore: number; region: string };
    distanceFromRoute: number;
    routePosition: number;
    hotelCount: number;
    restaurantCount: number;
    dogParkCount: number;
    legIndex: number;
  }>;
}
