import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createPackingItemSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

async function verifyTripAccess(tripId: string, userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { householdId: true } });
  if (!user?.householdId) throw new AppError(400, 'NO_HOUSEHOLD', 'User does not belong to a household');
  const trip = await prisma.trip.findFirst({ where: { id: tripId, householdId: user.householdId } });
  if (!trip) throw new AppError(404, 'TRIP_NOT_FOUND', 'Trip not found');
  return trip;
}

export async function addPackingItem(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);
    const data = createPackingItemSchema.parse(req.body);

    const item = await prisma.packingList.create({
      data: { ...data, tripId: req.params.tripId },
    });

    res.status(201).json({ data: item });
  } catch (err) { next(err); }
}

export async function listPackingItems(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const items = await prisma.packingList.findMany({
      where: { tripId: req.params.tripId },
      orderBy: [{ category: 'asc' }, { item: 'asc' }],
    });

    res.json({ data: items });
  } catch (err) { next(err); }
}

export async function togglePacked(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const item = await prisma.packingList.findFirst({ where: { id: req.params.itemId, tripId: req.params.tripId } });
    if (!item) throw new AppError(404, 'ITEM_NOT_FOUND', 'Packing item not found');

    const updated = await prisma.packingList.update({
      where: { id: req.params.itemId },
      data: { packed: !item.packed },
    });

    res.json({ data: updated });
  } catch (err) { next(err); }
}

export async function deletePackingItem(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const item = await prisma.packingList.findFirst({ where: { id: req.params.itemId, tripId: req.params.tripId } });
    if (!item) throw new AppError(404, 'ITEM_NOT_FOUND', 'Packing item not found');

    await prisma.packingList.delete({ where: { id: req.params.itemId } });
    res.json({ message: 'Item deleted' });
  } catch (err) { next(err); }
}

const DEFAULT_DOG_ITEMS = [
  { item: 'Dog food (pre-portioned)', category: 'dog_food', forDog: true },
  { item: 'Dog treats', category: 'dog_food', forDog: true },
  { item: 'Collapsible water bowl', category: 'dog_essentials', forDog: true },
  { item: 'Leash & harness', category: 'dog_essentials', forDog: true },
  { item: 'Spare leash', category: 'dog_essentials', forDog: true },
  { item: 'Waste bags', category: 'dog_essentials', forDog: true },
  { item: 'Dog bed or blanket', category: 'dog_essentials', forDog: true },
  { item: 'Chew toys', category: 'dog_essentials', forDog: true },
  { item: 'Vaccination records', category: 'documents', forDog: true },
  { item: 'Health certificate', category: 'documents', forDog: true },
  { item: 'Medications', category: 'dog_essentials', forDog: true },
  { item: 'First-aid kit', category: 'dog_essentials', forDog: true },
  { item: 'Paw balm', category: 'dog_essentials', forDog: true },
  { item: 'ID tags', category: 'dog_essentials', forDog: true },
] as const;

export async function addDefaultItems(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const items = await prisma.packingList.createMany({
      data: DEFAULT_DOG_ITEMS.map((item) => ({
        ...item,
        tripId: req.params.tripId,
        packed: false,
      })),
    });

    const allItems = await prisma.packingList.findMany({
      where: { tripId: req.params.tripId },
      orderBy: [{ category: 'asc' }, { item: 'asc' }],
    });

    res.status(201).json({ data: allItems, added: items.count });
  } catch (err) { next(err); }
}
