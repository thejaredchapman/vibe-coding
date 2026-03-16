import { PrismaClient } from '@prisma/client';
import { allCityData, allRouteData } from '@pack-and-paws/seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🐾 Starting Pack & Paws seed...\n');

  // ─── Clear existing data ────────────────────────────
  console.log('🧹 Clearing existing data...');
  await prisma.routeCityJunction.deleteMany();
  await prisma.waypoint.deleteMany();
  await prisma.travelRoute.deleteMany();
  await prisma.cityNationalPark.deleteMany();
  await prisma.dogPark.deleteMany();
  await prisma.cafe.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.nationalPark.deleteMany();
  await prisma.city.deleteMany();

  // ─── Seed Cities & Venues ──────────────────────────
  console.log('🏙️  Seeding cities...');
  const cityIdMap = new Map<string, string>(); // city name -> db id

  for (const cityData of allCityData) {
    const city = await prisma.city.create({
      data: {
        name: cityData.city.name,
        state: cityData.city.state,
        region: cityData.city.region,
        lat: cityData.city.lat,
        lng: cityData.city.lng,
        dogFriendlinessScore: cityData.city.dogFriendlinessScore,
        description: cityData.city.description,
        heroImage: cityData.city.heroImage || '',
        climate: cityData.city.climate || '',
        population: cityData.city.population || 0,
      },
    });
    cityIdMap.set(city.name, city.id);
    console.log(`  ✅ ${city.name}, ${city.state}`);

    // Hotels
    if (cityData.hotels?.length) {
      await prisma.hotel.createMany({
        data: cityData.hotels.map((h: any) => ({
          cityId: city.id,
          name: h.name,
          address: h.address,
          lat: h.lat,
          lng: h.lng,
          priceRange: h.priceRange,
          dogPolicy: h.dogPolicy,
          maxDogWeight: h.maxDogWeight ?? 0,
          petFee: h.petFee ?? 0,
          amenities: h.amenities ?? [],
          rating: h.rating,
          imageUrl: h.imageUrl || '',
          website: h.website || '',
          phone: h.phone || '',
        })),
      });
    }

    // National Parks (deduplicated)
    if (cityData.nationalParks?.length) {
      for (const np of cityData.nationalParks) {
        // Upsert by name to avoid duplicates across cities
        let park = await prisma.nationalPark.findFirst({ where: { name: np.name } });
        if (!park) {
          park = await prisma.nationalPark.create({
            data: {
              name: np.name,
              state: np.state,
              lat: np.lat,
              lng: np.lng,
              dogPolicy: np.dogPolicy,
              dogTrails: np.dogTrails ?? [],
              restrictions: np.restrictions ?? [],
              description: np.description,
              imageUrl: np.imageUrl || '',
              website: np.website || '',
            },
          });
        }
        // Link city to park
        await prisma.cityNationalPark.upsert({
          where: {
            cityId_nationalParkId: { cityId: city.id, nationalParkId: park.id },
          },
          create: { cityId: city.id, nationalParkId: park.id },
          update: {},
        });
      }
    }

    // Restaurants
    if (cityData.restaurants?.length) {
      await prisma.restaurant.createMany({
        data: cityData.restaurants.map((r: any) => ({
          cityId: city.id,
          name: r.name,
          address: r.address,
          lat: r.lat,
          lng: r.lng,
          cuisine: r.cuisine,
          priceRange: r.priceRange,
          dogPolicy: r.dogPolicy,
          hasDogMenu: r.hasDogMenu ?? false,
          outdoorSeating: r.outdoorSeating ?? true,
          waterBowls: r.waterBowls ?? true,
          rating: r.rating,
          imageUrl: r.imageUrl || '',
          website: r.website || '',
        })),
      });
    }

    // Cafes
    if (cityData.cafes?.length) {
      await prisma.cafe.createMany({
        data: cityData.cafes.map((c: any) => ({
          cityId: city.id,
          name: c.name,
          address: c.address,
          lat: c.lat,
          lng: c.lng,
          dogPolicy: c.dogPolicy,
          hasOutdoorPatio: c.hasOutdoorPatio ?? true,
          dogTreats: c.dogTreats ?? false,
          rating: c.rating,
          imageUrl: c.imageUrl || '',
          website: c.website || '',
        })),
      });
    }

    // Dog Parks
    if (cityData.dogParks?.length) {
      await prisma.dogPark.createMany({
        data: cityData.dogParks.map((dp: any) => ({
          cityId: city.id,
          name: dp.name,
          address: dp.address,
          lat: dp.lat,
          lng: dp.lng,
          offLeash: dp.offLeash ?? true,
          fenced: dp.fenced ?? true,
          acres: dp.acres ?? 1.0,
          amenities: dp.amenities ?? [],
          rating: dp.rating,
          imageUrl: dp.imageUrl || '',
          description: dp.description || '',
        })),
      });
    }
  }

  // ─── Seed Routes ───────────────────────────────────
  console.log('\n🛣️  Seeding routes...');

  for (const routeData of allRouteData) {
    const route = await prisma.travelRoute.create({
      data: {
        name: routeData.route.name,
        description: routeData.route.description,
        totalMiles: routeData.route.totalMiles,
        estimatedDays: routeData.route.estimatedDays,
        difficulty: routeData.route.difficulty,
        imageUrl: routeData.route.imageUrl || '',
        highlights: routeData.route.highlights ?? [],
      },
    });
    console.log(`  ✅ ${route.name}`);

    // Waypoints
    if (routeData.waypoints?.length) {
      await prisma.waypoint.createMany({
        data: routeData.waypoints.map((wp: any) => ({
          routeId: route.id,
          name: wp.name,
          lat: wp.lat,
          lng: wp.lng,
          dayNumber: wp.dayNumber,
          driveTimeFromPrev: wp.driveTimeFromPrev ?? 0,
          description: wp.description || '',
          nearbyDogStops: wp.nearbyDogStops ?? [],
          overnightCityId: wp.overnightCityId ? cityIdMap.get(
            // Convert slug to city name lookup
            allCityData.find((c) => {
              const slug = c.city.name.toLowerCase().replace(/\s+/g, '-');
              return slug === wp.overnightCityId;
            })?.city.name || ''
          ) : undefined,
        })),
      });
    }

    // Route-City junctions
    if (routeData.cityNames?.length) {
      for (let i = 0; i < routeData.cityNames.length; i++) {
        const cityName = (routeData as any).cityNames[i];
        const cityId = cityIdMap.get(cityName);
        if (cityId) {
          await prisma.routeCityJunction.upsert({
            where: {
              routeId_cityId: { routeId: route.id, cityId },
            },
            create: { routeId: route.id, cityId, orderIndex: i },
            update: { orderIndex: i },
          });
        }
      }
    }
  }

  // ─── Print Summary ─────────────────────────────────
  const counts = await Promise.all([
    prisma.city.count(),
    prisma.hotel.count(),
    prisma.nationalPark.count(),
    prisma.restaurant.count(),
    prisma.cafe.count(),
    prisma.dogPark.count(),
    prisma.travelRoute.count(),
    prisma.waypoint.count(),
  ]);

  console.log(`
╔═══════════════════════════════════════════════╗
║  🐾 Pack & Paws Seed Complete!               ║
╠═══════════════════════════════════════════════╣
║  Cities:          ${String(counts[0]).padStart(4)}                      ║
║  Hotels:          ${String(counts[1]).padStart(4)}                      ║
║  National Parks:  ${String(counts[2]).padStart(4)}                      ║
║  Restaurants:     ${String(counts[3]).padStart(4)}                      ║
║  Cafes:           ${String(counts[4]).padStart(4)}                      ║
║  Dog Parks:       ${String(counts[5]).padStart(4)}                      ║
║  Routes:          ${String(counts[6]).padStart(4)}                      ║
║  Waypoints:       ${String(counts[7]).padStart(4)}                      ║
║  ─────────────────────────                    ║
║  Total Records:   ${String(counts.reduce((a, b) => a + b, 0)).padStart(4)}                      ║
╚═══════════════════════════════════════════════╝
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
