export const texasHillCountryRoute = {
  route: {
    name: "Texas Hill Country",
    description:
      "A laid-back loop through the heart of Texas, from Austin's taco-fueled dog culture to San Antonio's River Walk and the wildflower-covered hills of Fredericksburg. Big skies, bigger hospitality, and all the barbecue scraps a good dog could dream of.",
    totalMiles: 310,
    estimatedDays: 4,
    difficulty: "easy" as const,
    imageUrl: "",
    highlights: [
      "Austin's off-leash swimming holes",
      "San Antonio River Walk dog-friendly sections",
      "Fredericksburg wineries with dog patios",
      "Enchanted Rock summit hike with your pup",
      "Bluebonnet fields in spring",
    ],
  },
  waypoints: [
    {
      name: "Austin - Start",
      lat: 30.2672,
      lng: -97.7431,
      dayNumber: 1,
      driveTimeFromPrev: 0,
      description:
        "Keep Austin Weird and keep your dog happy. This city lives and breathes dog culture from Barton Springs to South Congress.",
      nearbyDogStops: [
        "Zilker Park off-leash area",
        "Red Bud Isle",
        "Barton Creek Greenbelt",
        "South Congress dog-friendly patios",
      ],
      overnightCityId: "austin",
    },
    {
      name: "Dripping Springs",
      lat: 30.1902,
      lng: -98.0867,
      dayNumber: 1,
      driveTimeFromPrev: 30,
      description:
        "The Gateway to the Hill Country, with lavender farms and distilleries that welcome well-behaved pups.",
      nearbyDogStops: [
        "Hamilton Pool Preserve area",
        "Deep Eddy Vodka tasting room patio",
        "Mercer Street Dog Park",
      ],
    },
    {
      name: "Wimberley",
      lat: 29.9974,
      lng: -98.0987,
      dayNumber: 1,
      driveTimeFromPrev: 20,
      description:
        "A quirky artsy village with a swimming hole that's pure Texas summer magic.",
      nearbyDogStops: [
        "Blue Hole Regional Park (leashed)",
        "Wimberley town square shops",
        "Cypress Creek trails",
      ],
    },
    {
      name: "New Braunfels",
      lat: 29.7030,
      lng: -98.1245,
      dayNumber: 2,
      driveTimeFromPrev: 30,
      description:
        "A German-Texan town with tubing rivers and dog-friendly biergartens. Prost!",
      nearbyDogStops: [
        "Landa Park",
        "Comal River walk",
        "Dog-friendly Gruene Historic District",
      ],
    },
    {
      name: "San Antonio",
      lat: 29.4241,
      lng: -98.4936,
      dayNumber: 2,
      driveTimeFromPrev: 35,
      description:
        "The Alamo City offers a surprising number of dog-friendly spots, from the Pearl District to Mission trails.",
      nearbyDogStops: [
        "Pearl District dog-friendly restaurants",
        "San Antonio Missions trail (leashed)",
        "McAllister Dog Park",
        "Brackenridge Park",
      ],
    },
    {
      name: "Boerne",
      lat: 29.7946,
      lng: -98.7320,
      dayNumber: 3,
      driveTimeFromPrev: 30,
      description:
        "A charming Hill Country town with a walkable Main Street and cave explorations nearby.",
      nearbyDogStops: [
        "Cibolo Nature Center trails",
        "River Road Park",
        "Main Street Boerne dog-friendly shops",
      ],
    },
    {
      name: "Luckenbach",
      lat: 30.1771,
      lng: -98.7242,
      dayNumber: 3,
      driveTimeFromPrev: 45,
      description:
        "Population: 3 (plus your dog). This legendary tiny town has live music, cold beer, and a whole lot of character.",
      nearbyDogStops: [
        "Luckenbach general store yard",
        "Live music dance hall area",
        "Nearby ranch road walks",
      ],
    },
    {
      name: "Fredericksburg",
      lat: 30.2752,
      lng: -98.8720,
      dayNumber: 3,
      driveTimeFromPrev: 15,
      description:
        "German heritage, world-class wineries, and Main Street shops that roll out water bowls for four-legged visitors.",
      nearbyDogStops: [
        "Main Street Fredericksburg (pet-friendly shops)",
        "Dog-friendly winery patios",
        "Lady Bird Johnson Municipal Park",
        "Cross Mountain Trail",
      ],
    },
    {
      name: "Enchanted Rock",
      lat: 30.5060,
      lng: -98.8195,
      dayNumber: 4,
      driveTimeFromPrev: 25,
      description:
        "A massive pink granite dome rising from the Hill Country. Leashed dogs can summit for 360-degree views.",
      nearbyDogStops: [
        "Enchanted Rock Summit Trail (leashed)",
        "Echo Canyon Trail",
        "Loop Trail around the base",
      ],
    },
    {
      name: "Marble Falls",
      lat: 30.5782,
      lng: -98.2750,
      dayNumber: 4,
      driveTimeFromPrev: 45,
      description:
        "A lakeside town with waterfront parks and the best pie in Texas (you might share a bite with your pup).",
      nearbyDogStops: [
        "Lakeside Park",
        "Johnson Park",
        "Backbone Creek trails",
      ],
    },
    {
      name: "Austin - Finish",
      lat: 30.2672,
      lng: -97.7431,
      dayNumber: 4,
      driveTimeFromPrev: 55,
      description:
        "Roll back into Austin with dusty paws and happy hearts. Celebrate at an off-leash brewery patio.",
      nearbyDogStops: [
        "Yard Bar (off-leash bar)",
        "Auditorium Shores",
        "Lady Bird Lake trail",
      ],
      overnightCityId: "austin",
    },
  ],
  cityNames: ["Austin"],
};
