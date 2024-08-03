import { inject, injectable } from 'tsyringe';

import { ReadingInterval } from '../../domain/entities/readingIntervals';
import type { IBookRepository } from '../interfaces/IBookRepository';
import type { IReadingIntervalRepository } from '../interfaces/IReadingIntervalRepository';

@injectable()
export class ReadingIntervalService {
  // also inject the book repository
  constructor(
    @inject('ReadingIntervalRepository')
    private readingIntervalRepository: IReadingIntervalRepository,
    @inject('BookRepository')
    private bookRepository: IBookRepository
  ) {}

  // Method to create a new reading interval
  public async createReadingInterval(readingInterval: Omit<ReadingInterval, 'createdAt' | 'intervalId'>): Promise<void> {
    await this.readingIntervalRepository.create(readingInterval);

    // 1. Get all the reading intervals for the book
    let readingIntervals = await this.readingIntervalRepository.getReadingIntervalsByBookId(readingInterval.bookId);
    if (!readingIntervals) {
      readingIntervals = [];
    }
    // 2. Sort the reading intervals by the start page
    readingIntervals = readingIntervals.sort((a, b) => a.startPage - b.startPage);

    let firstInterval = readingIntervals[0];
    let notReadPages = 0;
    // 3. Iterate over the reading intervals to calculate the unique pages read and the not read pages
    for (let i = 1; i < readingIntervals.length; i++) {
      const currentInterval = readingIntervals[i];
      if (currentInterval.startPage <= firstInterval.endPage) {
        if (currentInterval.endPage > firstInterval.endPage) {
          firstInterval.endPage = currentInterval.endPage;
        }
      } else if (currentInterval.startPage > firstInterval.endPage) {
        notReadPages += currentInterval.startPage - firstInterval.endPage - 1;
        firstInterval.endPage = currentInterval.endPage;
      }
    }
    // 4. Calculate the unique pages read
    let uniquePagesRead = firstInterval.endPage - firstInterval.startPage + 1 - notReadPages;
    // 5. Update the book with the unique pages read
    await this.bookRepository.updateUniquePagesRead(readingInterval.bookId, uniquePagesRead);
  }
}
