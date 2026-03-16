export const northeastCorridorRoute = {
  route: {
    name: "Northeast Heritage Trail",
    description:
      "A compact but culture-packed journey from Boston to Philadelphia through seaside New England towns and the bright lights of New York City. Your pup will sniff salty harbors, strut through historic cobblestone streets, and experience the best of the East Coast's dog-friendly charm. Short drives, big memories.",
    totalMiles: 600,
    estimatedDays: 6,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Charles River Esplanade walks in Boston",
      "Coastal Maine vibes in Kennebunkport",
      "Newport mansion grounds strolls with your regal pup",
      "Central Park adventures in New York City",
      "Historic Philadelphia walks past Independence Hall",
    ],
  },
  waypoints: [
    {
      name: "Boston - Start",
      lat: 42.3601,
      lng: -71.0589,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Start in Beantown where your pup can walk the Freedom Trail (leashed, of course — we are talking about a revolutionary dog here).",
      nearbyDogStops: [
        "Charles River Esplanade",
        "Boston Common",
        "Peters Park Dog Run",
        "Castle Island Trail",
      ],
      overnightCityId: "boston",
    },
    {
      name: "Portsmouth, NH",
      lat: 43.0718,
      lng: -70.7626,
      dayNumber: 2,
      driveTimeFromPrev: 60,
      description:
        "A picture-perfect harbor town where dog-friendly patios line the brick streets and the sea air makes every tail wag a little harder.",
      nearbyDogStops: [
        "Leary Field Dog Park",
        "Prescott Park waterfront walk",
        "Four Tree Island",
        "South Mill Pond trail",
      ],
      overnightCityId: "portsmouth-nh",
    },
    {
      name: "Kennebunkport",
      lat: 43.3615,
      lng: -70.4769,
      dayNumber: 2,
      driveTimeFromPrev: 35,
      description:
        "Classic coastal Maine charm where lobster shacks welcome dogs, rocky beaches beg for exploration, and the salty breeze will have your pup's ears flapping with joy.",
      nearbyDogStops: [
        "Goose Rocks Beach (seasonal off-leash)",
        "Bridle Path trail",
        "Dock Square walking area",
      ],
      overnightCityId: "kennebunkport",
    },
    {
      name: "Newport, RI",
      lat: 41.4901,
      lng: -71.3128,
      dayNumber: 3,
      driveTimeFromPrev: 155,
      description:
        "Gilded Age mansions and ocean cliff walks — your pup gets to live like aristocracy for a day. The Cliff Walk is dog-friendly and the views are absolutely unreal.",
      nearbyDogStops: [
        "Cliff Walk (leashed)",
        "Brenton Point State Park",
        "Sachuest Point trails",
        "Thames Street walking area",
      ],
      overnightCityId: "newport-ri",
    },
    {
      name: "New York City",
      lat: 40.7128,
      lng: -74.006,
      dayNumber: 4,
      driveTimeFromPrev: 180,
      description:
        "The Big Apple is shockingly dog-friendly. Central Park, riverside trails, and dog runs on every other block — your pup will feel like a true New Yorker in minutes.",
      nearbyDogStops: [
        "Central Park off-leash hours",
        "Hudson River Park Dog Run",
        "Washington Square Park Dog Run",
        "Prospect Park Dog Beach (Brooklyn)",
      ],
      overnightCityId: "new-york-city",
    },
    {
      name: "Asbury Park",
      lat: 40.2201,
      lng: -74.0121,
      dayNumber: 5,
      driveTimeFromPrev: 70,
      description:
        "A Jersey Shore gem with a vibrant boardwalk scene and dog-friendly beach vibes. Your pup will love strutting down the boardwalk like a true shore dog.",
      nearbyDogStops: [
        "Asbury Park Dog Beach",
        "Bradley Beach Dog Area",
        "Sunset Park",
        "Ocean Grove boardwalk walk",
      ],
      overnightCityId: "asbury-park",
    },
    {
      name: "Philadelphia - Finish",
      lat: 39.9526,
      lng: -75.1652,
      dayNumber: 6,
      driveTimeFromPrev: 90,
      description:
        "End your Northeast heritage journey in the City of Brotherly Love. Celebrate with a run through Wissahickon Valley — 50 miles of trails that will make your pup's day (and yours).",
      nearbyDogStops: [
        "Schuylkill River Trail",
        "Wissahickon Valley Park",
        "Seger Dog Park",
        "Penn Treaty Park",
      ],
      overnightCityId: "philadelphia",
    },
  ],
  cityNames: ["Boston", "New York City", "Philadelphia"],
};
