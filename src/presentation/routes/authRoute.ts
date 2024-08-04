import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthController } from '../controllers/AuthController';
import { loginValidator, signupValidator } from '../middlewares/validation/authValidator';

const router = Router();
const authController = container.resolve(AuthController);

router.post('/login', loginValidator, authController.login);
router.post('/signup', signupValidator, authController.signup);

export default router;
