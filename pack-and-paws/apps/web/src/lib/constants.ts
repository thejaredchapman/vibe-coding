export const REGIONS = [
  'All Regions',
  'West Coast',
  'Pacific Northwest',
  'Mountain West',
  'Southwest',
  'Midwest',
  'Southeast',
  'Northeast',
] as const;

export const CATEGORY_COLORS = {
  hotel: { bg: 'bg-amber-500', text: 'text-amber-700', light: 'bg-amber-50', hex: '#f59e0b' },
  park: { bg: 'bg-forest-500', text: 'text-forest-700', light: 'bg-forest-50', hex: '#3a8068' },
  restaurant: { bg: 'bg-terracotta-500', text: 'text-terracotta-700', light: 'bg-terracotta-50', hex: '#e36d4a' },
  cafe: { bg: 'bg-sand-600', text: 'text-sand-700', light: 'bg-sand-50', hex: '#b8905e' },
  dogPark: { bg: 'bg-forest-400', text: 'text-forest-600', light: 'bg-forest-50', hex: '#5a9e82' },
} as const;

export const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  moderate: 'bg-amber-100 text-amber-800',
  challenging: 'bg-red-100 text-red-800',
} as const;

export const PRICE_LABELS: Record<string, string> = {
  '$': 'Budget',
  '$$': 'Mid-Range',
  '$$$': 'Upscale',
  '$$$$': 'Luxury',
};
