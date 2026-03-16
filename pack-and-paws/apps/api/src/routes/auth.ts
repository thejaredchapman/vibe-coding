import { Router } from 'express';
import { register, login, refresh, inviteToHousehold } from '../controllers/auth';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Protected routes
router.post('/household/invite', authMiddleware, inviteToHousehold);

export default router;
