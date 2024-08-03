import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import env from '../../config/validateEnv';
import { User } from '../../domain/entities/user';
import HttpException from '../../domain/exceptions/HttpException';
import { createAccessToken } from '../../utils/createToken';
import type { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class AuthService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  public async signup(username: string, password: string): Promise<{ user: User; accessToken: string }> {
    // 1- Check if a user with the same username
    let existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new HttpException(409, 'User already exists');
    }

    // 2- Create a new user
    password = await bcrypt.hash(password, env.SALT_ROUNDS);

    await this.userRepository.create(username, password);
    let user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new HttpException(500, 'Failed to create user');
    }
    let accessToken = createAccessToken(user.userId);
    return { user, accessToken };
  }

  // login method
  public async login(username: string, password: string): Promise<{ user: User; accessToken: string }> {
    // 1- Check if the user exists
    let user = await this.userRepository.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(401, 'email_or_password_incorrect');
    }
    let accessToken = createAccessToken(user.userId);

    return { user, accessToken };
  }
}
