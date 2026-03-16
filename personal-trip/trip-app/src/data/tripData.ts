export interface Traveler {
  id: string;
  name: string;
  color: string;
  colorLight: string;
  airline: string;
  confirmationCode: string;
  returnConfirmationCode?: string;
  routeOut: string;
  routeReturn: string;
  arrivalAirport: string;
  arrivalTime: string;
  arrivalDate: string;
  departureDate: string;
  departureDetails: string;
  presentDays: number[];
  totalDays: number;
  soloDays?: string;
  avatarInitials: string;
  emoji: string;
}

export interface Activity {
  id: string;
  time?: string;
  title: string;
  description?: string;
  icon: string;
  category: 'sightseeing' | 'food' | 'transport' | 'entertainment' | 'shopping' | 'culture' | 'nature';
}

export interface DayPlan {
  day: number;
  date: string;
  dateShort: string;
  city: string;
  subtitle: string;
  travelerIds: string[];
  activities: Activity[];
  accommodation?: string;
  notes?: string;
}

export const TRAVELERS: Traveler[] = [
  {
    id: 'jared',
    name: 'Jared Chapman',
    color: '#2b5797',
    colorLight: '#4a7bc7',
    airline: 'TAP Portugal',
    confirmationCode: 'CSOUCC',
    routeOut: 'LAX → LIS (layover) → LGW',
    routeReturn: 'LHR → LIS → LAX',
    arrivalAirport: 'Gatwick (LGW)',
    arrivalTime: '9:45 AM',
    arrivalDate: 'May 19, 2026',
    departureDate: 'May 23, 2026 (Day 6)',
    departureDetails: 'LHR → LIS → LAX',
    presentDays: [2, 3, 4, 5, 6],
    totalDays: 5,
    avatarInitials: 'JC',
    emoji: '✈️',
  },
  {
    id: 'elias',
    name: 'Elias Rios',
    color: '#c0392b',
    colorLight: '#e74c3c',
    airline: 'American Airlines',
    confirmationCode: 'IJGOAJ',
    routeOut: 'ORD → LHR (direct)',
    routeReturn: 'LHR → ORD',
    arrivalAirport: 'Heathrow (LHR)',
    arrivalTime: '7:20 AM',
    arrivalDate: 'May 19, 2026',
    departureDate: 'May 26, 2026 (Day 9)',
    departureDetails: 'LHR → ORD, 12:15 PM',
    presentDays: [2, 3, 4, 5, 6, 7, 8, 9],
    totalDays: 8,
    soloDays: 'Days 7–9: Camden, Museums, Greenwich',
    avatarInitials: 'ER',
    emoji: '🇺🇸',
  },
  {
    id: 'devonte',
    name: 'Devonte Washington',
    color: '#7b3fa0',
    colorLight: '#9b59b6',
    airline: 'Icelandair',
    confirmationCode: 'BZRV3S',
    returnConfirmationCode: 'C276HK',
    routeOut: 'ORD → KEF (layover) → LGW',
    routeReturn: 'LGW → KEF (FI471, 1:00 PM) → ORD (FI853, arrives 6:15 PM)',
    arrivalAirport: 'Gatwick (LGW)',
    arrivalTime: '11:45 AM',
    arrivalDate: 'May 19, 2026',
    departureDate: 'May 26, 2026 (Day 9)',
    departureDetails: 'LGW → KEF → ORD, 1:00 PM',
    presentDays: [2, 3, 4, 5, 6, 7, 8, 9],
    totalDays: 8,
    avatarInitials: 'DW',
    emoji: '🇮🇸',
  },
  {
    id: 'jordan',
    name: 'Jordan Stafford',
    color: '#22853a',
    colorLight: '#27ae60',
    airline: 'Icelandair',
    confirmationCode: 'BZRV3S',
    returnConfirmationCode: 'C276HK',
    routeOut: 'ORD → KEF (layover) → LGW',
    routeReturn: 'LGW → KEF (FI471, 1:00 PM) → ORD (FI853, arrives 6:15 PM)',
    arrivalAirport: 'Gatwick (LGW)',
    arrivalTime: '11:45 AM',
    arrivalDate: 'May 19, 2026',
    departureDate: 'May 26, 2026 (Day 9)',
    departureDetails: 'LGW → KEF → ORD, 1:00 PM',
    presentDays: [2, 3, 4, 5, 6, 7, 8, 9],
    totalDays: 8,
    avatarInitials: 'JS',
    emoji: '🇮🇸',
  },
];

