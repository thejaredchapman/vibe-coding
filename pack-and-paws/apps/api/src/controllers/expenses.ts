import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createExpenseSchema, updateExpenseSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

async function verifyTripAccess(tripId: string, userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { householdId: true } });
  if (!user?.householdId) throw new AppError(400, 'NO_HOUSEHOLD', 'User does not belong to a household');
  const trip = await prisma.trip.findFirst({ where: { id: tripId, householdId: user.householdId } });
  if (!trip) throw new AppError(404, 'TRIP_NOT_FOUND', 'Trip not found');
  return trip;
}

export async function addExpense(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);
    const data = createExpenseSchema.parse(req.body);

    const expense = await prisma.expense.create({
      data: { ...data, tripId: req.params.tripId, paidById: req.user!.userId },
    });

    res.status(201).json({ data: expense });
  } catch (err) { next(err); }
}

export async function listExpenses(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const expenses = await prisma.expense.findMany({
      where: { tripId: req.params.tripId },
      include: { paidBy: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ data: expenses });
  } catch (err) { next(err); }
}

export async function updateExpense(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);
    const data = updateExpenseSchema.parse(req.body);

    const expense = await prisma.expense.findFirst({ where: { id: req.params.expenseId, tripId: req.params.tripId } });
    if (!expense) throw new AppError(404, 'EXPENSE_NOT_FOUND', 'Expense not found');

    const updated = await prisma.expense.update({ where: { id: req.params.expenseId }, data });
    res.json({ data: updated });
  } catch (err) { next(err); }
}

export async function deleteExpense(req: Request, res: Response, next: NextFunction) {
  try {
    await verifyTripAccess(req.params.tripId, req.user!.userId);

    const expense = await prisma.expense.findFirst({ where: { id: req.params.expenseId, tripId: req.params.tripId } });
    if (!expense) throw new AppError(404, 'EXPENSE_NOT_FOUND', 'Expense not found');

    await prisma.expense.delete({ where: { id: req.params.expenseId } });
    res.json({ message: 'Expense deleted' });
  } catch (err) { next(err); }
}
