import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { searchSchema, nearbySchema } from '../lib/validation';

export async function search(req: Request, res: Response) {
  const { q, city, type, page, pageSize } = searchSchema.parse(req.query);

  // Build search term for ILIKE (simple approach; pg_tsvector can be added later)
  const searchTerm = `%${q}%`;
  const skip = (page - 1) * pageSize;

  const results: any[] = [];

  if (type === 'all' || type === 'hotel') {
    const hotels = await prisma.hotel.findMany({
      where: {
        AND: [
          { name: { contains: q, mode: 'insensitive' } },
          ...(city ? [{ city: { name: { contains: city, mode: 'insensitive' as const } } }] : []),
        ],
      },
      take: pageSize,
      skip: type === 'hotel' ? skip : 0,
      include: { city: { select: { name: true, state: true } } },
    });
    results.push(...hotels.map((h) => ({ ...h, _type: 'hotel' })));
  }

  if (type === 'all' || type === 'restaurant') {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        AND: [
          { name: { contains: q, mode: 'insensitive' } },
          ...(city ? [{ city: { name: { contains: city, mode: 'insensitive' as const } } }] : []),
        ],
      },
      take: pageSize,
      skip: type === 'restaurant' ? skip : 0,
      include: { city: { select: { name: true, state: true } } },
    });
    results.push(...restaurants.map((r) => ({ ...r, _type: 'restaurant' })));
  }

  if (type === 'all' || type === 'cafe') {
    const cafes = await prisma.cafe.findMany({
      where: {
        AND: [
          { name: { contains: q, mode: 'insensitive' } },
          ...(city ? [{ city: { name: { contains: city, mode: 'insensitive' as const } } }] : []),
        ],
      },
      take: pageSize,
      skip: type === 'cafe' ? skip : 0,
      include: { city: { select: { name: true, state: true } } },
    });
    results.push(...cafes.map((c) => ({ ...c, _type: 'cafe' })));
  }

  if (type === 'all' || type === 'dog_park') {
    const dogParks = await prisma.dogPark.findMany({
      where: {
        AND: [
          { name: { contains: q, mode: 'insensitive' } },
          ...(city ? [{ city: { name: { contains: city, mode: 'insensitive' as const } } }] : []),
        ],
      },
      take: pageSize,
      skip: type === 'dog_park' ? skip : 0,
      include: { city: { select: { name: true, state: true } } },
    });
    results.push(...dogParks.map((d) => ({ ...d, _type: 'dog_park' })));
  }

  if (type === 'all' || type === 'national_park') {
    const parks = await prisma.nationalPark.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
      take: pageSize,
      skip: type === 'national_park' ? skip : 0,
    });
    results.push(...parks.map((p) => ({ ...p, _type: 'national_park' })));
  }

  res.json({
    data: results.slice(0, pageSize),
    meta: { total: results.length, page, pageSize },
  });
}

export async function nearby(req: Request, res: Response) {
  const { lat, lng, radius, type, page, pageSize } = nearbySchema.parse(req.query);

  // Haversine formula in SQL via Prisma raw query
  const radiusKm = radius * 1.60934;
  const skip = (page - 1) * pageSize;

  const results: any[] = [];

  if (type === 'all' || type === 'hotel') {
    const hotels = await prisma.$queryRaw<any[]>`
      SELECT *,
        (6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) AS distance_km
      FROM hotels
      WHERE (6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) < ${radiusKm}
      ORDER BY distance_km
      LIMIT ${pageSize} OFFSET ${skip}
    `;
    results.push(...hotels.map((h) => ({ ...h, _type: 'hotel', distanceMiles: Number((h.distance_km / 1.60934).toFixed(1)) })));
  }

  if (type === 'all' || type === 'restaurant') {
    const restaurants = await prisma.$queryRaw<any[]>`
      SELECT *,
        (6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) AS distance_km
      FROM restaurants
      WHERE (6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) < ${radiusKm}
      ORDER BY distance_km
      LIMIT ${pageSize} OFFSET ${skip}
    `;
    results.push(...restaurants.map((r) => ({ ...r, _type: 'restaurant', distanceMiles: Number((r.distance_km / 1.60934).toFixed(1)) })));
  }

  if (type === 'all' || type === 'dog_park') {
    const dogParks = await prisma.$queryRaw<any[]>`
      SELECT *,
        (6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) AS distance_km
      FROM dog_parks
      WHERE (6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) < ${radiusKm}
      ORDER BY distance_km
      LIMIT ${pageSize} OFFSET ${skip}
    `;
    results.push(...dogParks.map((d) => ({ ...d, _type: 'dog_park', distanceMiles: Number((d.distance_km / 1.60934).toFixed(1)) })));
  }

  // Sort all results by distance
  results.sort((a, b) => a.distanceMiles - b.distanceMiles);

  res.json({
    data: results.slice(0, pageSize),
    meta: { total: results.length, page, pageSize },
  });
}
