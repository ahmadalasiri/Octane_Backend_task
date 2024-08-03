// src/infrastructure/repositories/UserRepository.ts
import { Pool } from 'pg';
import { injectable } from 'tsyringe';

import { IUserRepository } from '../../application/interfaces/IUserRepository';
import { User } from '../../domain/entities/user';
import { pgClient } from '../database';

@injectable()
export class UserRepository implements IUserRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  // Method to create a new user in the database
  public async create(username: string, password: string): Promise<void> {
    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
    `;
    const values = [username, password];

    await this.client.query(query, values);
  }

  // Method to find a user by their ID
  public async findById(userId: number): Promise<User | null> {
    console.log('userId====?', userId);
    const query = `
      SELECT user_id, username, role, created_at
      FROM users
      WHERE user_id = $1
    `;
    const result = await this.client.query(query, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new User(row.user_id, row.username, row.password, row.role, row.created_at);
  }

  // Method to find a user by their username
  public async findByUsername(username: string): Promise<User | null> {
    const query = `
            SELECT *
            FROM users
            WHERE username = $1
        `;
    const result = await this.client.query(query, [username]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new User(row.user_id, row.username, row.password, row.role, row.created_at);
  }
}
