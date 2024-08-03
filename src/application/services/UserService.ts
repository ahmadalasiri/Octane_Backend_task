import { inject, injectable } from 'tsyringe';

import { User } from '../../domain/entities/user';
import type { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class UserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  // Method to create a new user
  public async createUser(user: Pick<User, 'username' | 'password'>): Promise<void> {
    await this.userRepository.create(user);
  }

  // Method to find a user by their ID
  public async findUserById(userId: number): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
