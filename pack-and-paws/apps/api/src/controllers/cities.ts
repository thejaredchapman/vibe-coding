import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { hotelFilterSchema, restaurantFilterSchema, dogParkFilterSchema, paginationSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

export async function listCities(req: Request, res: Response) {
  const { page, pageSize } = paginationSchema.parse(req.query);
  const region = req.query.region as string | undefined;

  const where = region ? { region } : {};

  const [cities, total] = await Promise.all([
    prisma.city.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { dogFriendlinessScore: 'desc' },
      include: {
        _count: {
          select: {
            hotels: true,
            restaurants: true,
            cafes: true,
            dogParks: true,
            nationalParks: true,
          },
        },
      },
    }),
    prisma.city.count({ where }),
  ]);

  const data = cities.map((c) => ({
    id: c.id,
    name: c.name,
    state: c.state,
    region: c.region,
    lat: c.lat,
    lng: c.lng,
    dogFriendlinessScore: c.dogFriendlinessScore,
    description: c.description,
    heroImage: c.heroImage,
    climate: c.climate,
    population: c.population,
    hotelCount: c._count.hotels,
    parkCount: c._count.nationalParks,
    restaurantCount: c._count.restaurants,
    cafeCount: c._count.cafes,
    dogParkCount: c._count.dogParks,
  }));

  res.json({ data, meta: { total, page, pageSize } });
}

export async function getCityDetail(req: Request, res: Response) {
  const city = await prisma.city.findUnique({
    where: { id: req.params.id },
    include: {
      _count: {
        select: {
          hotels: true,
          restaurants: true,
          cafes: true,
          dogParks: true,
          nationalParks: true,
        },
      },
    },
  });

  if (!city) throw new AppError(404, 'NOT_FOUND', 'City not found');

  res.json({
    data: {
      ...city,
      hotelCount: city._count.hotels,
      parkCount: city._count.nationalParks,
      restaurantCount: city._count.restaurants,
      cafeCount: city._count.cafes,
      dogParkCount: city._count.dogParks,
    },
  });
}

export async function getCityHotels(req: Request, res: Response) {
  const { page, pageSize, maxWeight, priceRange, minRating } = hotelFilterSchema.parse(req.query);
  const cityId = req.params.id;

  const where: any = { cityId };
  if (maxWeight) {
    where.OR = [{ maxDogWeight: 0 }, { maxDogWeight: { gte: maxWeight } }];
  }
  if (priceRange) where.priceRange = priceRange;
  if (minRating) where.rating = { gte: minRating };

  const [hotels, total] = await Promise.all([
    prisma.hotel.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { rating: 'desc' },
    }),
    prisma.hotel.count({ where }),
  ]);

  res.json({ data: hotels, meta: { total, page, pageSize } });
}

export async function getCityParks(req: Request, res: Response) {
  const { page, pageSize } = paginationSchema.parse(req.query);
  const cityId = req.params.id;

  const [parks, total] = await Promise.all([
    prisma.cityNationalPark.findMany({
      where: { cityId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { nationalPark: true },
    }),
    prisma.cityNationalPark.count({ where: { cityId } }),
  ]);

  res.json({
    data: parks.map((p) => p.nationalPark),
    meta: { total, page, pageSize },
  });
}

export async function getCityRestaurants(req: Request, res: Response) {
  const { page, pageSize, dogMenu, cuisine, priceRange } = restaurantFilterSchema.parse(req.query);
  const cityId = req.params.id;

  const where: any = { cityId };
  if (dogMenu !== undefined) where.hasDogMenu = dogMenu;
  if (cuisine) where.cuisine = { contains: cuisine, mode: 'insensitive' };
  if (priceRange) where.priceRange = priceRange;

  const [restaurants, total] = await Promise.all([
    prisma.restaurant.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { rating: 'desc' },
    }),
    prisma.restaurant.count({ where }),
  ]);

  res.json({ data: restaurants, meta: { total, page, pageSize } });
}

export async function getCityCafes(req: Request, res: Response) {
  const { page, pageSize } = paginationSchema.parse(req.query);
  const cityId = req.params.id;

  const [cafes, total] = await Promise.all([
    prisma.cafe.findMany({
      where: { cityId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { rating: 'desc' },
    }),
    prisma.cafe.count({ where: { cityId } }),
  ]);

  res.json({ data: cafes, meta: { total, page, pageSize } });
}

export async function getCityDogParks(req: Request, res: Response) {
  const { page, pageSize, offLeash, fenced, minAcres } = dogParkFilterSchema.parse(req.query);
  const cityId = req.params.id;

  const where: any = { cityId };
  if (offLeash !== undefined) where.offLeash = offLeash;
  if (fenced !== undefined) where.fenced = fenced;
  if (minAcres) where.acres = { gte: minAcres };

  const [dogParks, total] = await Promise.all([
    prisma.dogPark.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { rating: 'desc' },
    }),
    prisma.dogPark.count({ where }),
  ]);

  res.json({ data: dogParks, meta: { total, page, pageSize } });
}
