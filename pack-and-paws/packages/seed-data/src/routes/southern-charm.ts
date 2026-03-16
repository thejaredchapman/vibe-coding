export const southernCharmRoute = {
  route: {
    name: "Southern Charm Route",
    description:
      "Soak in the best of the South from Nashville's honky-tonks through Asheville's mountain breweries, Charleston's pastel-colored streets, and Savannah's shady squares. Sweet tea, live music, and more belly rubs than your dog can handle.",
    totalMiles: 740,
    estimatedDays: 7,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Nashville's dog-friendly honky-tonk patios",
      "Great Smoky Mountains scenic drive",
      "Asheville's brewery dog culture",
      "Charleston's waterfront and carriage rides",
      "Savannah's 22 dog-welcoming squares",
    ],
  },
  waypoints: [
    {
      name: "Nashville - Start",
      lat: 36.1627,
      lng: -86.7816,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Music City loves dogs almost as much as it loves country music. Start with a stroll down Broadway (the patio version).",
      nearbyDogStops: [
        "Shelby Bottoms Greenway",
        "Centennial Dog Park",
        "The Nations dog-friendly restaurants",
        "Percy Warner Park trails",
      ],
      overnightCityId: "nashville",
    },
    {
      name: "Chattanooga",
      lat: 35.0456,
      lng: -85.3097,
      dayNumber: 1,
      driveTimeFromPrev: 130,
      description:
        "The Scenic City on the Tennessee River with a stunning pedestrian bridge and mountain overlooks.",
      nearbyDogStops: [
        "Coolidge Park and Walnut Street Bridge",
        "Renaissance Dog Park",
        "Riverwalk trail",
      ],
    },
    {
      name: "Pigeon Forge / Gatlinburg",
      lat: 35.7884,
      lng: -83.5543,
      dayNumber: 2,
      driveTimeFromPrev: 140,
      description:
        "Gateway to the Smokies with that classic tourist-town energy. Plenty of pet-friendly cabins nearby.",
      nearbyDogStops: [
        "Gatlinburg Trail (dogs allowed in Smokies!)",
        "Riverwalk Trail in Pigeon Forge",
        "LeConte Creek Greenway",
      ],
    },
    {
      name: "Cherokee, NC",
      lat: 35.4743,
      lng: -83.3148,
      dayNumber: 2,
      driveTimeFromPrev: 55,
      description:
        "Cross through the Great Smokies on the scenic Newfound Gap Road, ending in this gateway town.",
      nearbyDogStops: [
        "Oconaluftee River Trail (leashed)",
        "Mingo Falls trailhead area",
        "Blue Ridge Parkway overlooks",
      ],
    },
    {
      name: "Asheville",
      lat: 35.5951,
      lng: -82.5515,
      dayNumber: 3,
      driveTimeFromPrev: 65,
      description:
        "Mountain vibes, craft beer, and a dog-friendly downtown that's second to none.",
      nearbyDogStops: [
        "French Broad River Park",
        "Carrier Park off-leash area",
        "South Slope brewery crawl (dogs welcome!)",
        "Biltmore Estate grounds (leashed)",
      ],
      overnightCityId: "asheville",
    },
    {
      name: "Chimney Rock",
      lat: 35.4396,
      lng: -82.2466,
      dayNumber: 4,
      driveTimeFromPrev: 30,
      description:
        "A dramatic rock formation with elevator access and trails. Leashed dogs welcome for the views.",
      nearbyDogStops: [
        "Chimney Rock State Park (leashed dogs on most trails)",
        "Lake Lure beach area",
        "Riverwalk at Lake Lure",
      ],
    },
    {
      name: "Greenville, SC",
      lat: 34.8526,
      lng: -82.3940,
      dayNumber: 4,
      driveTimeFromPrev: 65,
      description:
        "A revitalized gem with Falls Park, the Swamp Rabbit Trail, and an incredibly dog-friendly downtown.",
      nearbyDogStops: [
        "Falls Park on the Reedy",
        "Cleveland Park Dog Park",
        "Swamp Rabbit Trail",
        "Main Street dog-friendly patios",
      ],
    },
    {
      name: "Columbia, SC",
      lat: 34.0007,
      lng: -81.0348,
      dayNumber: 5,
      driveTimeFromPrev: 105,
      description:
        "A laid-back capital city with surprising riverside charm and great dog parks.",
      nearbyDogStops: [
        "Riverfront Park and trails",
        "Sesquicentennial State Park",
        "Granby Dog Park",
      ],
    },
    {
      name: "Charleston",
      lat: 32.7765,
      lng: -79.9311,
      dayNumber: 5,
      driveTimeFromPrev: 115,
      description:
        "Charleston's cobblestone streets, rainbow row, and harbor walks are pure magic for dogs and their people.",
      nearbyDogStops: [
        "Waterfront Park and Pineapple Fountain",
        "James Island County Park Dog Park",
        "Sullivan's Island beach (seasonal off-leash)",
        "King Street dog-friendly dining",
      ],
      overnightCityId: "charleston",
    },
    {
      name: "Beaufort, SC",
      lat: 32.4316,
      lng: -80.6698,
      dayNumber: 6,
      driveTimeFromPrev: 70,
      description:
        "Spanish moss and sea breezes in this impossibly charming Lowcountry town.",
      nearbyDogStops: [
        "Henry C. Chambers Waterfront Park",
        "Hunting Island State Park (leashed)",
        "Bay Street stroll",
      ],
    },
    {
      name: "Savannah - Finish",
      lat: 32.0809,
      lng: -81.0912,
      dayNumber: 7,
      driveTimeFromPrev: 60,
      description:
        "The crown jewel of Southern dog cities. With 22 shady squares and countless dog-friendly patios, this is where tails come to wag.",
      nearbyDogStops: [
        "Forsyth Park and fountain",
        "River Street waterfront",
        "Savannah Dog Park at Lake Mayer",
        "Tybee Island beach (dawn/dusk dog hours)",
      ],
      overnightCityId: "savannah",
    },
  ],
  cityNames: ["Nashville", "Asheville", "Charleston", "Savannah"],
};
