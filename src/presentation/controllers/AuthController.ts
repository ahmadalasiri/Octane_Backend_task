import { Request, Response } from 'express';
import { CookieOptions } from 'express';
import asyncHandler from 'express-async-handler';
import { container } from 'tsyringe';

import { AuthService } from '../../application/services/authService';
import env from '../../config/validateEnv';
import customResponse from '../../utils/customResponse';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = container.resolve(AuthService);
  }

  private accessTokenCookieOptions: CookieOptions = {
    httpOnly: true, // client side js cannot access the cookie
    maxAge: 30 * 24 * 60 * 60 * 1000, // one month
    secure: env.NODE_ENV !== 'development', // cookie only works in https (secure is true if NODE_ENV is production and false if NODE_ENV is development)
    // sameSite: env.NODE_ENV === 'development' ? 'none' : 'strict', // cookie only works in the same site (sameSite is strict if NODE_ENV is production and none if NODE_ENV is development)
    sameSite: env.NODE_ENV === 'development' ? 'none' : 'lax',
  };

  // Handler to create a new user
  public signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    let { user, accessToken } = await this.authService.signup(username, password);
    res.cookie('access_token', accessToken, this.accessTokenCookieOptions);

    res.status(201).json(Object.assign(customResponse({ data: user, success: true, message: 'user_created' }), { accessToken }));
  });

  // Handler to authenticate a user
  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const { user, accessToken } = await this.authService.login(username, password);
    res.cookie('access_token', accessToken, this.accessTokenCookieOptions);

    res.status(200).json(Object.assign(customResponse({ data: user, success: true, message: 'user_created' }), { accessToken }));
  });
}
