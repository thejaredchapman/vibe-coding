export const deepSouthTrailRoute = {
  route: {
    name: "Deep South Trail",
    description:
      "A slow-paced ramble from Atlanta to New Orleans through the heart of the South. Your hound will love the mountain trails, music cities, small-town charm, and the unmistakable hospitality of a region that believes every dog deserves a porch to nap on. Sweet tea for you, belly rubs for them.",
    totalMiles: 800,
    estimatedDays: 7,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Piedmont Park dog paradise in Atlanta",
      "Gold-rush era trails in the North Georgia mountains",
      "Nashville's dog-friendly honky-tonk patios",
      "Charming small-town squares in Oxford, Mississippi",
      "Beignets and bark parks in New Orleans",
    ],
  },
  waypoints: [
    {
      name: "Atlanta - Start",
      lat: 33.749,
      lng: -84.388,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "The ATL is a dog lover's dream with massive parks, BeltLine trails, and more dog-friendly patios than you can shake a stick at.",
      nearbyDogStops: [
        "Piedmont Park Dog Park",
        "Atlanta BeltLine trail",
        "Freedom Park Dog Park",
        "Fetch Dog Park",
      ],
      overnightCityId: "atlanta",
    },
    {
      name: "Dahlonega",
      lat: 34.5326,
      lng: -83.9849,
      dayNumber: 2,
      driveTimeFromPrev: 75,
      description:
        "A mountain town with gold-rush history and hiking trails that will make your pup feel like a true adventurer. The town square is wonderfully walkable with water bowls outside the shops.",
      nearbyDogStops: [
        "Yahoola Creek Park",
        "Amicalola Falls trails (leashed)",
        "Dahlonega town square",
      ],
      overnightCityId: "dahlonega",
    },
    {
      name: "Knoxville",
      lat: 35.9606,
      lng: -83.9207,
      dayNumber: 3,
      driveTimeFromPrev: 140,
      description:
        "Gateway to the Smokies and a college town where dogs are practically unofficial mascots. Market Square is a must-visit with your furry pal.",
      nearbyDogStops: [
        "PetSafe Dog Park at Tommy Schumpert",
        "Ijams Nature Center trails",
        "Lakeshore Park Greenway",
        "Market Square (leashed)",
      ],
      overnightCityId: "knoxville",
    },
    {
      name: "Nashville",
      lat: 36.1627,
      lng: -86.7816,
      dayNumber: 4,
      driveTimeFromPrev: 180,
      description:
        "Music City treats dogs like rock stars. From dog-friendly honky-tonks to Shelby Bottoms' sprawling trails, your pup will be howling along to the live music in no time.",
      nearbyDogStops: [
        "Shelby Bottoms Greenway",
        "Centennial Dog Park",
        "Warner Dog Park",
        "Percy Warner Park trails",
      ],
      overnightCityId: "nashville",
    },
    {
      name: "Oxford, MS",
      lat: 34.3665,
      lng: -89.5192,
      dayNumber: 5,
      driveTimeFromPrev: 210,
      description:
        "A literary Southern gem with a gorgeous town square where dogs are welcomed at outdoor cafes. William Faulkner's ghost probably had a dog — Rowan Oak's grounds are proof.",
      nearbyDogStops: [
        "Lamar Park",
        "Rowan Oak grounds walk",
        "Oxford Town Square (leashed)",
      ],
      overnightCityId: "oxford-ms",
    },
    {
      name: "Natchez",
      lat: 31.5604,
      lng: -91.4032,
      dayNumber: 6,
      driveTimeFromPrev: 190,
      description:
        "A Mississippi River town frozen in antebellum beauty. The bluff trail along the river is gorgeous at sunset, and your dog will adore the mossy, shaded walking paths.",
      nearbyDogStops: [
        "Natchez Bluff Trail",
        "Duncan Park",
        "Natchez Trace Parkway trails",
        "Under-the-Hill waterfront walk",
      ],
      overnightCityId: "natchez",
    },
    {
      name: "New Orleans - Finish",
      lat: 29.9511,
      lng: -90.0715,
      dayNumber: 7,
      driveTimeFromPrev: 170,
      description:
        "End your Southern adventure in the Big Easy! Your pup earned a stroll through the French Quarter and a nap in Audubon Park after this incredible journey through Dixie.",
      nearbyDogStops: [
        "Crescent Park",
        "City Bark Dog Park",
        "Audubon Park trails",
        "French Quarter walk (leashed)",
      ],
      overnightCityId: "new-orleans",
    },
  ],
  cityNames: ["Atlanta", "Knoxville", "Nashville", "New Orleans"],
};
