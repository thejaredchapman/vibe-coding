import { Router } from 'express';
import { listRoutes, getRouteDetail } from '../controllers/routes';

const router = Router();

router.get('/', listRoutes);
router.get('/:id', getRouteDetail);

export default router;
