import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { createTrip, listTrips, getTrip, updateTrip, deleteTrip, createTripFromPlan } from '../controllers/trips';
import { addExpense, listExpenses, updateExpense, deleteExpense } from '../controllers/expenses';
import { addPackingItem, listPackingItems, togglePacked, deletePackingItem, addDefaultItems } from '../controllers/packing';
import { addItineraryDay, listItineraryDays, updateItineraryDay, deleteItineraryDay } from '../controllers/itineraries';

const router = Router();

// All routes require auth
router.use(authMiddleware);

// Trip CRUD
router.post('/', createTrip);
router.get('/', listTrips);
router.post('/from-plan', createTripFromPlan);
router.get('/:tripId', getTrip);
router.patch('/:tripId', updateTrip);
router.delete('/:tripId', deleteTrip);

// Expenses
router.post('/:tripId/expenses', addExpense);
router.get('/:tripId/expenses', listExpenses);
router.patch('/:tripId/expenses/:expenseId', updateExpense);
router.delete('/:tripId/expenses/:expenseId', deleteExpense);

// Packing
router.post('/:tripId/packing', addPackingItem);
router.get('/:tripId/packing', listPackingItems);
router.patch('/:tripId/packing/:itemId/toggle', togglePacked);
router.delete('/:tripId/packing/:itemId', deletePackingItem);
router.post('/:tripId/packing/defaults', addDefaultItems);

// Itinerary
router.post('/:tripId/itinerary', addItineraryDay);
router.get('/:tripId/itinerary', listItineraryDays);
router.patch('/:tripId/itinerary/:dayId', updateItineraryDay);
router.delete('/:tripId/itinerary/:dayId', deleteItineraryDay);

export default router;
