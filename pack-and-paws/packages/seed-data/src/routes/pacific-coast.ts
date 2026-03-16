export const pacificCoastRoute = {
  route: {
    name: "Pacific Coast Highway",
    description:
      "A stunning coastal drive from San Diego to San Francisco, hugging the Pacific with endless dog-friendly beaches, seaside towns, and dramatic cliffs. The ultimate road trip for pups who love ocean breezes and sandy paws.",
    totalMiles: 570,
    estimatedDays: 5,
    difficulty: "moderate" as const,
    imageUrl: "",
    highlights: [
      "Dog Beach in Del Mar",
      "Pismo Beach off-leash area",
      "Big Sur scenic overlooks",
      "Carmel-by-the-Sea dog-friendly downtown",
      "Half Moon Bay coastal trails",
    ],
  },
  waypoints: [
    {
      name: "San Diego - Start",
      lat: 32.7157,
      lng: -117.1611,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Begin your coastal adventure in America's Finest City, where dogs practically run the beaches.",
      nearbyDogStops: [
        "Dog Beach OB",
        "Fiesta Island Off-Leash",
        "Balboa Park trails",
      ],
      overnightCityId: "san-diego",
    },
    {
      name: "Del Mar",
      lat: 32.9595,
      lng: -117.2653,
      dayNumber: 1,
      driveTimeFromPrev: 25,
      description:
        "A ritzy beach town where your pup can romp off-leash on Dog Beach, one of SoCal's best.",
      nearbyDogStops: [
        "Del Mar Dog Beach",
        "San Dieguito Lagoon Trail",
        "Powerhouse Park",
      ],
    },
    {
      name: "Carlsbad",
      lat: 33.1581,
      lng: -117.3506,
      dayNumber: 1,
      driveTimeFromPrev: 20,
      description:
        "Flower fields, sea breezes, and a charming village where dogs get greeted at every patio.",
      nearbyDogStops: [
        "Carlsbad State Beach",
        "Hosp Grove Trail",
        "Poinsettia Park Dog Run",
      ],
    },
    {
      name: "San Clemente",
      lat: 33.4270,
      lng: -117.6120,
      dayNumber: 2,
      driveTimeFromPrev: 35,
      description:
        "A laid-back surf town with dog-friendly patios and a scenic coastal trail.",
      nearbyDogStops: [
        "San Clemente Dog Park",
        "Trestles Beach trail",
        "Outlets at San Clemente (pet-friendly shops)",
      ],
    },
    {
      name: "Santa Barbara",
      lat: 34.4208,
      lng: -119.6982,
      dayNumber: 2,
      driveTimeFromPrev: 140,
      description:
        "The American Riviera welcomes four-legged visitors with open arms, wine, and waterfront walks.",
      nearbyDogStops: [
        "Hendry's Beach (Arroyo Burro)",
        "Douglas Family Preserve",
        "Stearns Wharf boardwalk",
        "Shoreline Park",
      ],
    },
    {
      name: "Pismo Beach",
      lat: 35.1428,
      lng: -120.6413,
      dayNumber: 3,
      driveTimeFromPrev: 90,
      description:
        "Wide sandy beaches where your dog can run free and dig to their heart's content.",
      nearbyDogStops: [
        "Pismo Beach Off-Leash Area",
        "Dinosaur Caves Park",
        "Oceano Dunes (leashed)",
      ],
    },
    {
      name: "Big Sur",
      lat: 36.2704,
      lng: -121.8081,
      dayNumber: 3,
      driveTimeFromPrev: 120,
      description:
        "Jaw-dropping cliffs and redwood groves. Dogs must stay leashed but the views alone make tails wag.",
      nearbyDogStops: [
        "Pfeiffer Beach (leashed)",
        "Bixby Bridge viewpoint",
        "Andrew Molera State Park trails",
      ],
    },
    {
      name: "Carmel-by-the-Sea",
      lat: 36.5554,
      lng: -121.9233,
      dayNumber: 4,
      driveTimeFromPrev: 35,
      description:
        "Possibly the most dog-friendly town in America. Dogs outnumber parking spots here, and everyone loves it.",
      nearbyDogStops: [
        "Carmel Beach (off-leash!)",
        "Scenic Road walking path",
        "Dog-friendly shops on Ocean Ave",
        "Mission Trail Nature Preserve",
      ],
    },
    {
      name: "Monterey",
      lat: 36.6002,
      lng: -121.8947,
      dayNumber: 4,
      driveTimeFromPrev: 10,
      description:
        "Cannery Row charm and waterfront walks where sea otters might steal the show from your pup.",
      nearbyDogStops: [
        "Monterey Recreation Trail",
        "El Estero Park Dog Area",
        "Fisherman's Wharf (leashed)",
      ],
    },
    {
      name: "Santa Cruz",
      lat: 36.9741,
      lng: -122.0308,
      dayNumber: 4,
      driveTimeFromPrev: 45,
      description:
        "Surf culture, a famous boardwalk (nearby), and plenty of beaches for your salty dog.",
      nearbyDogStops: [
        "Its Beach (off-leash)",
        "Lighthouse Field Dog Park",
        "West Cliff Drive trail",
      ],
    },
    {
      name: "Half Moon Bay",
      lat: 37.4636,
      lng: -122.4286,
      dayNumber: 5,
      driveTimeFromPrev: 60,
      description:
        "Misty coastal bluffs and pumpkin patches in fall. Dogs love the Coastal Trail here.",
      nearbyDogStops: [
        "Half Moon Bay Coastal Trail",
        "Poplar Beach (off-leash section)",
        "Pillar Point Harbor walk",
      ],
    },
    {
      name: "San Francisco - Finish",
      lat: 37.7749,
      lng: -122.4194,
      dayNumber: 5,
      driveTimeFromPrev: 40,
      description:
        "End your epic coastal journey in the City by the Bay, where dogs live their best foggy lives.",
      nearbyDogStops: [
        "Crissy Field off-leash beach",
        "Fort Funston cliffs",
        "Dolores Park",
        "Baker Beach",
      ],
      overnightCityId: "san-francisco",
    },
  ],
  cityNames: ["San Diego", "San Francisco"],
};
