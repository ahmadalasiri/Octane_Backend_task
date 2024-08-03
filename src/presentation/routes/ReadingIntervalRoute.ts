import { Router } from 'express';
import { container } from 'tsyringe';

import { ReadingIntervalController } from '../controllers/ReadingIntervalController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = Router();
const readingIntervalController = container.resolve(ReadingIntervalController);

router.post('/', authenticateUser, readingIntervalController.createReadingInterval);

export default router;
