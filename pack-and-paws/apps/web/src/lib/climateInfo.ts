interface ClimateInfo {
  weatherSummary: string;
  bestTime: string;
  bestTimeReason: string;
}

const climateMap: Record<string, ClimateInfo> = {
  'subtropical': {
    weatherSummary: 'Hot, humid summers; mild winters. Avg 60-90°F',
    bestTime: 'March - May & October - November',
    bestTimeReason: 'Mild temps ideal for outdoor walks and patio dining with your pup.',
  },
  'humid subtropical': {
    weatherSummary: 'Hot, humid summers; mild winters. Avg 55-90°F',
    bestTime: 'March - May & October - November',
    bestTimeReason: 'Comfortable temps before summer heat, perfect for dog park visits and hiking.',
  },
  'humid subtropical (mountain)': {
    weatherSummary: 'Warm summers; cool winters. Avg 35-80°F',
    bestTime: 'May - June & September - October',
    bestTimeReason: 'Mountain air is crisp, trails are clear, and fall foliage is stunning for hikes with dogs.',
  },
  'mediterranean': {
    weatherSummary: 'Dry, warm summers; mild, wet winters. Avg 50-80°F',
    bestTime: 'April - June & September - November',
    bestTimeReason: 'Golden weather with low humidity — ideal for beach walks and outdoor dining.',
  },
  'alpine mediterranean': {
    weatherSummary: 'Cool summers; cold, snowy winters. Avg 20-75°F',
    bestTime: 'June - September',
    bestTimeReason: 'Mountain trails are snow-free and wildflower meadows are perfect for exploring with dogs.',
  },
  'oceanic': {
    weatherSummary: 'Mild year-round; frequent rain. Avg 40-75°F',
    bestTime: 'June - September',
    bestTimeReason: 'Driest months with long daylight hours for trail adventures and patio hangs.',
  },
  'oceanic marine': {
    weatherSummary: 'Cool, damp year-round; mild temps. Avg 40-70°F',
    bestTime: 'July - September',
    bestTimeReason: 'Warmest and driest window for beach romps and coastal trail walks.',
  },
  'continental': {
    weatherSummary: 'Hot summers; cold winters. Avg 15-85°F',
    bestTime: 'May - June & September - October',
    bestTimeReason: 'Mild shoulder seasons avoid extreme heat and cold — great for dog-friendly outings.',
  },
  'humid continental': {
    weatherSummary: 'Warm summers; cold, snowy winters. Avg 20-85°F',
    bestTime: 'May - June & September - October',
    bestTimeReason: 'Pleasant temps with beautiful spring blooms or fall colors for scenic walks.',
  },
  'humid continental with lake effect': {
    weatherSummary: 'Warm summers; harsh, snowy winters. Avg 15-80°F',
    bestTime: 'June - September',
    bestTimeReason: 'Lake breezes keep summer comfortable; perfect for waterfront and park adventures.',
  },
  'semi-arid': {
    weatherSummary: 'Hot, dry summers; mild winters. Avg 35-95°F',
    bestTime: 'March - May & September - November',
    bestTimeReason: 'Avoid scorching pavement in summer; spring and fall are ideal for desert trail hikes.',
  },
  'semi-arid continental': {
    weatherSummary: 'Hot summers; cold, dry winters. Avg 20-90°F',
    bestTime: 'May - June & September - October',
    bestTimeReason: 'Moderate temps and clear skies for exploring open landscapes and dog parks.',
  },
  'semi-arid highland': {
    weatherSummary: 'Sunny, dry; cool nights. Avg 30-85°F',
    bestTime: 'April - June & September - October',
    bestTimeReason: 'Clear skies and mild days perfect for high-altitude hiking with your pup.',
  },
  'desert': {
    weatherSummary: 'Very hot summers; mild winters. Avg 45-105°F',
    bestTime: 'November - March',
    bestTimeReason: 'Winter is when desert temps are safe for dog paws and outdoor exploration.',
  },
  'hot desert': {
    weatherSummary: 'Extremely hot summers; warm winters. Avg 50-110°F',
    bestTime: 'November - February',
    bestTimeReason: 'Only safe months for extended outdoor time with dogs — pavement cools down.',
  },
  'arid desert': {
    weatherSummary: 'Very hot, dry summers; cool winters. Avg 40-105°F',
    bestTime: 'October - April',
    bestTimeReason: 'Cooler months mean safe paw temps and pleasant desert trail exploration.',
  },
  'mountain': {
    weatherSummary: 'Cool summers; cold, snowy winters. Avg 15-75°F',
    bestTime: 'June - September',
    bestTimeReason: 'Snow melts, trails open, and alpine meadows bloom — peak dog hiking season.',
  },
  'subalpine': {
    weatherSummary: 'Short, cool summers; long, snowy winters. Avg 5-70°F',
    bestTime: 'July - September',
    bestTimeReason: 'Brief window when trails are accessible and wildflowers carpet the mountains.',
  },
  'subarctic continental': {
    weatherSummary: 'Short summers; very cold winters. Avg -10-65°F',
    bestTime: 'June - August',
    bestTimeReason: 'Long daylight hours and mild temps for exploring the great outdoors with your dog.',
  },
  'tropical': {
    weatherSummary: 'Hot and humid year-round. Avg 75-90°F',
    bestTime: 'December - April',
    bestTimeReason: 'Dry season means fewer rain interruptions for beach and park outings.',
  },
  'tropical monsoon': {
    weatherSummary: 'Hot year-round; wet and dry seasons. Avg 75-90°F',
    bestTime: 'November - April',
    bestTimeReason: 'Dry season offers sunny days perfect for outdoor adventures with your pup.',
  },
  'tropical savanna': {
    weatherSummary: 'Warm year-round; distinct wet/dry seasons. Avg 70-90°F',
    bestTime: 'November - April',
    bestTimeReason: 'Dry season means sunny skies and comfortable temps for dog-friendly activities.',
  },
};

export function getClimateInfo(climate: string, region?: string): ClimateInfo {
  const key = climate.toLowerCase().trim();

  // Direct match
  if (climateMap[key]) return climateMap[key];

  // Partial match
  for (const [mapKey, info] of Object.entries(climateMap)) {
    if (key.includes(mapKey) || mapKey.includes(key)) return info;
  }

  // Fallback based on region
  const regionDefaults: Record<string, ClimateInfo> = {
    'West Coast': climateMap['mediterranean'],
    'Pacific Northwest': climateMap['oceanic'],
    'Mountain West': climateMap['mountain'],
    'Southwest': climateMap['semi-arid'],
    'Midwest': climateMap['humid continental'],
    'Southeast': climateMap['humid subtropical'],
    'Northeast': climateMap['humid continental'],
  };

  if (region && regionDefaults[region]) return regionDefaults[region];

  return {
    weatherSummary: 'Varied seasonal weather. Check local forecasts.',
    bestTime: 'Spring & Fall',
    bestTimeReason: 'Moderate temperatures ideal for outdoor activities with dogs.',
  };
}
