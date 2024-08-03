import { Router } from 'express';
import { container } from 'tsyringe';

// BookRepository
import { BookController } from '../controllers/BookController';
import { allowedTo, authenticateUser } from '../middlewares/authMiddleware';

const router = Router();
const bookController = container.resolve(BookController);

router.post('/', authenticateUser, allowedTo('admin'), bookController.createBook);
router.get('/top', authenticateUser, bookController.getTopFiveBooks);

export default router;
