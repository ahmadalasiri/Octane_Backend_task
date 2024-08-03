// src/application/interfaces/IUserRepository.ts
import { User } from '../../domain/entities/user';

export interface IUserRepository {
  create(username: string, password: string): Promise<void>;
  findById(userId: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}