export const ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: 'Monday, May 18, 2026',
    dateShort: 'May 18',
    city: 'London',
    subtitle: 'Arrival & Royal London',
    travelerIds: [],
    accommodation: 'London Hotel (TBD)',
    activities: [
      { id: 'a1-1', time: 'Morning', title: 'Heathrow Transfer', icon: '🚕', category: 'transport' },
      { id: 'a1-2', time: '11:00 AM', title: 'Buckingham Palace', description: 'Watch the Changing of the Guard', icon: '👑', category: 'sightseeing' },
      { id: 'a1-3', time: 'Afternoon', title: 'Big Ben & Westminster Abbey', description: 'Iconic landmarks walk', icon: '🏛️', category: 'sightseeing' },
      { id: 'a1-4', time: '3:30 PM', title: 'Afternoon Tea at The Orangery', description: 'Traditional English tea experience', icon: '🫖', category: 'food' },
      { id: 'a1-5', time: '7:30 PM', title: 'Dracula Show', description: 'Evening theatre performance', icon: '🧛', category: 'entertainment' },
    ],
  },
  {
    day: 2,
    date: 'Tuesday, May 19, 2026',
    dateShort: 'May 19',
    city: 'London',
    subtitle: 'Harry Potter & Historic London',
    travelerIds: ['jared', 'elias', 'devonte', 'jordan'],
    accommodation: 'London Hotel (TBD)',
    activities: [
      { id: 'a2-1', time: '9:30 AM', title: 'Harry Potter Studio Tour', description: 'Warner Bros. Studio Tour London', icon: '⚡', category: 'entertainment' },
      { id: 'a2-2', time: '1:00 PM', title: 'Borough Market Lunch', description: 'Street food and local delicacies', icon: '🍽️', category: 'food' },
      { id: 'a2-3', time: '3:00 PM', title: 'Tower of London', description: 'Crown Jewels & historic fortress', icon: '🏰', category: 'sightseeing' },
      { id: 'a2-4', time: '5:00 PM', title: 'Tower Bridge', description: 'Iconic bridge crossing & views', icon: '🌉', category: 'sightseeing' },
      { id: 'a2-5', time: '8:00 PM', title: 'Rap Cypher at Boxpark Shoreditch', description: 'Live hip-hop vibes', icon: '🎤', category: 'entertainment' },
    ],
  },
  {
    day: 3,
    date: 'Wednesday, May 20, 2026',
    dateShort: 'May 20',
    city: 'London → Paris',
    subtitle: 'London Highlights & Eurostar',
    travelerIds: ['jared', 'elias', 'devonte', 'jordan'],
    accommodation: 'Paris Hotel (TBD)',
    activities: [
      { id: 'a3-1', time: '9:00 AM', title: 'British Museum', description: 'World-class artifacts & history', icon: '🏛️', category: 'culture' },
      { id: 'a3-2', time: '11:30 AM', title: 'Covent Garden', description: 'Street performers & shopping', icon: '🎭', category: 'shopping' },
      { id: 'a3-3', time: '1:00 PM', title: "Platform 9¾ at King's Cross", description: 'One more Harry Potter photo op', icon: '🧙', category: 'entertainment' },
      { id: 'a3-4', time: '3:30 PM', title: 'Eurostar to Paris', description: 'High-speed train under the English Channel', icon: '🚄', category: 'transport' },
      { id: 'a3-5', time: '7:30 PM', title: 'Dinner in Le Marais', description: 'Parisian neighborhood dining', icon: '🥖', category: 'food' },
    ],
  },
  {
    day: 4,
    date: 'Thursday, May 21, 2026',
    dateShort: 'May 21',
    city: 'Paris',
    subtitle: 'Iconic Paris',
    travelerIds: ['jared', 'elias', 'devonte', 'jordan'],
    accommodation: 'Paris Hotel (TBD)',
    activities: [
      { id: 'a4-1', time: '9:00 AM', title: 'Sainte-Chapelle', description: 'Stunning Gothic stained glass', icon: '⛪', category: 'culture' },
      { id: 'a4-2', time: '10:30 AM', title: 'Notre-Dame Cathedral', description: 'Exterior visit & Île de la Cité', icon: '🏰', category: 'sightseeing' },
      { id: 'a4-3', time: '11:30 AM', title: 'Shakespeare & Company', description: 'Iconic English-language bookshop', icon: '📚', category: 'shopping' },
      { id: 'a4-4', time: '1:00 PM', title: 'Louvre Museum (Timed Entry)', description: 'Mona Lisa, Venus de Milo & more', icon: '🖼️', category: 'culture' },
      { id: 'a4-5', time: '4:00 PM', title: 'Tuileries Garden', description: 'Stroll through royal gardens', icon: '🌳', category: 'nature' },
      { id: 'a4-6', time: '7:00 PM', title: 'Eiffel Tower Summit', description: 'Sunset views from the top', icon: '🗼', category: 'sightseeing' },
    ],
  },
  {
    day: 5,
    date: 'Friday, May 22, 2026',
    dateShort: 'May 22',
    city: 'Paris',
    subtitle: 'Montmartre, Culture & Nightlife',
    travelerIds: ['jared', 'elias', 'devonte', 'jordan'],
    accommodation: 'Paris Hotel (TBD)',
    activities: [
      { id: 'a5-1', time: '9:00 AM', title: 'Sacré-Cœur Basilica', description: 'Hilltop views of Paris', icon: '⛪', category: 'sightseeing' },
      { id: 'a5-2', time: '10:30 AM', title: 'Moulin Rouge (exterior)', description: 'Famous cabaret landmark', icon: '💃', category: 'sightseeing' },
      { id: 'a5-3', time: '1:00 PM', title: "Musée d'Orsay", description: 'Impressionist masterpieces', icon: '🎨', category: 'culture' },
      { id: 'a5-4', time: '4:00 PM', title: 'Seine River Cruise', description: 'See Paris from the water', icon: '🚢', category: 'sightseeing' },
      { id: 'a5-5', time: '6:00 PM', title: 'Champs-Élysées & Arc de Triomphe', description: 'Iconic boulevard & monument', icon: '🏛️', category: 'sightseeing' },
      { id: 'a5-6', time: '9:00 PM', title: 'La Place Hip-Hop Night', description: 'Live hip-hop venue in Paris', icon: '🎶', category: 'entertainment' },
    ],
  },
  {
    day: 6,
    date: 'Saturday, May 23, 2026',
    dateShort: 'May 23',
    city: 'Paris',
    subtitle: 'Last Day & Departure',
    travelerIds: ['jared', 'elias', 'devonte', 'jordan'],
    accommodation: 'Transit',
    notes: 'Jared departs this day — LHR → LIS → LAX',
    activities: [
      { id: 'a6-1', time: '8:00 AM', title: 'Rue Cler Breakfast', description: 'Parisian street breakfast', icon: '🥐', category: 'food' },
      { id: 'a6-2', time: '10:00 AM', title: 'Père Lachaise Cemetery', description: 'Jim Morrison, Oscar Wilde & more', icon: '🪦', category: 'culture' },
      { id: 'a6-3', time: '12:00 PM', title: 'Le Marais Shopping', description: 'Vintage shops & boutiques', icon: '🛍️', category: 'shopping' },
      { id: 'a6-4', time: '3:00 PM', title: 'CDG Airport Departure', description: 'Head to Charles de Gaulle', icon: '✈️', category: 'transport' },
    ],
  },
  {
    day: 7,
    date: 'Sunday, May 24, 2026',
    dateShort: 'May 24',
    city: 'London',
    subtitle: 'Solo: Camden & South Bank',
    travelerIds: ['elias', 'devonte', 'jordan'],
    accommodation: 'London Hotel (TBD)',
    activities: [
      { id: 'a7-1', time: '10:00 AM', title: 'Camden Market', description: 'Eclectic market & street food', icon: '🏪', category: 'shopping' },
      { id: 'a7-2', time: '1:00 PM', title: "Regent's Park & Primrose Hill", description: 'Panoramic London skyline views', icon: '🌳', category: 'nature' },
      { id: 'a7-3', time: '3:30 PM', title: 'South Bank Walk', description: 'Thames riverside promenade', icon: '🚶', category: 'sightseeing' },
      { id: 'a7-4', time: '7:00 PM', title: 'Dishoom Dinner', description: 'Award-winning Indian restaurant', icon: '🍛', category: 'food' },
    ],
  },
  {
    day: 8,
    date: 'Monday, May 25, 2026',
    dateShort: 'May 25',
    city: 'London',
    subtitle: 'Solo: Museums & Notting Hill',
    travelerIds: ['elias', 'devonte', 'jordan'],
    accommodation: 'London Hotel (TBD)',
    activities: [
      { id: 'a8-1', time: '10:00 AM', title: 'Natural History Museum', description: 'Dinosaurs & natural world', icon: '🦕', category: 'culture' },
      { id: 'a8-2', time: '1:00 PM', title: 'V&A Museum', description: 'Art & design collection', icon: '🎨', category: 'culture' },
      { id: 'a8-3', time: '3:30 PM', title: 'Notting Hill & Portobello Road', description: 'Colorful houses & antiques', icon: '🏡', category: 'shopping' },
      { id: 'a8-4', time: '7:00 PM', title: 'Churchill Arms Pub Dinner', description: 'Famous flower-covered pub', icon: '🍺', category: 'food' },
    ],
  },
  {
    day: 9,
    date: 'Tuesday, May 26, 2026',
    dateShort: 'May 26',
    city: 'London',
    subtitle: 'Solo: Greenwich & Departure',
    travelerIds: ['elias', 'devonte', 'jordan'],
    accommodation: 'Departure Day',
    notes: 'All remaining travelers depart — Elias 12:15 PM LHR, Devonte & Jordan 1:00 PM LGW',
    activities: [
      { id: 'a9-1', time: '9:00 AM', title: 'Cutty Sark & Royal Observatory', description: 'Maritime history & Prime Meridian', icon: '🔭', category: 'culture' },
      { id: 'a9-2', time: '11:30 AM', title: 'Greenwich Market Lunch', description: 'Final London food stop', icon: '🍔', category: 'food' },
      { id: 'a9-3', time: '1:30 PM', title: "Tower Bridge to St Paul's Walk", description: 'Last London riverside walk', icon: '🚶', category: 'sightseeing' },
      { id: 'a9-4', time: '3:30 PM', title: 'Airport Departure', description: 'Final departures home', icon: '✈️', category: 'transport' },
    ],
  },
];

export const CITIES = {
  london: {
    name: 'London',
    flag: '🇬🇧',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: '#e94560',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200',
  },
  paris: {
    name: 'Paris',
    flag: '🇫🇷',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #4a1942 100%)',
    accent: '#f4a261',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
  },
};
