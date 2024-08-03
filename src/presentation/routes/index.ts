// src/presentation/routes/index.ts
import { Router } from 'express';

import bookRoutes from './bookRoute';
import healthzRoute from './healthzRoute';

const router = Router();

router.use('/books', bookRoutes);
router.use('/', healthzRoute);

export default router;
