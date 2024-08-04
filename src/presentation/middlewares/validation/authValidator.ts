import { check } from 'express-validator';

import validatorMiddleware from './validationMiddleware';

export const signupValidator = [
  check('username').notEmpty().withMessage('is_required').isString().withMessage('invalid_input'),
  check('password').notEmpty().withMessage('is_required').isLength({ min: 8 }).withMessage('invalid_password'),

  check('role').isEmpty().withMessage('not_allowed'),
  validatorMiddleware,
];

export const loginValidator = [
  check('username').notEmpty().withMessage('is_required').isEmail().withMessage('invalid_email'),
  check('password').notEmpty().withMessage('is_required').isLength({ min: 8 }).withMessage('Invalid_Password'),

  validatorMiddleware,
];
