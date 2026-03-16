export const blueRidgeRoute = {
  route: {
    name: "Blue Ridge Parkway",
    description:
      "Wind through the misty Appalachian mountains from Asheville down to Savannah via Charleston. Your pup will love sniffing wildflowers at elevation, splashing in mountain creeks, and ending with moss-draped squares in the Deep South.",
    totalMiles: 620,
    estimatedDays: 6,
    difficulty: "moderate" as const,
    imageUrl: "",
    highlights: [
      "Blue Ridge Parkway overlooks with your co-pilot",
      "Off-leash romps at Asheville dog parks",
      "Waterfall hikes in DuPont State Forest",
      "Dog-friendly patios in downtown Charleston",
      "Savannah's legendary dog-welcoming squares",
    ],
  },
  waypoints: [
    {
      name: "Asheville - Start",
      lat: 35.5951,
      lng: -82.5515,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Kick off in the mountain craft-beer capital where dogs are welcome literally everywhere.",
      nearbyDogStops: [
        "French Broad River Dog Park",
        "Carrier Park trails",
        "Dog-friendly breweries on South Slope",
        "Blue Ridge Parkway Folk Art Center trails",
      ],
      overnightCityId: "asheville",
    },
    {
      name: "Mount Pisgah",
      lat: 35.4258,
      lng: -82.7566,
      dayNumber: 1,
      driveTimeFromPrev: 30,
      description:
        "A stunning Parkway stop with panoramic views. Leashed dogs are welcome on overlook trails.",
      nearbyDogStops: [
        "Mount Pisgah Trail (leashed)",
        "Pisgah Inn overlook",
        "Buck Spring Gap Trail",
      ],
    },
    {
      name: "Brevard",
      lat: 35.2334,
      lng: -82.7343,
      dayNumber: 2,
      driveTimeFromPrev: 35,
      description:
        "The Land of Waterfalls where your pup can cool off in swimming holes after a hike.",
      nearbyDogStops: [
        "DuPont State Forest trails",
        "Brevard Dog Park",
        "Looking Glass Falls viewpoint",
      ],
    },
    {
      name: "Hendersonville",
      lat: 35.3187,
      lng: -82.4609,
      dayNumber: 2,
      driveTimeFromPrev: 30,
      description:
        "A charming Main Street town with pet-friendly shops and apple orchards in season.",
      nearbyDogStops: [
        "Jackson Park trails",
        "Oklawaha Greenway",
        "Dog-friendly Main Street shops",
      ],
    },
    {
      name: "Greenville, SC",
      lat: 34.8526,
      lng: -82.3940,
      dayNumber: 3,
      driveTimeFromPrev: 55,
      description:
        "A revitalized downtown with the stunning Falls Park and a walkable, dog-adoring Main Street.",
      nearbyDogStops: [
        "Falls Park on the Reedy",
        "Cleveland Park Dog Park",
        "Swamp Rabbit Trail",
      ],
    },
    {
      name: "Columbia, SC",
      lat: 34.0007,
      lng: -81.0348,
      dayNumber: 3,
      driveTimeFromPrev: 105,
      description:
        "South Carolina's capital is a great midway rest stop with riverfront trails.",
      nearbyDogStops: [
        "Riverfront Park",
        "Sesquicentennial State Park",
        "Three Rivers Greenway",
      ],
    },
    {
      name: "Summerville, SC",
      lat: 33.0185,
      lng: -80.1756,
      dayNumber: 4,
      driveTimeFromPrev: 100,
      description:
        "The Flower Town in the Pines, a perfect stretch-your-legs stop before Charleston.",
      nearbyDogStops: [
        "Azalea Park",
        "Sawmill Branch Trail",
        "Downtown Summerville dog-friendly cafes",
      ],
    },
    {
      name: "Charleston",
      lat: 32.7765,
      lng: -79.9311,
      dayNumber: 4,
      driveTimeFromPrev: 30,
      description:
        "Holy City charm with rainbow-colored houses, harbor breezes, and Southern hospitality for hounds.",
      nearbyDogStops: [
        "Waterfront Park",
        "James Island County Park Dog Park",
        "Folly Beach (leashed)",
        "King Street pet-friendly patios",
      ],
      overnightCityId: "charleston",
    },
    {
      name: "Beaufort, SC",
      lat: 32.4316,
      lng: -80.6698,
      dayNumber: 5,
      driveTimeFromPrev: 70,
      description:
        "A sleepy coastal gem with Spanish-moss-draped streets and waterfront parks.",
      nearbyDogStops: [
        "Henry C. Chambers Waterfront Park",
        "Hunting Island State Park (leashed)",
        "Spanish Moss Trail",
      ],
    },
    {
      name: "Hilton Head Island",
      lat: 32.2163,
      lng: -80.7526,
      dayNumber: 5,
      driveTimeFromPrev: 45,
      description:
        "Upscale island vibes with designated dog beach hours and bike trails galore.",
      nearbyDogStops: [
        "Islanders Beach Park (dog hours)",
        "Sea Pines Forest Preserve",
        "Pinckney Island NWR trails",
      ],
    },
    {
      name: "Savannah - Finish",
      lat: 32.0809,
      lng: -81.0912,
      dayNumber: 6,
      driveTimeFromPrev: 50,
      description:
        "End in the most dog-friendly city in the South. Every square has water bowls, and every restaurant has a patio for pups.",
      nearbyDogStops: [
        "Forsyth Park",
        "Savannah Dog Park at Lake Mayer",
        "River Street waterfront",
        "Wormsloe Historic Site trails",
      ],
      overnightCityId: "savannah",
    },
  ],
  cityNames: ["Asheville", "Charleston", "Savannah"],
};
