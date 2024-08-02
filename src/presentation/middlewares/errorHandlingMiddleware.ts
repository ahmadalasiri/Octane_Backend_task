import { NextFunction, Request, Response } from 'express';

import HttpException from '../../domain/exceptions/HttpException';
import logger from '../../helpers/log';
import { ErrorResponse } from '../../types/errorResponse.interface';

export const errorMiddleware = (err: HttpException, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong';
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendForDev(err, res, _req);
  } else {
    if (err.name === 'CastError') {
      err = handelCastErrorDB(err);
    }
    if (err.code === 11000) {
      err = handelDuplicateFieldsDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handelValidationErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignture();
    if (err.name === 'TokenExpiredError') err = handleJwtExpired();

    sendForProd(err, res, _req);
  }
};

const handelCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value} `;
  return new HttpException(400, message);
};

const handelDuplicateFieldsDB = (err: any) => {
  const keyValue = err.keyValue;
  const fieldName = Object.keys(keyValue)[0];
  const value = keyValue[fieldName];

  const message = `Duplicate field value: ${fieldName} => ${value}. Please use another value!`;

  return new HttpException(400, message);
};

const handelValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new HttpException(400, message);
};

const handleJwtInvalidSignture = () => new HttpException(401, 'invalid_signature');

const handleJwtExpired = () => new HttpException(401, 'token_expired');

//################### send error response ###################//

const sendForDev = (err: HttpException, res: Response, _req: Request) => {
  res.status(err.statusCode).json({
    data: null,
    success: false,
    error: true,
    message: err.message,
    status: err.status,
    stack: err.stack,
    err,
  });
};

const sendForProd = (err: HttpException, res: Response, _req: Request) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      data: null,
      success: false,
      error: true,
      message: err.message,
      status: err.status,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  else {
    // 1) Log error
    logger.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({ status: 'error', message: 'something_went_wrong' });
  }
};
