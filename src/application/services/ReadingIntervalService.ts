import { inject, injectable } from 'tsyringe';

import { ReadingInterval } from '../../domain/entities/readingIntervals';
import type { IReadingIntervalRepository } from '../interfaces/IReadingIntervalRepository';

@injectable()
export class ReadingIntervalService {
  constructor(@inject('ReadingIntervalRepository') private readingIntervalRepository: IReadingIntervalRepository) {}

  // Method to create a new reading interval
  public async createReadingInterval(readingInterval: Omit<ReadingInterval, 'createdAt' | 'intervalId'>): Promise<void> {
    await this.readingIntervalRepository.create(readingInterval);
  }
}
