import { Pool } from 'pg';
import { injectable } from 'tsyringe';

import { IReadingIntervalRepository } from '../../application/interfaces/IReadingIntervalRepository';
import { ReadingInterval } from '../../domain/entities/readingIntervals';
import { pgClient } from '../database';

@injectable()
export class ReadingIntervalRepository implements IReadingIntervalRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  // Method to create a new reading interval in the database
  public async create(readingInterval: Omit<ReadingInterval, 'createdAt' | 'intervalId'>): Promise<void> {
    const query = `
      INSERT INTO reading_intervals (user_id, book_id, start_page, end_page)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [readingInterval.userId, readingInterval.bookId, readingInterval.startPage, readingInterval.endPage];

    await this.client.query(query, values);
  }
}
