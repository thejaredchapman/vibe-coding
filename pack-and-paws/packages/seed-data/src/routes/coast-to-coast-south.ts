export const coastToCoastSouthRoute = {
  route: {
    name: "Southern Cross-Country",
    description:
      "A sun-soaked cross-country journey from the Pacific shores of San Diego to the tropical vibes of Miami. Your pup will trot through desert landscapes, Tex-Mex patios, bayou country, and Gulf Coast beaches. Bring sunscreen for you and extra water for your four-legged co-pilot.",
    totalMiles: 2500,
    estimatedDays: 12,
    difficulty: "moderate" as const,
    imageUrl: "",
    highlights: [
      "Off-leash fun at San Diego's Dog Beach",
      "Desert sunrise hikes outside Phoenix with your trail buddy",
      "San Antonio River Walk strolls (leashed but lovely)",
      "Sniffing the spicy air in the French Quarter of New Orleans",
      "Sandy paws on Miami's dog-friendly beaches",
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
        "Start this southern adventure where the sun always shines and Dog Beach OB is basically a canine social club.",
      nearbyDogStops: [
        "Dog Beach OB",
        "Fiesta Island Off-Leash Park",
        "Balboa Park trails",
        "Nate's Point Dog Park",
      ],
      overnightCityId: "san-diego",
    },
    {
      name: "Phoenix",
      lat: 33.4484,
      lng: -112.074,
      dayNumber: 2,
      driveTimeFromPrev: 350,
      description:
        "The Valley of the Sun where early morning desert hikes are a must — your pup will love the cactus-lined trails (just watch those noses near the prickly pear!).",
      nearbyDogStops: [
        "Cosmo Dog Park",
        "Papago Park trails",
        "Hance Dog Park",
        "South Mountain Park (leashed)",
      ],
      overnightCityId: "phoenix",
    },
    {
      name: "El Paso",
      lat: 31.7619,
      lng: -106.485,
      dayNumber: 4,
      driveTimeFromPrev: 280,
      description:
        "A border city with big desert energy. Your pup can stretch their legs at the foot of the Franklin Mountains after a long drive through wide-open desert.",
      nearbyDogStops: [
        "Franklin Mountains State Park trails",
        "Montecillo Dog Park",
        "Eastside Dog Park",
      ],
      overnightCityId: "el-paso",
    },
    {
      name: "San Antonio",
      lat: 29.4241,
      lng: -98.4936,
      dayNumber: 5,
      driveTimeFromPrev: 340,
      description:
        "Deep in the heart of Texas! The River Walk is surprisingly dog-friendly, and your pup will feel like royalty trotting past the Alamo.",
      nearbyDogStops: [
        "McAllister Dog Park",
        "Phil Hardberger Dog Park",
        "River Walk (leashed)",
        "Brackenridge Park trails",
      ],
      overnightCityId: "san-antonio",
    },
    {
      name: "Houston",
      lat: 29.7604,
      lng: -95.3698,
      dayNumber: 7,
      driveTimeFromPrev: 200,
      description:
        "Space City has room for dogs too! Houston's sprawling park system means your pup can run like they are training for a moon mission.",
      nearbyDogStops: [
        "Johnny Steele Dog Park",
        "Danny Jackson Dog Park",
        "Buffalo Bayou Trail",
        "Hermann Park",
      ],
      overnightCityId: "houston",
    },
    {
      name: "New Orleans",
      lat: 29.9511,
      lng: -90.0715,
      dayNumber: 8,
      driveTimeFromPrev: 340,
      description:
        "Laissez les bons temps rouler — with your pup! The Big Easy is wonderfully dog-friendly with beignet-scented patios and jazz-filled parks.",
      nearbyDogStops: [
        "Crescent Park",
        "City Bark Dog Park",
        "Audubon Park trails",
        "French Quarter walking tour (leashed)",
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
        "Alabama's port city on Mobile Bay where the Gulf breeze starts to hit and your pup gets their first whiff of that beach life ahead.",
      nearbyDogStops: [
        "Medal of Honor Dog Park",
        "Langan Park trails",
        "Mobile Bay waterfront walk",
      ],
      overnightCityId: "mobile",
    },
    {
      name: "Tampa",
      lat: 27.9506,
      lng: -82.4572,
      dayNumber: 11,
      driveTimeFromPrev: 420,
      description:
        "Welcome to Florida! Tampa's bay-side parks and dog-friendly breweries make it the perfect pit stop before the final push to Miami.",
      nearbyDogStops: [
        "Davis Islands Dog Beach",
        "Picnic Island Dog Park",
        "Bayshore Boulevard trail",
        "Al Lopez Dog Park",
      ],
      overnightCityId: "tampa",
    },
    {
      name: "Miami - Finish",
      lat: 25.7617,
      lng: -80.1918,
      dayNumber: 12,
      driveTimeFromPrev: 280,
      description:
        "You did it — coast to coast on the southern route! Celebrate with a splash at one of Miami's dog beaches, where the water is warm and the vibes are tropical.",
      nearbyDogStops: [
        "Haulover Beach Dog Park",
        "Hobie Island Beach Park",
        "Kennedy Park Dog Area",
        "Bayfront Park",
      ],
      overnightCityId: "miami",
    },
  ],
  cityNames: ["San Diego", "Miami"],
};
