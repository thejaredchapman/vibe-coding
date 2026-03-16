import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createTripSchema, updateTripSchema, createTripFromPlanSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

async function getUserHouseholdId(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { householdId: true } });
  if (!user?.householdId) throw new AppError(400, 'NO_HOUSEHOLD', 'User does not belong to a household');
  return user.householdId;
}

async function verifyTripAccess(tripId: string, userId: string) {
  const householdId = await getUserHouseholdId(userId);
  const trip = await prisma.trip.findFirst({ where: { id: tripId, householdId } });
  if (!trip) throw new AppError(404, 'TRIP_NOT_FOUND', 'Trip not found');
  return trip;
}

export async function createTrip(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createTripSchema.parse(req.body);
    const householdId = await getUserHouseholdId(req.user!.userId);

    const trip = await prisma.trip.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        householdId,
        members: {
          create: { userId: req.user!.userId, role: 'organizer' },
        },
      },
      include: { members: true },
    });

    res.status(201).json({ data: trip });
  } catch (err) { next(err); }
}

export async function listTrips(req: Request, res: Response, next: NextFunction) {
  try {
    const householdId = await getUserHouseholdId(req.user!.userId);

    const trips = await prisma.trip.findMany({
      where: { householdId },
      include: {
        _count: { select: { itineraries: true, expenses: true, packingList: true } },
        expenses: { select: { amount: true } },
        packingList: { select: { packed: true } },
      },
      orderBy: { startDate: 'desc' },
    });

    const tripsWithSummary = trips.map((trip) => ({
      id: trip.id,
      name: trip.name,
      startDate: trip.startDate,
      endDate: trip.endDate,
      status: trip.status,
      routeId: trip.routeId,
      createdAt: trip.createdAt,
      totalExpenses: trip.expenses.reduce((sum, e) => sum + e.amount, 0),
      itineraryDays: trip._count.itineraries,
      packingTotal: trip._count.packingList,
      packingPacked: trip.packingList.filter((p) => p.packed).length,
    }));

    res.json({ data: tripsWithSummary });
  } catch (err) { next(err); }
}

export async function getTrip(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const trip = await prisma.trip.findUnique({
      where: { id: req.params.tripId },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } } },
        route: true,
      },
    });

    res.json({ data: trip });
  } catch (err) { next(err); }
}

export async function updateTrip(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);
    const data = updateTripSchema.parse(req.body);

    const updateData: any = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);

    const trip = await prisma.trip.update({
      where: { id: req.params.tripId },
      data: updateData,
    });

    res.json({ data: trip });
  } catch (err) { next(err); }
}

export async function deleteTrip(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    await prisma.trip.delete({ where: { id: req.params.tripId } });
    res.json({ message: 'Trip deleted' });
  } catch (err) { next(err); }
}

export async function createTripFromPlan(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createTripFromPlanSchema.parse(req.body);
    const householdId = await getUserHouseholdId(req.user!.userId);

    const trip = await prisma.trip.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        householdId,
        status: 'planning',
        members: {
          create: { userId: req.user!.userId, role: 'organizer' },
        },
        itineraries: {
          create: data.stops.map((stop) => ({
            dayNumber: stop.dayNumber,
            cityId: stop.cityId,
            activities: stop.activities,
            notes: stop.notes,
          })),
        },
      },
      include: { itineraries: true, members: true },
    });

    res.status(201).json({ data: trip });
  } catch (err) { next(err); }
}
