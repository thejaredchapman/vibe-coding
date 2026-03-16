export const mountainWestRoute = {
  route: {
    name: "Mountain West Adventure",
    description:
      "A grand western traverse from Boise's hidden-gem trails through the high Sierra to Lake Tahoe and down into San Francisco. Volcanic landscapes, alpine lakes, towering pines, and the Pacific fog at journey's end. Your adventure dog's dream itinerary.",
    totalMiles: 680,
    estimatedDays: 6,
    difficulty: "challenging" as const,
    imageUrl: "",
    highlights: [
      "Boise Foothills trail system",
      "Shoshone Falls (Niagara of the West)",
      "Reno's Riverwalk with mountain backdrops",
      "Lake Tahoe's crystal-clear waters and beaches",
      "Golden Gate Bridge fog walk into San Francisco",
    ],
  },
  waypoints: [
    {
      name: "Boise - Start",
      lat: 43.6150,
      lng: -116.2023,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Idaho's capital is a sleeper hit for dog lovers. Trails start right from downtown and the Greenbelt goes for miles.",
      nearbyDogStops: [
        "Boise River Greenbelt",
        "Military Reserve Dog Park",
        "Camel's Back Park and trails",
        "Table Rock hiking trail",
      ],
      overnightCityId: "boise",
    },
    {
      name: "Twin Falls",
      lat: 42.5558,
      lng: -114.4701,
      dayNumber: 1,
      driveTimeFromPrev: 130,
      description:
        "Home to Shoshone Falls and the dramatic Snake River Canyon. Your pup will feel the mist on their face.",
      nearbyDogStops: [
        "Shoshone Falls viewpoint (leashed)",
        "Centennial Waterfront Park",
        "Canyon Rim Trail",
      ],
    },
    {
      name: "Jackpot, NV",
      lat: 41.9832,
      lng: -114.6743,
      dayNumber: 2,
      driveTimeFromPrev: 50,
      description:
        "A quirky border-town pit stop where Nevada begins and the high desert opens up.",
      nearbyDogStops: [
        "Salmon Falls Creek Reservoir area",
        "Desert walking trails",
        "Town park",
      ],
    },
    {
      name: "Elko, NV",
      lat: 40.8324,
      lng: -115.7631,
      dayNumber: 2,
      driveTimeFromPrev: 115,
      description:
        "A real cowboy town on the edge of the Ruby Mountains with wide-open spaces and Western charm.",
      nearbyDogStops: [
        "Ruby View Golf Course walking paths",
        "Elko City Park",
        "South Fork Reservoir trails",
      ],
    },
    {
      name: "Winnemucca",
      lat: 40.9730,
      lng: -117.7357,
      dayNumber: 3,
      driveTimeFromPrev: 125,
      description:
        "A high-desert crossroads town along the Humboldt River. Good for stretching legs mid-drive.",
      nearbyDogStops: [
        "Winnemucca City Park",
        "Humboldt River walk",
        "Water Canyon Recreation Area",
      ],
    },
    {
      name: "Reno",
      lat: 39.5296,
      lng: -119.8138,
      dayNumber: 3,
      driveTimeFromPrev: 165,
      description:
        "The Biggest Little City is also surprisingly dog-friendly, with a riverwalk and nearby mountain trails.",
      nearbyDogStops: [
        "Truckee River Walk",
        "Rancho San Rafael Regional Park",
        "Virginia Lake Dog Park",
        "Galena Creek Regional Park",
      ],
    },
    {
      name: "Truckee, CA",
      lat: 39.3280,
      lng: -120.1833,
      dayNumber: 4,
      driveTimeFromPrev: 35,
      description:
        "A historic mountain town that's the gateway to Tahoe's north shore. Dog-friendly restaurants line the main drag.",
      nearbyDogStops: [
        "Donner Memorial State Park (leashed)",
        "Legacy Trail",
        "Downtown Truckee shops (many pet-friendly)",
      ],
    },
    {
      name: "Lake Tahoe - North Shore",
      lat: 39.2460,
      lng: -120.0244,
      dayNumber: 4,
      driveTimeFromPrev: 15,
      description:
        "Crystal-clear alpine waters surrounded by granite peaks. Many beaches allow dogs, especially in the off-season.",
      nearbyDogStops: [
        "Kings Beach (seasonal dog access)",
        "Tahoe Rim Trail sections",
        "Incline Village Dog Park",
        "Sand Harbor scenic area",
      ],
      overnightCityId: "lake-tahoe",
    },
    {
      name: "Lake Tahoe - South Shore",
      lat: 38.9399,
      lng: -119.9772,
      dayNumber: 5,
      driveTimeFromPrev: 45,
      description:
        "The south side of the lake has its own vibe, with Emerald Bay and Kiva Beach for dogs.",
      nearbyDogStops: [
        "Kiva Beach (off-leash dog beach!)",
        "Emerald Bay overlook",
        "Tallac Historic Site trails",
        "Bijou Dog Park",
      ],
      overnightCityId: "lake-tahoe",
    },
    {
      name: "Sacramento",
      lat: 38.5816,
      lng: -121.4944,
      dayNumber: 5,
      driveTimeFromPrev: 105,
      description:
        "California's farm-to-fork capital with a riverwalk and tree-shaded neighborhoods perfect for dog walks.",
      nearbyDogStops: [
        "American River Parkway trail",
        "Bannon Creek Dog Park",
        "Old Sacramento waterfront",
      ],
    },
    {
      name: "Napa / Sonoma",
      lat: 38.2975,
      lng: -122.2869,
      dayNumber: 6,
      driveTimeFromPrev: 60,
      description:
        "Wine country where many tasting rooms welcome dogs on the patio. Treat yourself while your pup people-watches.",
      nearbyDogStops: [
        "Alston Park (off-leash trails)",
        "Sonoma Plaza (leashed)",
        "Dog-friendly winery patios",
      ],
    },
    {
      name: "San Francisco - Finish",
      lat: 37.7749,
      lng: -122.4194,
      dayNumber: 6,
      driveTimeFromPrev: 65,
      description:
        "Cross the Golden Gate and end your mountain-to-coast adventure in the City by the Bay, where fog-loving dogs rule.",
      nearbyDogStops: [
        "Crissy Field off-leash beach",
        "Fort Funston bluff trails",
        "Dolores Park",
        "Lands End coastal trail",
      ],
      overnightCityId: "san-francisco",
    },
  ],
  cityNames: ["Boise", "Lake Tahoe", "San Francisco"],
};
