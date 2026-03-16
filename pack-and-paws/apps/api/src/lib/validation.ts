import { z } from 'zod';

// ─── Query Param Schemas ──────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(250).default(20),
});

export const hotelFilterSchema = paginationSchema.extend({
  maxWeight: z.coerce.number().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  familyFriendly: z.coerce.boolean().optional(),
});

export const restaurantFilterSchema = paginationSchema.extend({
  dogMenu: z.coerce.boolean().optional(),
  cuisine: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
});

export const dogParkFilterSchema = paginationSchema.extend({
  offLeash: z.coerce.boolean().optional(),
  fenced: z.coerce.boolean().optional(),
  minAcres: z.coerce.number().optional(),
});

export const searchSchema = z.object({
  q: z.string().min(1).max(200),
  city: z.string().optional(),
  type: z.enum(['hotel', 'restaurant', 'cafe', 'dog_park', 'national_park', 'all']).default('all'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

export const nearbySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radius: z.coerce.number().min(0.1).max(100).default(10), // miles
  type: z.enum(['hotel', 'restaurant', 'cafe', 'dog_park', 'all']).default('all'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

// ─── Auth Schemas ─────────────────────────────────────────────────

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const inviteSchema = z.object({
  email: z.string().email(),
});

// ─── Trip Planning Schema ────────────────────────────────────────

export const tripPlanSchema = z.object({
  startCityId: z.string().min(1),
  endCityId: z.string().min(1),
  radius: z.coerce.number().min(10).max(150).default(50),
});

export const multiStopTripPlanSchema = z.object({
  cityIds: z.string().min(1), // comma-separated city IDs
  radius: z.coerce.number().min(10).max(150).default(50),
});

// ─── Trip CRUD Schemas ──────────────────────────────────────────

export const createTripSchema = z.object({
  name: z.string().min(1).max(200),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  routeId: z.string().optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled']).default('planning'),
});

export const updateTripSchema = createTripSchema.partial();

export const createTripFromPlanSchema = z.object({
  name: z.string().min(1).max(200),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  stops: z.array(z.object({
    cityId: z.string().min(1),
    dayNumber: z.number().int().min(1),
    activities: z.array(z.string()).default([]),
    notes: z.string().default(''),
  })),
});

// ─── Expense Schemas ────────────────────────────────────────────

export const createExpenseSchema = z.object({
  category: z.enum(['lodging', 'food', 'gas', 'activities', 'pet', 'other']),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  description: z.string().min(1).max(500),
});

export const updateExpenseSchema = createExpenseSchema.partial();

// ─── Packing Schemas ────────────────────────────────────────────

export const createPackingItemSchema = z.object({
  item: z.string().min(1).max(200),
  category: z.enum(['clothing', 'toiletries', 'electronics', 'dog_essentials', 'dog_food', 'documents', 'other']),
  forDog: z.boolean().default(false),
});

// ─── Itinerary Schemas ──────────────────────────────────────────

export const createItinerarySchema = z.object({
  dayNumber: z.number().int().min(1),
  cityId: z.string().min(1),
  hotelId: z.string().optional(),
  activities: z.array(z.string()).default([]),
  notes: z.string().default(''),
});

export const updateItinerarySchema = createItinerarySchema.partial();
