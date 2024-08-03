import asyncHandler from 'express-async-handler';
import { container } from 'tsyringe';

import { UserService } from '../../application/services/UserService';
import { User } from '../../domain/entities/user';
import { Request, Response } from '../../types/generic';
import customResponse from '../../utils/customResponse';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = container.resolve(UserService);
  }

  // Handler to create a new user
  public createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user: Pick<User, 'username' | 'password'> = { username: req.body.username, password: req.body.password };
    await this.userService.createUser(user);
    res.status(201).json({ message: 'User created successfully' });
  });

  // Handler to get a user by their ID
  public getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.id);
    const user = await this.userService.findUserById(userId);
    res.status(200).json(customResponse({ data: user, message: 'User fetched successfully', success: true }));
  });

  public getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(customResponse({ data: req.user, message: 'User fetched successfully', success: true }));
  });
}
