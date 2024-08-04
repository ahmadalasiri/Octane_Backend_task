import { check } from 'express-validator';

import validatorMiddleware from './validationMiddleware';

export const createReadingIntervalValidator = [
  check('startDate').notEmpty().withMessage('is_required').isDate().withMessage('invalid_input'),
  check('endDate').notEmpty().withMessage('is_required').isDate().withMessage('invalid_input'),
  check('bookId').notEmpty().withMessage('is_required').isNumeric().withMessage('invalid_input'),
  check('userId').notEmpty().withMessage('is_required').isNumeric().withMessage('invalid_input'),
  validatorMiddleware,
];
