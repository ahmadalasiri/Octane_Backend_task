import { Router } from 'express';
import { container } from 'tsyringe';

// BookRepository
import { BookController } from '../controllers/BookController';

const router = Router();
const bookController = container.resolve(BookController);

// Define routes
router.post('/', bookController.createBook);
router.get('/top', bookController.getTopFiveBooks);

export default router;
