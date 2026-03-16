import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cityRoutes from './routes/cities';
import routeRoutes from './routes/routes';
import searchRoutes from './routes/search';
import authRoutes from './routes/auth';
import tripRoutes from './routes/trip';
import tripsRoutes from './routes/trips';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ─── Health Check ─────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'pack-and-paws-api' });
});

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api/cities', cityRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/trips', tripsRoutes);

// ─── Error Handler ────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║   🐾  Pack & Paws API                    ║
  ║   Running on http://localhost:${PORT}        ║
  ║   Ready for tail-wagging adventures!      ║
  ╚═══════════════════════════════════════════╝
  `);
});

export default app;
