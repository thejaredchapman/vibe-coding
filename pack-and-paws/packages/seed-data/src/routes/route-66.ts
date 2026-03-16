export const route66Route = {
  route: {
    name: "Historic Route 66",
    description:
      "Follow the Mother Road from Chicago to LA on this iconic cross-country adventure. Your pup will experience roadside diners, quirky Americana, desert sunsets, and wide-open spaces that make every dog's nose twitch with excitement. Two thousand miles of tail-wagging history.",
    totalMiles: 2400,
    estimatedDays: 12,
    difficulty: "challenging" as const,
    imageUrl: "",
    highlights: [
      "Chicago's Montrose Dog Beach send-off",
      "Meramec Caverns roadside stop in Missouri",
      "Dog-friendly patios on Tulsa's Route 66 strip",
      "Petrified Forest National Park scenic drive",
      "Santa Monica Pier finish line celebration",
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
        "Begin at the official start of Route 66 on Adams Street. Give your pup a lakefront romp before hitting the open road.",
      nearbyDogStops: [
        "Montrose Dog Beach",
        "Grant Bark Park",
        "Lakefront Trail",
        "Wiggly Field Dog Park",
      ],
      overnightCityId: "chicago",
    },
    {
      name: "St. Louis",
      lat: 38.627,
      lng: -90.1994,
      dayNumber: 2,
      driveTimeFromPrev: 300,
      description:
        "The Gateway to the West welcomes dogs with riverfront parks and the iconic Arch views. Plenty of dog-friendly breweries in the Soulard neighborhood.",
      nearbyDogStops: [
        "Gateway Arch National Park grounds",
        "Forest Park Dog Area",
        "Soulard Dog Park",
        "River Des Peres Greenway",
      ],
      overnightCityId: "st-louis",
    },
    {
      name: "Springfield, MO",
      lat: 37.2089,
      lng: -93.2923,
      dayNumber: 3,
      driveTimeFromPrev: 210,
      description:
        "The birthplace of Route 66 has charming roadside attractions and parks where your pup can stretch their legs after the Ozarks drive.",
      nearbyDogStops: [
        "Nathanael Greene Park",
        "Rutledge-Wilson Farm Park",
        "South Creek Greenway Trail",
      ],
    },
    {
      name: "Tulsa",
      lat: 36.1539,
      lng: -95.9928,
      dayNumber: 4,
      driveTimeFromPrev: 180,
      description:
        "Tulsa's revitalized Route 66 corridor has dog-friendly patios, art deco architecture, and the massive Gathering Place park.",
      nearbyDogStops: [
        "Gathering Place Dog Park",
        "River Parks Trail",
        "Joe Station Dog Park",
        "Turkey Mountain Urban Wilderness",
      ],
    },
    {
      name: "Oklahoma City",
      lat: 35.4676,
      lng: -97.5164,
      dayNumber: 5,
      driveTimeFromPrev: 110,
      description:
        "OKC's Bricktown district has dog-friendly patios along the canal, and the city's parks are surprisingly pawsome.",
      nearbyDogStops: [
        "Myriad Botanical Gardens Dog Park",
        "Lake Hefner Trail",
        "Martin Park Nature Center",
        "Bricktown Canal Walk",
      ],
    },
    {
      name: "Amarillo",
      lat: 35.222,
      lng: -101.8313,
      dayNumber: 6,
      driveTimeFromPrev: 260,
      description:
        "Home of Cadillac Ranch and the Big Texan. The wide-open Texas panhandle will have your dog sticking their head out the window for miles.",
      nearbyDogStops: [
        "Palo Duro Canyon State Park (leashed)",
        "Thompson Park",
        "Medical Park Dog Area",
        "Cadillac Ranch photo op",
      ],
    },
    {
      name: "Santa Fe",
      lat: 35.687,
      lng: -105.9378,
      dayNumber: 7,
      driveTimeFromPrev: 280,
      description:
        "The City Different is wonderfully dog-friendly with art galleries, adobe patios, and high desert trails that dogs absolutely love.",
      nearbyDogStops: [
        "Dale Ball Trails",
        "Frank S. Ortiz Dog Park",
        "Santa Fe Rail Trail",
        "Canyon Road galleries (many pet-friendly)",
      ],
      overnightCityId: "santa-fe",
    },
    {
      name: "Albuquerque",
      lat: 35.0844,
      lng: -106.6504,
      dayNumber: 8,
      driveTimeFromPrev: 65,
      description:
        "The Duke City's Old Town is charming and the Sandia foothills offer incredible hiking with your four-legged friend.",
      nearbyDogStops: [
        "North Domingo Baca Dog Park",
        "Sandia Foothills Open Space",
        "Paseo del Bosque Trail",
        "Old Town Plaza",
      ],
      overnightCityId: "albuquerque",
    },
    {
      name: "Petrified Forest / Holbrook",
      lat: 34.9022,
      lng: -110.1583,
      dayNumber: 9,
      driveTimeFromPrev: 260,
      description:
        "Stop at the Petrified Forest National Park for a scenic drive, then explore the quirky Route 66 motels of Holbrook with your pup.",
      nearbyDogStops: [
        "Petrified Forest scenic overlooks",
        "Painted Desert viewpoints",
        "Holbrook town walk",
      ],
    },
    {
      name: "Flagstaff",
      lat: 35.1983,
      lng: -111.6513,
      dayNumber: 10,
      driveTimeFromPrev: 120,
      description:
        "A mountain town along Route 66 with pine forests, craft breweries, and cool temperatures that make dogs extra frisky.",
      nearbyDogStops: [
        "Thorpe Park Dog Park",
        "Buffalo Park trails",
        "Flagstaff Urban Trail System",
        "Wheeler Park",
      ],
      overnightCityId: "flagstaff",
    },
    {
      name: "Kingman / Oatman",
      lat: 35.1894,
      lng: -114.053,
      dayNumber: 11,
      driveTimeFromPrev: 150,
      description:
        "The wild burros of Oatman will give your dog something to bark about on this classic Route 66 detour through the desert.",
      nearbyDogStops: [
        "Hualapai Mountain Park",
        "Kingman Wash trails",
        "Route 66 Museum grounds",
      ],
    },
    {
      name: "Santa Monica - Finish",
      lat: 34.0195,
      lng: -118.4912,
      dayNumber: 12,
      driveTimeFromPrev: 300,
      description:
        "End of the road! Celebrate at the Santa Monica Pier and let your pup play on the dog-friendly stretch of beach. You've driven the Mother Road!",
      nearbyDogStops: [
        "Santa Monica Beach (dog-friendly area)",
        "Palisades Park",
        "Tongva Park",
        "Venice Beach boardwalk",
      ],
    },
  ],
  cityNames: ["Chicago", "Los Angeles"],
};
