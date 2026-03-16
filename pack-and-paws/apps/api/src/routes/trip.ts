import { Router } from 'express';
import { planTrip, planMultiStopTrip } from '../controllers/trip';

const router = Router();

router.get('/plan', planTrip);
router.get('/plan-multi', planMultiStopTrip);

export default router;
