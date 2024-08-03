import { Router } from 'express';
import { container } from 'tsyringe';

import { UserController } from '../controllers/UserController';
import { allowedTo, authenticateUser } from '../middlewares/authMiddleware';

const router = Router();
const userController = container.resolve(UserController);
// logged in user routes
router.get('/me', authenticateUser, userController.getMe);

// Admin routes
router.post('/', authenticateUser, allowedTo('admin'), userController.createUser);
router.get('/:id', authenticateUser, allowedTo('admin'), userController.getUserById);

export default router;
