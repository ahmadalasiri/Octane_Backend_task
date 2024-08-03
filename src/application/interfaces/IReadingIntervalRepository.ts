import { ReadingInterval } from '../../domain/entities/readingIntervals';

export interface IReadingIntervalRepository {
  create(readingInterval: Omit<ReadingInterval, 'createdAt' | 'intervalId'>): Promise<void>;
  getReadingIntervalsByBookId(bookId: number): Promise<ReadingInterval[] | null>;
}
