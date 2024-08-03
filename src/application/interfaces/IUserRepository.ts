// src/application/interfaces/IUserRepository.ts
import { User } from '../../domain/entities/user';

export interface IUserRepository {
  create(user: Pick<User, 'username' | 'password'>): Promise<void>;
  findById(userId: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}
