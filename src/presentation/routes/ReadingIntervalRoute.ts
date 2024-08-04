import { Router } from 'express';
import { container } from 'tsyringe';

import { ReadingIntervalController } from '../controllers/ReadingIntervalController';
import { authenticateUser } from '../middlewares/authMiddleware';
import { createReadingIntervalValidator } from '../middlewares/validation/readingIntervalValidator';

const router = Router();
const readingIntervalController = container.resolve(ReadingIntervalController);

router.post('/', authenticateUser, createReadingIntervalValidator, readingIntervalController.createReadingInterval);

export default router;
