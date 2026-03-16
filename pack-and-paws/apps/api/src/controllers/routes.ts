import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { paginationSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

export async function listRoutes(req: Request, res: Response) {
  const { page, pageSize } = paginationSchema.parse(req.query);

  const [routes, total] = await Promise.all([
    prisma.travelRoute.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { estimatedDays: 'asc' },
      include: {
        _count: { select: { waypoints: true } },
        routeCities: {
          include: { city: { select: { id: true, name: true, state: true } } },
          orderBy: { orderIndex: 'asc' },
        },
      },
    }),
    prisma.travelRoute.count(),
  ]);

  const data = routes.map((r) => ({
    ...r,
    waypointCount: r._count.waypoints,
    cities: r.routeCities.map((rc) => rc.city),
    _count: undefined,
    routeCities: undefined,
  }));

  res.json({ data, meta: { total, page, pageSize } });
}

export async function getRouteDetail(req: Request, res: Response) {
  const route = await prisma.travelRoute.findUnique({
    where: { id: req.params.id },
    include: {
      waypoints: { orderBy: { dayNumber: 'asc' } },
      routeCities: {
        include: { city: true },
        orderBy: { orderIndex: 'asc' },
      },
    },
  });

  if (!route) throw new AppError(404, 'NOT_FOUND', 'Route not found');

  res.json({
    data: {
      ...route,
      cities: route.routeCities.map((rc) => rc.city),
      routeCities: undefined,
    },
  });
}
