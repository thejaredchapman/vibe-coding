export const newEnglandCoastRoute = {
  route: {
    name: "New England Coastal",
    description:
      "Chase lighthouses, lobster rolls, and ocean breezes from Bar Harbor down through Portland and into Boston. Your pup will adore the rocky coastline, harborside walks, and the crisp salt air that makes every sniff an adventure.",
    totalMiles: 280,
    estimatedDays: 5,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Acadia National Park carriage roads",
      "Bar Harbor's dog-welcoming village green",
      "Portland's Old Port dog-friendly patios",
      "Kennebunkport beach walks",
      "Boston Common and the Freedom Trail",
    ],
  },
  waypoints: [
    {
      name: "Bar Harbor - Start",
      lat: 44.3876,
      lng: -68.2039,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Gateway to Acadia and one of the most dog-friendly national park towns in America. Lobster and leash walks await.",
      nearbyDogStops: [
        "Acadia NP carriage roads (leashed)",
        "Bar Island Trail (tidal crossing!)",
        "Village Green",
        "Shore Path coastal walk",
      ],
      overnightCityId: "bar-harbor",
    },
    {
      name: "Acadia National Park - Jordan Pond",
      lat: 44.3214,
      lng: -68.2529,
      dayNumber: 1,
      driveTimeFromPrev: 15,
      description:
        "Crystal-clear pond surrounded by mountains. Dogs love the carriage road loop here.",
      nearbyDogStops: [
        "Jordan Pond Path (leashed)",
        "Bubble Rock carriage road",
        "Eagle Lake carriage road loop",
      ],
    },
    {
      name: "Camden",
      lat: 44.2098,
      lng: -69.0648,
      dayNumber: 2,
      driveTimeFromPrev: 70,
      description:
        "Where the mountains meet the sea. A picturesque harbor town with hiking right from downtown.",
      nearbyDogStops: [
        "Camden Hills State Park (leashed)",
        "Harbor Park waterfront",
        "Merryspring Nature Center trails",
      ],
    },
    {
      name: "Rockland",
      lat: 44.1037,
      lng: -69.1089,
      dayNumber: 2,
      driveTimeFromPrev: 15,
      description:
        "An artsy harbor town with a famous breakwater walk that leads to a lighthouse. Pups love the breeze.",
      nearbyDogStops: [
        "Rockland Breakwater Lighthouse walk",
        "Harbor Park",
        "Lindsey Cat House (for the irony)",
      ],
    },
    {
      name: "Bath",
      lat: 43.9106,
      lng: -69.8206,
      dayNumber: 3,
      driveTimeFromPrev: 55,
      description:
        "The City of Ships, with a charming downtown and waterfront trails along the Kennebec River.",
      nearbyDogStops: [
        "Waterfront Park",
        "Bath Dog Park",
        "Whiskeag Trail",
      ],
    },
    {
      name: "Freeport",
      lat: 43.8573,
      lng: -70.1031,
      dayNumber: 3,
      driveTimeFromPrev: 25,
      description:
        "Home of L.L.Bean (open 24/7 and dog-friendly inside!). Shop for matching human-dog gear.",
      nearbyDogStops: [
        "L.L.Bean Flagship (dogs welcome inside!)",
        "Winslow Memorial Park",
        "Wolfe's Neck Woods State Park trails",
      ],
    },
    {
      name: "Portland, ME",
      lat: 43.6591,
      lng: -70.2568,
      dayNumber: 3,
      driveTimeFromPrev: 20,
      description:
        "New England's coolest small city. The Old Port is packed with dog-friendly restaurant patios and craft breweries.",
      nearbyDogStops: [
        "Eastern Promenade trail and beach",
        "Bug Light Park",
        "Old Port district (leashed)",
        "Allagash Brewing patio",
      ],
    },
    {
      name: "Kennebunkport",
      lat: 43.3615,
      lng: -70.4767,
      dayNumber: 4,
      driveTimeFromPrev: 30,
      description:
        "Quintessential New England charm with a coastal walk past the Bush compound and dog-friendly inns.",
      nearbyDogStops: [
        "Goose Rocks Beach (seasonal dog access)",
        "Parsons Way Shore Walk",
        "Dock Square shops (pet-friendly)",
      ],
    },
    {
      name: "Portsmouth, NH",
      lat: 43.0718,
      lng: -70.7626,
      dayNumber: 4,
      driveTimeFromPrev: 40,
      description:
        "A lively seaport town straddling the Maine-New Hampshire border with excellent dog-friendly dining.",
      nearbyDogStops: [
        "Prescott Park waterfront",
        "Four Tree Island",
        "South Mill Pond Dog Park",
      ],
    },
    {
      name: "Salem, MA",
      lat: 42.5195,
      lng: -70.8967,
      dayNumber: 5,
      driveTimeFromPrev: 55,
      description:
        "Witch City vibes and a waterfront perfect for a spooky-season stroll with your familiar (er, dog).",
      nearbyDogStops: [
        "Salem Willows Park",
        "Derby Wharf waterfront",
        "Winter Island Park",
      ],
    },
    {
      name: "Boston - Finish",
      lat: 42.3601,
      lng: -71.0589,
      dayNumber: 5,
      driveTimeFromPrev: 30,
      description:
        "End your New England journey in Beantown. Walk the Freedom Trail, play on the Common, and toast to adventure.",
      nearbyDogStops: [
        "Boston Common (leashed)",
        "Charles River Esplanade",
        "Castle Island loop",
        "South End dog-friendly brunch spots",
      ],
    },
  ],
  cityNames: ["Bar Harbor"],
};
