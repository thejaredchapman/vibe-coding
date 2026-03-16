export const southwestDesertRoute = {
  route: {
    name: "Southwest Desert Run",
    description:
      "A sun-baked adventure from the neon glow of Las Vegas to the big-city buzz of Dallas. Your desert dog will explore red-rock trails, quirky art towns, border-town culture, and wide-open Texas landscapes. Early morning hikes are key — this route is hot, but the adventures are hotter.",
    totalMiles: 1400,
    estimatedDays: 8,
    difficulty: "moderate" as const,
    imageUrl: "",
    highlights: [
      "Red Rock Canyon trails just outside Las Vegas",
      "Scottsdale's famous dog-friendly patio dining scene",
      "Quirky art galleries in Marfa with your sidekick",
      "San Antonio River Walk evening strolls",
      "Fort Worth Stockyards visit with your urban cowdog",
    ],
  },
  waypoints: [
    {
      name: "Las Vegas - Start",
      lat: 36.1699,
      lng: -115.1398,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "What happens in Vegas... includes amazing desert hikes with your dog! Skip the Strip and head to Red Rock Canyon where your pup can be the real high roller.",
      nearbyDogStops: [
        "Red Rock Canyon trails",
        "Sunset Park Dog Run",
        "Charlie Frias Dog Park",
        "Floyd Lamb Park at Tule Springs",
      ],
      overnightCityId: "las-vegas",
    },
    {
      name: "Scottsdale",
      lat: 33.4942,
      lng: -111.9261,
      dayNumber: 2,
      driveTimeFromPrev: 300,
      description:
        "Where the desert meets luxury and dogs live their best resort life. Scottsdale's patio culture was practically invented for people with pups.",
      nearbyDogStops: [
        "Chaparral Dog Park",
        "Indian Bend Wash Greenbelt",
        "McDowell Sonoran Preserve trails",
        "Scottsdale Civic Center Park",
      ],
      overnightCityId: "scottsdale",
    },
    {
      name: "Bisbee",
      lat: 31.4485,
      lng: -109.9284,
      dayNumber: 3,
      driveTimeFromPrev: 200,
      description:
        "A quirky old mining town tucked into the Mule Mountains where dogs are welcome in galleries, shops, and practically everywhere. The staircases around town double as a workout for you both.",
      nearbyDogStops: [
        "Bisbee town walking paths",
        "Warren Ballpark area",
        "Lavender Pit viewpoint walk",
      ],
      overnightCityId: "bisbee",
    },
    {
      name: "El Paso",
      lat: 31.7619,
      lng: -106.485,
      dayNumber: 4,
      driveTimeFromPrev: 190,
      description:
        "A border city with mountain views and desert trails at the foot of the Franklins. The sunsets here will make both you and your pup sit and stay in awe.",
      nearbyDogStops: [
        "Franklin Mountains State Park trails",
        "Montecillo Dog Park",
        "Eastside Dog Park",
        "Tom Mays Unit trails",
      ],
      overnightCityId: "el-paso",
    },
    {
      name: "Marfa",
      lat: 30.3074,
      lng: -104.0185,
      dayNumber: 5,
      driveTimeFromPrev: 190,
      description:
        "The most unexpectedly cool town in West Texas. Your pup can pose in front of the Prada Marfa installation and sniff around minimalist art galleries. Peak dog influencer content.",
      nearbyDogStops: [
        "Marfa town walking paths",
        "Vizcaino Park",
        "Prada Marfa roadside stop",
      ],
      overnightCityId: "marfa",
    },
    {
      name: "San Antonio",
      lat: 29.4241,
      lng: -98.4936,
      dayNumber: 6,
      driveTimeFromPrev: 360,
      description:
        "Remember the Alamo — and remember to bring your dog! San Antonio's parks are massive and the River Walk at dusk is the kind of stroll every dog deserves.",
      nearbyDogStops: [
        "Phil Hardberger Dog Park",
        "McAllister Dog Park",
        "River Walk (leashed)",
        "Brackenridge Park trails",
      ],
      overnightCityId: "san-antonio",
    },
    {
      name: "Fort Worth",
      lat: 32.7555,
      lng: -97.3308,
      dayNumber: 7,
      driveTimeFromPrev: 270,
      description:
        "Where the West begins! Your pup can channel their inner cowdog at the Stockyards and then cool off at one of Fort Worth's excellent dog parks.",
      nearbyDogStops: [
        "Fort Woof Dog Park",
        "Trinity Trails",
        "Fort Worth Stockyards walk",
        "Gateway Park",
      ],
      overnightCityId: "fort-worth",
    },
    {
      name: "Dallas - Finish",
      lat: 32.7767,
      lng: -96.797,
      dayNumber: 8,
      driveTimeFromPrev: 40,
      description:
        "Finish your desert run in Big D! White Rock Lake is the perfect victory lap — a massive urban lake with trails that will make your pup forget they just crossed the desert.",
      nearbyDogStops: [
        "White Rock Lake Dog Park",
        "Mutts Canine Cantina",
        "Katy Trail",
        "Klyde Warren Park",
      ],
      overnightCityId: "dallas",
    },
  ],
  cityNames: ["Las Vegas", "Scottsdale", "El Paso", "San Antonio", "Dallas"],
};
