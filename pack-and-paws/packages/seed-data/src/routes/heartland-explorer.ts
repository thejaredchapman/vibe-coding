export const heartlandExplorerRoute = {
  route: {
    name: "Heartland Explorer",
    description:
      "Cruise from Minneapolis to Nashville through America's heartland, where friendly small towns, rolling farmland, and legendary music cities await. Your dog will love the wide-open parks, river trails, and Southern hospitality that greets every wagging tail.",
    totalMiles: 1200,
    estimatedDays: 8,
    difficulty: "moderate" as const,
    imageUrl: "",
    highlights: [
      "Minneapolis Chain of Lakes off-leash beaches",
      "Iowa City's literary dog-friendly cafes",
      "Kansas City BBQ patios welcoming pups",
      "Ozarks hiking with scenic lake views",
      "Nashville's dog-friendly honky-tonks on Broadway",
    ],
  },
  waypoints: [
    {
      name: "Minneapolis - Start",
      lat: 44.9778,
      lng: -93.265,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Start your heartland adventure in the City of Lakes, where dogs swim at off-leash beaches and bike along the chain of lakes trail system.",
      nearbyDogStops: [
        "Lake of the Isles Off-Leash",
        "Minnehaha Falls Dog Park",
        "Chain of Lakes Trail",
        "Boom Island Park",
      ],
      overnightCityId: "minneapolis",
    },
    {
      name: "Rochester, MN",
      lat: 44.0121,
      lng: -92.4802,
      dayNumber: 2,
      driveTimeFromPrev: 85,
      description:
        "Home to the Mayo Clinic but also gorgeous park systems and the Silver Lake trail where your pup can watch geese from a safe distance.",
      nearbyDogStops: [
        "Quarry Hill Nature Center trails",
        "Silver Lake Trail",
        "Cascade Lake Dog Park",
      ],
    },
    {
      name: "Iowa City",
      lat: 41.6611,
      lng: -91.5302,
      dayNumber: 3,
      driveTimeFromPrev: 165,
      description:
        "A quirky college town and UNESCO City of Literature with dog-friendly bookstores, cafes, and beautiful riverfront paths.",
      nearbyDogStops: [
        "Thornberry Off-Leash Dog Park",
        "Iowa River Corridor Trail",
        "City Park trails",
        "Ped Mall (leashed, many dog-friendly shops)",
      ],
      overnightCityId: "iowa-city",
    },
    {
      name: "Kansas City",
      lat: 39.0997,
      lng: -94.5786,
      dayNumber: 4,
      driveTimeFromPrev: 250,
      description:
        "KC's BBQ joints have legendary patios where your dog can drool over brisket. The city's boulevards and parks are perfect for leashed walks.",
      nearbyDogStops: [
        "Swope Park Off-Leash Area",
        "Penn Valley Dog Park",
        "Country Club Plaza (leashed)",
        "Loose Park",
      ],
      overnightCityId: "kansas-city",
    },
    {
      name: "Springfield, MO",
      lat: 37.2089,
      lng: -93.2923,
      dayNumber: 5,
      driveTimeFromPrev: 170,
      description:
        "Gateway to the Ozarks with excellent nature parks and a surprisingly vibrant downtown where dogs are welcome on many patios.",
      nearbyDogStops: [
        "Nathanael Greene Park",
        "Wilson's Creek National Battlefield trails",
        "South Creek Greenway",
      ],
    },
    {
      name: "Branson / Ozarks",
      lat: 36.6437,
      lng: -93.2185,
      dayNumber: 6,
      driveTimeFromPrev: 45,
      description:
        "Table Rock Lake and the surrounding Ozark hills offer stunning hiking and swimming spots where your dog can cool off after trail time.",
      nearbyDogStops: [
        "Table Rock Lakeshore Trail",
        "Lakeside Forest Wilderness Area",
        "Ruth and Paul Henning Conservation Area",
        "Moonshine Beach",
      ],
      overnightCityId: "branson",
    },
    {
      name: "Memphis",
      lat: 35.1495,
      lng: -90.049,
      dayNumber: 7,
      driveTimeFromPrev: 260,
      description:
        "Beale Street blues, riverfront views, and Southern hospitality for your hound. Memphis's parks along the Mississippi are truly special.",
      nearbyDogStops: [
        "Shelby Farms Park Off-Leash",
        "Tom Lee Park riverfront",
        "Overton Park Trails",
        "Big River Trail",
      ],
    },
    {
      name: "Nashville - Finish",
      lat: 36.1627,
      lng: -86.7816,
      dayNumber: 8,
      driveTimeFromPrev: 210,
      description:
        "Music City rolls out the red carpet for dogs! From dog-friendly honky-tonks to gorgeous greenways, Nashville knows how to treat your pup like a star.",
      nearbyDogStops: [
        "Shelby Dog Park at Shelby Bottoms",
        "Centennial Dog Park",
        "Percy Warner Park trails",
        "The Gulch neighborhood patios",
      ],
      overnightCityId: "nashville",
    },
  ],
  cityNames: ["Minneapolis", "Nashville"],
};
