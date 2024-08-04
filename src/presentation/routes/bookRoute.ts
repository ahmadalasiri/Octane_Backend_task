import { Router } from 'express';
import { container } from 'tsyringe';

import { BookController } from '../controllers/BookController';
import { allowedTo, authenticateUser } from '../middlewares/authMiddleware';
import { createBookValidator } from '../middlewares/validation/bookValidator';

const router = Router();
const bookController = container.resolve(BookController);

router.post('/', authenticateUser, allowedTo('admin'), createBookValidator, bookController.createBook);
router.get('/top', authenticateUser, bookController.getTopFiveBooks);

export default router;
