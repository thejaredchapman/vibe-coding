export const sunBeltCrossingRoute = {
  route: {
    name: "Sun Belt Crossing",
    description:
      "Chase the sunshine from San Diego to Jacksonville across America's warm southern tier. Desert landscapes give way to Texas ranches, Gulf Coast beaches, and Florida palm trees. Your pup will love the year-round outdoor living and beach access along the way.",
    totalMiles: 2500,
    estimatedDays: 12,
    difficulty: "challenging" as const,
    imageUrl: "",
    highlights: [
      "San Diego's legendary Dog Beach in OB",
      "Desert hiking trails around Tucson and Saguaro NP",
      "San Antonio River Walk dog-friendly strolls",
      "Gulf Coast beaches in Pensacola",
      "Jacksonville's miles of dog-friendly Atlantic shoreline",
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
        "America's Finest City is also one of its most dog-friendly. Start with an off-leash romp at Dog Beach before heading east into the desert.",
      nearbyDogStops: [
        "Dog Beach OB",
        "Fiesta Island Off-Leash",
        "Balboa Park trails",
        "Coronado Dog Beach",
      ],
      overnightCityId: "san-diego",
    },
    {
      name: "Tucson",
      lat: 32.2226,
      lng: -110.9747,
      dayNumber: 2,
      driveTimeFromPrev: 360,
      description:
        "The Old Pueblo sits in a valley ringed by mountains and saguaro cactus forests. Early morning hikes with your dog are magical here.",
      nearbyDogStops: [
        "Brandi Fenton Memorial Dog Park",
        "Rillito River Park Trail",
        "Tucson Mountain Park trails",
        "Reid Park",
      ],
      overnightCityId: "tucson",
    },
    {
      name: "Las Cruces",
      lat: 32.3199,
      lng: -106.7637,
      dayNumber: 3,
      driveTimeFromPrev: 270,
      description:
        "Nestled between the Organ Mountains and Rio Grande, Las Cruces offers dramatic desert scenery and warm New Mexican hospitality for you and your pup.",
      nearbyDogStops: [
        "Apodaca Dog Park",
        "Dripping Springs Natural Area trails",
        "La Llorona Park trail",
        "Burn Lake Dog Park",
      ],
      overnightCityId: "las-cruces",
    },
    {
      name: "El Paso",
      lat: 31.7619,
      lng: -106.485,
      dayNumber: 4,
      driveTimeFromPrev: 50,
      description:
        "A border city with Southwestern charm, mountain hiking, and surprising green spaces where your dog can enjoy desert views.",
      nearbyDogStops: [
        "Franklin Mountains State Park trails",
        "Eastwood Dog Park",
        "Tom Lea Park",
        "Rio Bosque Wetlands Park",
      ],
      overnightCityId: "el-paso",
    },
    {
      name: "San Antonio",
      lat: 29.4241,
      lng: -98.4936,
      dayNumber: 5,
      driveTimeFromPrev: 540,
      description:
        "The River Walk is partially dog-friendly and the surrounding Hill Country offers incredible dog-friendly wineries and natural swimming holes.",
      nearbyDogStops: [
        "Phil Hardberger Park Dog Park",
        "McAllister Park Dog Area",
        "San Antonio River Walk (select areas)",
        "Brackenridge Park",
      ],
      overnightCityId: "san-antonio",
    },
    {
      name: "Houston",
      lat: 29.7604,
      lng: -95.3698,
      dayNumber: 6,
      driveTimeFromPrev: 195,
      description:
        "Space City has a booming dog culture with massive off-leash parks, dog-friendly breweries, and restaurants that treat your pooch like a VIP.",
      nearbyDogStops: [
        "Johnny Steele Dog Park",
        "Danny Jackson Dog Park",
        "Buffalo Bayou Park trails",
        "Hermann Park",
      ],
      overnightCityId: "houston",
    },
    {
      name: "New Orleans",
      lat: 29.9511,
      lng: -90.0715,
      dayNumber: 8,
      driveTimeFromPrev: 350,
      description:
        "The Big Easy loves dogs! From the French Quarter to City Park, your pup will enjoy the laid-back vibes, outdoor jazz, and Cajun-country charm.",
      nearbyDogStops: [
        "City Bark at City Park",
        "Crescent Park on the Mississippi",
        "Audubon Park trails",
        "French Quarter walks (many pet-friendly bars)",
      ],
      overnightCityId: "new-orleans",
    },
    {
      name: "Mobile",
      lat: 30.6954,
      lng: -88.0399,
      dayNumber: 9,
      driveTimeFromPrev: 150,
      description:
        "Alabama's port city has beautiful oak-lined streets, a vibrant downtown, and proximity to Gulf beaches where dogs can play in the waves.",
      nearbyDogStops: [
        "Medal of Honor Dog Park",
        "Langan Park trails",
        "Battleship Memorial Park grounds",
        "Downtown Mobile historic walk",
      ],
      overnightCityId: "mobile",
    },
    {
      name: "Pensacola",
      lat: 30.4213,
      lng: -87.2169,
      dayNumber: 10,
      driveTimeFromPrev: 60,
      description:
        "White sand beaches and emerald water — Pensacola Beach has dog-friendly areas where your pup can dig, swim, and roll to their heart's content.",
      nearbyDogStops: [
        "Bayview Dog Park",
        "Pensacola Beach Dog-Friendly Area",
        "Bay Bluffs Park",
        "Palafox Street walk",
      ],
      overnightCityId: "pensacola",
    },
    {
      name: "Tallahassee",
      lat: 30.4383,
      lng: -84.2807,
      dayNumber: 11,
      driveTimeFromPrev: 200,
      description:
        "Florida's capital is surrounded by forests, springs, and trails. The canopy roads are gorgeous for scenic drives with the windows down.",
      nearbyDogStops: [
        "Tom Brown Dog Park",
        "St. Marks Trail",
        "Alfred B. Maclay Gardens (leashed)",
        "Lake Ella walking path",
      ],
    },
    {
      name: "Jacksonville - Finish",
      lat: 30.3322,
      lng: -81.6557,
      dayNumber: 12,
      driveTimeFromPrev: 165,
      description:
        "End your Sun Belt crossing on the Atlantic coast! Jacksonville has the most dog-friendly beaches in Florida and a massive urban park system.",
      nearbyDogStops: [
        "Dog Wood Park (42-acre off-leash)",
        "Atlantic Beach dog-friendly area",
        "Hanna Park trails",
        "Riverside Arts Market",
      ],
    },
  ],
  cityNames: ["San Diego", "Jacksonville"],
};
