import { check } from 'express-validator';

import validatorMiddleware from './validationMiddleware';

export const createBookValidator = [
  check('numOfPages').notEmpty().withMessage('is_required').isNumeric().withMessage('invalid_input'),
  validatorMiddleware,
];
