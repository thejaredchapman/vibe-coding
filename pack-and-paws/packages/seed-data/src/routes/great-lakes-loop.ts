export const greatLakesLoopRoute = {
  route: {
    name: "Great Lakes Loop",
    description:
      "A scenic loop around the lower Great Lakes, starting and ending in Chicago. Your water-loving pup will be in heaven with lakefront beaches, river trails, and charming Midwest cities that treat dogs like family. This is the perfect road trip for dogs who think every body of water is a swimming pool.",
    totalMiles: 1800,
    estimatedDays: 10,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Montrose Dog Beach on Lake Michigan in Chicago",
      "Dog-friendly breweries throughout Grand Rapids",
      "Detroit's revitalized riverfront walking trails",
      "Lake Erie sunset walks in Cleveland",
      "Indianapolis Canal Walk with your best four-legged friend",
    ],
  },
  waypoints: [
    {
      name: "Chicago - Start",
      lat: 41.8781,
      lng: -87.6298,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Begin the Great Lakes Loop in the Windy City! Hit Montrose Dog Beach for an epic send-off swim before pointing the car north.",
      nearbyDogStops: [
        "Montrose Dog Beach",
        "Wiggly Field Dog Park",
        "Grant Bark Park",
        "Lakefront Trail",
      ],
      overnightCityId: "chicago",
    },
    {
      name: "Milwaukee",
      lat: 43.0389,
      lng: -87.9065,
      dayNumber: 2,
      driveTimeFromPrev: 95,
      description:
        "Brew City is tail-wagging territory with lakefront trails and a downtown where dogs are welcome at practically every patio and beer garden.",
      nearbyDogStops: [
        "Bradford Beach Dog Park",
        "Estabrook Park Dog Area",
        "Milwaukee Lakefront Trail",
        "Bay View Bark Park",
      ],
      overnightCityId: "milwaukee",
    },
    {
      name: "Grand Rapids",
      lat: 42.9634,
      lng: -85.6681,
      dayNumber: 3,
      driveTimeFromPrev: 180,
      description:
        "Michigan's Beer City is also a dog city — the craft brewery scene is incredibly pup-friendly, and the riverside parks are perfect for a good sniff session.",
      nearbyDogStops: [
        "Cascade Township Dog Park",
        "Millennium Park trails",
        "Riverside Dog Park",
      ],
      overnightCityId: "grand-rapids",
    },
    {
      name: "Detroit",
      lat: 42.3314,
      lng: -83.0458,
      dayNumber: 4,
      driveTimeFromPrev: 155,
      description:
        "Motor City has gone to the dogs — in the best way! The revitalized riverfront and neighborhood parks make this a surprisingly awesome dog destination.",
      nearbyDogStops: [
        "Detroit Riverfront Trail",
        "Palmer Park Dog Park",
        "Belle Isle Park",
        "Dequindre Cut Greenway",
      ],
      overnightCityId: "detroit",
    },
    {
      name: "Cleveland",
      lat: 41.4993,
      lng: -81.6944,
      dayNumber: 6,
      driveTimeFromPrev: 170,
      description:
        "Cleveland's lakefront is pure magic for dogs. The Emerald Necklace trail system stretches for miles of sniffing, and Edgewater Dog Beach is a Lake Erie gem.",
      nearbyDogStops: [
        "Edgewater Dog Beach",
        "Lakewood Dog Park",
        "Rocky River Reservation",
        "Whiskey Island",
      ],
      overnightCityId: "cleveland",
    },
    {
      name: "Pittsburgh",
      lat: 40.4406,
      lng: -79.9959,
      dayNumber: 7,
      driveTimeFromPrev: 140,
      description:
        "Three rivers, endless bridges, and hillside dog parks with jaw-dropping views. Pittsburgh is where your pup becomes a yinzer.",
      nearbyDogStops: [
        "Frick Park Dog Park",
        "Three Rivers Heritage Trail",
        "Riverview Dog Park",
        "Schenley Park trails",
      ],
      overnightCityId: "pittsburgh",
    },
    {
      name: "Columbus",
      lat: 39.9612,
      lng: -82.9988,
      dayNumber: 8,
      driveTimeFromPrev: 165,
      description:
        "Ohio's capital is a college-town-meets-big-city vibe with some of the Midwest's best dog parks and a foodie scene that includes doggy patios galore.",
      nearbyDogStops: [
        "Scioto Audubon Dog Park",
        "Wheeler Dog Park",
        "Olentangy Trail",
      ],
      overnightCityId: "columbus",
    },
    {
      name: "Indianapolis",
      lat: 39.7684,
      lng: -86.1581,
      dayNumber: 9,
      driveTimeFromPrev: 175,
      description:
        "The Crossroads of America has a canal walk that dogs go absolutely crazy for. The combo of water, paths, and downtown energy is pure puppy joy.",
      nearbyDogStops: [
        "Broad Ripple Dog Park",
        "Indianapolis Canal Walk",
        "Eagle Creek Park trails",
        "Paul Ruster Park Dog Run",
      ],
      overnightCityId: "indianapolis",
    },
    {
      name: "Chicago - Finish",
      lat: 41.8781,
      lng: -87.6298,
      dayNumber: 10,
      driveTimeFromPrev: 185,
      description:
        "Welcome home, road warriors! Complete the loop back in Chicago and reward your pup with one more glorious session at Montrose Dog Beach.",
      nearbyDogStops: [
        "Montrose Dog Beach",
        "Grant Bark Park",
        "Wiggly Field Dog Park",
        "Lakefront Trail",
      ],
      overnightCityId: "chicago",
    },
  ],
  cityNames: ["Chicago", "Milwaukee", "Detroit", "Cleveland", "Pittsburgh"],
};
