import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createItinerarySchema, updateItinerarySchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

async function verifyTripAccess(tripId: string, userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { householdId: true } });
  if (!user?.householdId) throw new AppError(400, 'NO_HOUSEHOLD', 'User does not belong to a household');
  const trip = await prisma.trip.findFirst({ where: { id: tripId, householdId: user.householdId } });
  if (!trip) throw new AppError(404, 'TRIP_NOT_FOUND', 'Trip not found');
  return trip;
}

export async function addItineraryDay(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);
    const data = createItinerarySchema.parse(req.body);

    const itinerary = await prisma.itinerary.create({
      data: { ...data, tripId: req.params.tripId },
      include: { city: { select: { id: true, name: true, state: true } } },
    });

    res.status(201).json({ data: itinerary });
  } catch (err) { next(err); }
}

export async function listItineraryDays(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const itineraries = await prisma.itinerary.findMany({
      where: { tripId: req.params.tripId },
      include: {
        city: { select: { id: true, name: true, state: true, heroImage: true, dogFriendlinessScore: true } },
        hotel: { select: { id: true, name: true, petFee: true } },
      },
      orderBy: { dayNumber: 'asc' },
    });

    res.json({ data: itineraries });
  } catch (err) { next(err); }
}

export async function updateItineraryDay(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);
    const data = updateItinerarySchema.parse(req.body);

    const itinerary = await prisma.itinerary.findFirst({ where: { id: req.params.dayId, tripId: req.params.tripId } });
    if (!itinerary) throw new AppError(404, 'ITINERARY_NOT_FOUND', 'Itinerary day not found');

    const updated = await prisma.itinerary.update({
      where: { id: req.params.dayId },
      data,
      include: { city: { select: { id: true, name: true, state: true } } },
    });

    res.json({ data: updated });
  } catch (err) { next(err); }
}

export async function deleteItineraryDay(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const itinerary = await prisma.itinerary.findFirst({ where: { id: req.params.dayId, tripId: req.params.tripId } });
    if (!itinerary) throw new AppError(404, 'ITINERARY_NOT_FOUND', 'Itinerary day not found');

    await prisma.itinerary.delete({ where: { id: req.params.dayId } });
    res.json({ message: 'Itinerary day deleted' });
  } catch (err) { next(err); }
}
