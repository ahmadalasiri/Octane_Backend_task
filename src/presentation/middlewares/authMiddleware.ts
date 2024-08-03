import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { container } from 'tsyringe';

import { UserService } from '../../application/services/UserService';
import env from '../../config/validateEnv';
import HttpException from '../../domain/exceptions/HttpException';
import { Request } from '../../types/generic';

const userServices = container.resolve(UserService);

const checkAccessTokenExists = (req: Request) => {
  // check cookies first then check headers for the token
  let token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
  if (!token || token === 'null') {
    return;
  }
  return token;
};

const checkUserExists = async (userId: number) => {
  const user = await userServices.findUserById(userId);
  if (!user) {
    return;
  }
  return user;
};

const authenticateUser = asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  // 1- check if the token exists
  const token = checkAccessTokenExists(req);
  if (!token) {
    return next(new HttpException(401, 'unauthorized'));
  }
  // 2- check if the token is valid
  const decoded = jwt.verify(token!, env.JWT_SECRET_KEY) as JwtPayload;

  // 3- check if the user still exists
  const user = await checkUserExists(decoded.userId);
  if (!user) {
    return next(new HttpException(401, 'unauthorized'));
  }
  req.user = user;
  next();
});

// Authorization (User permissions)
const allowedTo =
  (...roles: any) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return next(new HttpException(403, 'permission_denied'));
    }

    next();
  };

export { authenticateUser, allowedTo };
