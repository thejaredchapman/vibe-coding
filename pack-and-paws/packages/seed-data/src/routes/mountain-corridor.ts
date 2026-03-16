export const mountainCorridorRoute = {
  route: {
    name: "Mountain Corridor",
    description:
      "Traverse the spine of the Rockies from Denver to Seattle through some of America's most dramatic mountain scenery. Alpine meadows, rushing rivers, and mountain towns that treat dogs like royalty. Your pup's nose will work overtime at these elevations.",
    totalMiles: 1800,
    estimatedDays: 10,
    difficulty: "challenging" as const,
    imageUrl: "",
    highlights: [
      "Rocky Mountain National Park scenic drives",
      "Jackson Hole's famous Town Square dog strolls",
      "Boise's greenbelt riverside trails",
      "Columbia River Gorge waterfall hikes",
      "Mount Rainier views on the final stretch to Seattle",
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
        "The Mile High City is a dog lover's dream with off-leash parks, craft breweries with dog patios, and mountain views from every direction.",
      nearbyDogStops: [
        "Cherry Creek Dog Park",
        "Washington Park",
        "Confluence Park trails",
        "RiNo brewery district patios",
      ],
      overnightCityId: "denver",
    },
    {
      name: "Estes Park",
      lat: 40.3772,
      lng: -105.5217,
      dayNumber: 2,
      driveTimeFromPrev: 75,
      description:
        "Gateway to Rocky Mountain National Park. While dogs can't go on most RMNP trails, the town itself and surrounding national forest are wonderfully dog-friendly.",
      nearbyDogStops: [
        "Estes Park Dog Park",
        "Lake Estes Trail",
        "Roosevelt National Forest trails",
        "Downtown Estes Park shops (many pet-friendly)",
      ],
      overnightCityId: "estes-park",
    },
    {
      name: "Steamboat Springs",
      lat: 40.485,
      lng: -106.8317,
      dayNumber: 3,
      driveTimeFromPrev: 150,
      description:
        "A quintessential Colorado mountain town where dogs outnumber parking meters and the hot springs offer a perfect post-hike soak (for humans — dogs get river access).",
      nearbyDogStops: [
        "Spring Creek Dog Park",
        "Yampa River Core Trail",
        "Fish Creek Falls trail (leashed)",
        "Downtown Steamboat patios",
      ],
      overnightCityId: "steamboat-springs",
    },
    {
      name: "Jackson Hole",
      lat: 43.4799,
      lng: -110.7624,
      dayNumber: 4,
      driveTimeFromPrev: 300,
      description:
        "The Tetons rising above the valley floor will make both you and your dog stop and stare. Jackson's famous town square and surrounding trails are legendary.",
      nearbyDogStops: [
        "Bridger-Teton National Forest trails",
        "Cache Creek Trail",
        "Town Square walk",
        "Phil Baux Park",
      ],
      overnightCityId: "jackson-hole",
    },
    {
      name: "Big Sky",
      lat: 45.2833,
      lng: -111.4014,
      dayNumber: 5,
      driveTimeFromPrev: 240,
      description:
        "Montana's Big Sky country lives up to the name. Mountain meadows, crystal streams, and trails where your dog might spot elk or moose.",
      nearbyDogStops: [
        "Ousel Falls Trail",
        "Gallatin River access points",
        "Town Center trails",
        "Big Sky Community Park",
      ],
      overnightCityId: "big-sky",
    },
    {
      name: "Missoula",
      lat: 46.8721,
      lng: -114.0001,
      dayNumber: 6,
      driveTimeFromPrev: 200,
      description:
        "A laid-back Montana college town where the rivers converge and dogs are welcome everywhere — truly one of America's most dog-friendly cities.",
      nearbyDogStops: [
        "Jacobs Island Dog Park",
        "Rattlesnake Wilderness trailhead",
        "Kim Williams Nature Trail",
        "Caras Park riverfront",
      ],
      overnightCityId: "missoula",
    },
    {
      name: "Coeur d'Alene",
      lat: 47.6777,
      lng: -116.7805,
      dayNumber: 7,
      driveTimeFromPrev: 200,
      description:
        "A stunning lakeside town in the Idaho panhandle. The Centennial Trail along Lake Coeur d'Alene is one of the most scenic dog walks in the Northwest.",
      nearbyDogStops: [
        "Centennial Trail",
        "Tubbs Hill Nature Trails",
        "Cherry Hill Dog Park",
        "City Park & Beach",
      ],
      overnightCityId: "coeur-d-alene",
    },
    {
      name: "Boise",
      lat: 43.615,
      lng: -116.2023,
      dayNumber: 8,
      driveTimeFromPrev: 330,
      description:
        "Idaho's capital has the incredible Boise River Greenbelt — 25 miles of paved trail where dogs happily trot alongside their humans all day long.",
      nearbyDogStops: [
        "Military Reserve Dog Park",
        "Boise River Greenbelt",
        "Camel's Back Park",
        "Table Rock Trail",
      ],
      overnightCityId: "boise",
    },
    {
      name: "Hood River",
      lat: 45.7054,
      lng: -121.5215,
      dayNumber: 9,
      driveTimeFromPrev: 300,
      description:
        "Where the Columbia River Gorge meets fruit orchards and windsurfers. Dogs love the waterfront trails and the breezy riverside parks.",
      nearbyDogStops: [
        "Waterfront Park Trail",
        "Post Canyon Trail System",
        "Hood River Dog Park",
        "Mosier Twin Tunnels Trail",
      ],
      overnightCityId: "hood-river",
    },
    {
      name: "Seattle - Finish",
      lat: 47.6062,
      lng: -122.3321,
      dayNumber: 10,
      driveTimeFromPrev: 190,
      description:
        "Finish your mountain corridor adventure in the Emerald City, where coffee shops have water bowls and every neighborhood park has a dog section.",
      nearbyDogStops: [
        "Magnuson Park Off-Leash Area",
        "Golden Gardens Park",
        "Westcrest Park Dog Run",
        "Green Lake Trail",
      ],
      overnightCityId: "seattle",
    },
  ],
  cityNames: ["Denver", "Seattle"],
};
