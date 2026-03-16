export const pacificNorthwestRoute = {
  route: {
    name: "Pacific Northwest Trail",
    description:
      "Explore the lush, misty Pacific Northwest from Portland through Seattle and down to Bend. Towering evergreens, craft coffee, and more off-leash dog parks per capita than anywhere else. Your pup will never want to leave.",
    totalMiles: 500,
    estimatedDays: 5,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Portland's legendary off-leash culture",
      "Seattle's waterfront dog parks",
      "Columbia River Gorge waterfalls",
      "Mount Hood scenic views",
      "Bend's trail-loaded high desert",
    ],
  },
  waypoints: [
    {
      name: "Portland - Start",
      lat: 45.5152,
      lng: -122.6784,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Begin in the dog-friendliest big city in the nation. Seriously, they put dogs on the beer labels here.",
      nearbyDogStops: [
        "Forest Park (Leif Erikson Trail)",
        "Sellwood Riverfront Dog Park",
        "Hawthorne District dog-friendly shops",
        "Lucky Labrador Brewing patio",
      ],
      overnightCityId: "portland",
    },
    {
      name: "Multnomah Falls",
      lat: 45.5762,
      lng: -122.1158,
      dayNumber: 1,
      driveTimeFromPrev: 35,
      description:
        "Oregon's tallest waterfall is a must-see. Dogs are welcome on the trail to the bridge viewpoint.",
      nearbyDogStops: [
        "Multnomah Falls Trail (leashed)",
        "Wahkeena Falls Trail",
        "Columbia Gorge scenic pullouts",
      ],
    },
    {
      name: "Hood River",
      lat: 45.7054,
      lng: -121.5215,
      dayNumber: 2,
      driveTimeFromPrev: 40,
      description:
        "A windsurfing and fruit-orchard town with mountain views and pet-friendly tasting rooms.",
      nearbyDogStops: [
        "Waterfront Park",
        "Hood River Dog Park",
        "Panorama Point viewpoint",
      ],
    },
    {
      name: "Olympia",
      lat: 47.0379,
      lng: -122.9007,
      dayNumber: 2,
      driveTimeFromPrev: 175,
      description:
        "Washington's capital is a hidden gem with waterfront trails and a chill, dog-loving vibe.",
      nearbyDogStops: [
        "Priest Point Park trails",
        "Capitol Lake loop",
        "Woodruff Park Dog Park",
      ],
    },
    {
      name: "Tacoma",
      lat: 47.2529,
      lng: -122.4443,
      dayNumber: 3,
      driveTimeFromPrev: 35,
      description:
        "Gritty charm, glass art, and waterfront walks with Mount Rainier looming in the background.",
      nearbyDogStops: [
        "Point Defiance Park trails",
        "Wapato Park",
        "Rogers Off-Leash Dog Park",
      ],
    },
    {
      name: "Seattle",
      lat: 47.6062,
      lng: -122.3321,
      dayNumber: 3,
      driveTimeFromPrev: 40,
      description:
        "The Emerald City rolls out the green carpet for dogs. Pike Place, ferry rides, and waterfront parks await.",
      nearbyDogStops: [
        "Magnuson Park Off-Leash Area",
        "Golden Gardens beach",
        "Westcrest Park Dog Area",
        "Pike Place Market (leashed, outdoor areas)",
      ],
      overnightCityId: "seattle",
    },
    {
      name: "Snoqualmie Falls",
      lat: 47.5417,
      lng: -121.8384,
      dayNumber: 4,
      driveTimeFromPrev: 40,
      description:
        "A thundering 268-foot waterfall that's even more dramatic than the TV show filmed here.",
      nearbyDogStops: [
        "Snoqualmie Falls overlook (leashed)",
        "Rattlesnake Ledge Trail (leashed)",
        "Snoqualmie Point Park",
      ],
    },
    {
      name: "Ellensburg",
      lat: 46.9965,
      lng: -120.5478,
      dayNumber: 4,
      driveTimeFromPrev: 70,
      description:
        "A small college town in the heart of Washington with wide-open spaces for a good run.",
      nearbyDogStops: [
        "Irene Rinehart Riverfront Park",
        "Rotary Dog Park",
        "John Wayne Pioneer Trail",
      ],
    },
    {
      name: "Sunriver",
      lat: 43.8843,
      lng: -121.4382,
      dayNumber: 5,
      driveTimeFromPrev: 260,
      description:
        "A resort community just south of Bend with miles of paved paths through ponderosa pines.",
      nearbyDogStops: [
        "Sunriver bike path network",
        "Benham Falls Trail",
        "Deschutes River access points",
      ],
    },
    {
      name: "Bend - Finish",
      lat: 44.0582,
      lng: -121.3153,
      dayNumber: 5,
      driveTimeFromPrev: 20,
      description:
        "End your PNW loop in Oregon's outdoor playground, where dogs outnumber traffic lights.",
      nearbyDogStops: [
        "Phil's Trail Complex",
        "Riverbend Park off-leash area",
        "Deschutes River Trail",
        "Good Life Brewing patio",
      ],
      overnightCityId: "bend",
    },
  ],
  cityNames: ["Portland", "Seattle", "Bend"],
};
