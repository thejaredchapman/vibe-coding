export const rockyMountainRoute = {
  route: {
    name: "Rocky Mountain Loop",
    description:
      "An epic loop through the American West from Denver through Boulder, Moab, Sedona, and Santa Fe. Red rocks, alpine meadows, desert canyons, and starry skies await your adventure pup on this unforgettable circuit.",
    totalMiles: 1350,
    estimatedDays: 10,
    difficulty: "challenging" as const,
    imageUrl: "",
    highlights: [
      "Off-leash hiking in Boulder's Open Space",
      "Moab's red rock trails at sunrise",
      "Sedona's dog-friendly vortex hikes",
      "Santa Fe's artistic, pup-loving plaza",
      "Rocky Mountain National Park scenic drives",
    ],
  },
  waypoints: [
    {
      name: "Denver - Start",
      lat: 39.7392,
      lng: -104.9903,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Launch your mountain adventure in the Mile High City, where outdoor dogs are royalty.",
      nearbyDogStops: [
        "Cherry Creek Dog Park",
        "Washington Park loop",
        "Confluence Park trails",
        "RiNo dog-friendly patios",
      ],
      overnightCityId: "denver",
    },
    {
      name: "Boulder",
      lat: 40.0150,
      lng: -105.2705,
      dayNumber: 1,
      driveTimeFromPrev: 40,
      description:
        "The outdoor mecca where dogs hike the Flatirons, splash in Boulder Creek, and dine on Pearl Street.",
      nearbyDogStops: [
        "Chautauqua Park trails",
        "Boulder Creek Path",
        "Valmont Dog Park",
        "Pearl Street Mall (leashed)",
      ],
      overnightCityId: "boulder",
    },
    {
      name: "Glenwood Springs",
      lat: 39.5505,
      lng: -107.3248,
      dayNumber: 2,
      driveTimeFromPrev: 155,
      description:
        "A mountain hot springs town along the Colorado River with canyon trails for curious sniffers.",
      nearbyDogStops: [
        "Glenwood Canyon Trail",
        "Two Rivers Park",
        "Hanging Lake trailhead area (dogs in parking area only)",
      ],
    },
    {
      name: "Grand Junction",
      lat: 39.0639,
      lng: -108.5506,
      dayNumber: 3,
      driveTimeFromPrev: 85,
      description:
        "Wine country meets canyon country. Your pup will love the riverside trails and desert air.",
      nearbyDogStops: [
        "Connected Lakes State Park",
        "Colorado Riverfront Trail",
        "Canyon View Dog Park",
      ],
    },
    {
      name: "Moab",
      lat: 38.5733,
      lng: -109.5498,
      dayNumber: 4,
      driveTimeFromPrev: 110,
      description:
        "Red rock paradise where adventure dogs live their best lives among arches and canyons.",
      nearbyDogStops: [
        "Corona Arch Trail (dog-friendly)",
        "Mill Creek Parkway",
        "Ken's Lake area trails",
        "Dog-friendly Moab Brewery patio",
      ],
      overnightCityId: "moab",
    },
    {
      name: "Monument Valley",
      lat: 36.9983,
      lng: -110.0985,
      dayNumber: 5,
      driveTimeFromPrev: 150,
      description:
        "Iconic buttes and mesas straight out of a Western film. Dogs welcome at the visitor center overlook.",
      nearbyDogStops: [
        "Monument Valley overlook (leashed)",
        "Goulding's Lodge trails",
        "Valley Drive scenic stops",
      ],
    },
    {
      name: "Flagstaff",
      lat: 35.1983,
      lng: -111.6513,
      dayNumber: 6,
      driveTimeFromPrev: 175,
      description:
        "A cool mountain college town surrounded by ponderosa pines and dog-loving locals.",
      nearbyDogStops: [
        "Buffalo Park trails",
        "Thorpe Park Dog Park",
        "Flagstaff Urban Trail System",
      ],
    },
    {
      name: "Sedona",
      lat: 34.8697,
      lng: -111.7610,
      dayNumber: 7,
      driveTimeFromPrev: 35,
      description:
        "Mystical red rocks and vortex energy that makes every tail wag a little harder.",
      nearbyDogStops: [
        "Bell Rock Pathway (leashed)",
        "Margs Draw Trail",
        "Tlaquepaque Arts Village (dog-friendly)",
        "Red Rock State Park trails",
      ],
      overnightCityId: "sedona",
    },
    {
      name: "Petrified Forest / Holbrook",
      lat: 34.8953,
      lng: -109.8029,
      dayNumber: 8,
      driveTimeFromPrev: 130,
      description:
        "Ancient fossilized forests and painted desert landscapes. Leashed dogs welcome on paved trails.",
      nearbyDogStops: [
        "Petrified Forest NP paved overlooks (leashed)",
        "Painted Desert viewpoints",
        "Holbrook town walk",
      ],
    },
    {
      name: "Albuquerque",
      lat: 35.0844,
      lng: -106.6504,
      dayNumber: 9,
      driveTimeFromPrev: 185,
      description:
        "Green chile aroma, hot air balloons, and the Rio Grande bosque trails for your desert dog.",
      nearbyDogStops: [
        "Rio Grande Bosque Trail",
        "Elena Gallegos Open Space",
        "North Domingo Baca Dog Park",
      ],
    },
    {
      name: "Santa Fe",
      lat: 35.6870,
      lng: -105.9378,
      dayNumber: 9,
      driveTimeFromPrev: 65,
      description:
        "Art, adobe, and altitude. Santa Fe's Plaza is one of the most dog-welcoming town squares in America.",
      nearbyDogStops: [
        "Santa Fe Plaza (leashed)",
        "Dale Ball Trail System",
        "Frank S. Ortiz Dog Park",
        "Canyon Road galleries (many pet-friendly)",
      ],
      overnightCityId: "santa-fe",
    },
    {
      name: "Denver - Finish",
      lat: 39.7392,
      lng: -104.9903,
      dayNumber: 10,
      driveTimeFromPrev: 365,
      description:
        "Complete the loop back in Denver. Celebrate with a dog-friendly brewery crawl in the Highlands.",
      nearbyDogStops: [
        "Sloan's Lake Park",
        "Denver Beer Co. patio",
        "Berkeley Dog Park",
      ],
      overnightCityId: "denver",
    },
  ],
  cityNames: ["Denver", "Boulder", "Moab", "Sedona", "Santa Fe"],
};
