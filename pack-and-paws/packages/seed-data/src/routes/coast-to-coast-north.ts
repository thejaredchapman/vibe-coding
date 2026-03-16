export const coastToCoastNorthRoute = {
  route: {
    name: "Northern Cross-Country",
    description:
      "An epic coast-to-coast adventure from the rainy dog parks of Seattle to the historic walks of Boston. Your pup will sniff their way through mountain passes, endless prairies, Great Lakes breezes, and charming New England towns. Pack extra treats — this one's a marathon, not a sprint.",
    totalMiles: 3000,
    estimatedDays: 14,
    difficulty: "challenging" as const,
    imageUrl: "",
    highlights: [
      "Off-leash romps at Seattle's Magnuson Park",
      "Big sky country hikes in Montana with your trail dog",
      "Mount Rushmore photo op with your co-pilot",
      "Chicago's legendary Montrose Dog Beach",
      "Boston Common strolls to celebrate finishing the journey",
    ],
  },
  waypoints: [
    {
      name: "Seattle - Start",
      lat: 47.6062,
      lng: -122.3321,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Kick off this cross-country odyssey in the Emerald City, where every coffee shop has a water bowl and every park has a dog section.",
      nearbyDogStops: [
        "Magnuson Park Off-Leash Area",
        "Golden Gardens Park",
        "Westcrest Park Dog Run",
        "Green Lake Trail",
      ],
      overnightCityId: "seattle",
    },
    {
      name: "Spokane",
      lat: 47.6588,
      lng: -117.426,
      dayNumber: 2,
      driveTimeFromPrev: 280,
      description:
        "Eastern Washington's hidden gem where the Spokane River trail will have your pup pulling you along for miles of waterfront fun.",
      nearbyDogStops: [
        "High Bridge Dog Park",
        "Riverside State Park trails",
        "South Hill Bluff Dog Park",
      ],
      overnightCityId: "spokane",
    },
    {
      name: "Bozeman",
      lat: 45.677,
      lng: -111.0429,
      dayNumber: 3,
      driveTimeFromPrev: 370,
      description:
        "Welcome to big sky country! Bozeman is a mountain town where dogs are basically honorary citizens and every trail is an adventure.",
      nearbyDogStops: [
        "Peets Hill / Burke Park",
        "Gallagator Trail",
        "Snowfill Dog Park",
        "Hyalite Canyon trails",
      ],
      overnightCityId: "bozeman",
    },
    {
      name: "Billings",
      lat: 45.7833,
      lng: -108.5007,
      dayNumber: 4,
      driveTimeFromPrev: 140,
      description:
        "Montana's largest city sits along the Yellowstone River, offering rimrock views and wide-open spaces that make any dog feel like a wild explorer.",
      nearbyDogStops: [
        "Norm Schoenthal Island",
        "Riverfront Park Trail",
        "Rose Park Dog Area",
      ],
      overnightCityId: "billings",
    },
    {
      name: "Rapid City",
      lat: 44.0805,
      lng: -103.231,
      dayNumber: 6,
      driveTimeFromPrev: 350,
      description:
        "Gateway to the Black Hills where your furry co-pilot can pose in front of Mount Rushmore (from the parking lot — dogs dream big).",
      nearbyDogStops: [
        "Braeburn Dog Park",
        "Founder's Park Trail",
        "Canyon Lake Park",
        "Black Hills National Forest trails",
      ],
      overnightCityId: "rapid-city",
    },
    {
      name: "Des Moines",
      lat: 41.5868,
      lng: -93.625,
      dayNumber: 8,
      driveTimeFromPrev: 400,
      description:
        "Iowa's capital surprises with gorgeous trails and a downtown that rolls out the welcome mat for four-legged visitors.",
      nearbyDogStops: [
        "Greenwood/Ashworth Off-Leash Park",
        "Gray's Lake Trail",
        "Raccoon River Park",
      ],
      overnightCityId: "des-moines",
    },
    {
      name: "Chicago",
      lat: 41.8781,
      lng: -87.6298,
      dayNumber: 9,
      driveTimeFromPrev: 330,
      description:
        "The Windy City is a dog paradise — lakefront trails, legendary hot dogs (for humans), and Montrose Beach where pups swim with the skyline behind them.",
      nearbyDogStops: [
        "Montrose Dog Beach",
        "Grant Bark Park",
        "Wiggly Field Dog Park",
        "Lakefront Trail",
      ],
      overnightCityId: "chicago",
    },
    {
      name: "Detroit",
      lat: 42.3314,
      lng: -83.0458,
      dayNumber: 10,
      driveTimeFromPrev: 280,
      description:
        "Motor City has reinvented itself with riverfront parks and revitalized neighborhoods where dogs are welcomed with open arms and plenty of patio seating.",
      nearbyDogStops: [
        "Detroit Riverfront Conservancy Trail",
        "Palmer Park Dog Park",
        "Belle Isle Park",
      ],
      overnightCityId: "detroit",
    },
    {
      name: "Cleveland",
      lat: 41.4993,
      lng: -81.6944,
      dayNumber: 11,
      driveTimeFromPrev: 170,
      description:
        "Cleveland rocks for dogs too! Lake Erie breezes and the Emerald Necklace trail system will have tails wagging nonstop.",
      nearbyDogStops: [
        "Edgewater Park Dog Beach",
        "Lakewood Dog Park",
        "Rocky River Reservation trails",
        "Whiskey Island",
      ],
      overnightCityId: "cleveland",
    },
    {
      name: "Pittsburgh",
      lat: 40.4406,
      lng: -79.9959,
      dayNumber: 12,
      driveTimeFromPrev: 140,
      description:
        "The City of Bridges offers stunning river walks and hillside parks where your pup can enjoy views of the three rivers merging together.",
      nearbyDogStops: [
        "Frick Park Dog Park",
        "Three Rivers Heritage Trail",
        "Riverview Dog Park",
      ],
      overnightCityId: "pittsburgh",
    },
    {
      name: "Philadelphia",
      lat: 39.9526,
      lng: -75.1652,
      dayNumber: 13,
      driveTimeFromPrev: 300,
      description:
        "The City of Brotherly Love extends that love to dogs. Stroll through historic neighborhoods and let your pup channel their inner founding fur-ther.",
      nearbyDogStops: [
        "Schuylkill River Trail",
        "Seger Dog Park",
        "Wissahickon Valley Park",
        "Penn Treaty Park",
      ],
      overnightCityId: "philadelphia",
    },
    {
      name: "Boston - Finish",
      lat: 42.3601,
      lng: -71.0589,
      dayNumber: 14,
      driveTimeFromPrev: 300,
      description:
        "You made it coast to coast! Celebrate with a victory lap around Boston Common, where your pup has officially earned the title of Cross-Country Champion.",
      nearbyDogStops: [
        "Boston Common",
        "Charles River Esplanade",
        "Peters Park Dog Run",
        "Castle Island Trail",
      ],
      overnightCityId: "boston",
    },
  ],
  cityNames: ["Seattle", "Boston"],
};
