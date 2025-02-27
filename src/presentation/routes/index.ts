// src/presentation/routes/index.ts
import { Router } from 'express';

import readingIntervalRoutes from './ReadingIntervalRoute';
import authRoutes from './authRoute';
import bookRoutes from './bookRoute';
import healthzRoute from './healthzRoute';
import userRoutes from './userRoute';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/intervals', readingIntervalRoutes);
router.use('/', healthzRoute);

export default router;
