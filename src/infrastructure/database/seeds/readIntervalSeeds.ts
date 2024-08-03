import { faker } from '@faker-js/faker';
import 'reflect-metadata';
import { container } from 'tsyringe';

import { pgClient } from '..';
import { ReadingIntervalService } from '../../../application/services/ReadingIntervalService';
import '../../../di/container';

const client = pgClient();

const readingIntervalService = container.resolve(ReadingIntervalService);
async function seedReadingIntervals() {
  try {
    const readingIntervals = [];

    let books: any = await client.query('SELECT * FROM books');

    books = books.rows.sort((a: any, b: any) => a.book_id - b.book_id);
    for (let i = 0; i < 50; i++) {
      let userId = faker.number.int({ min: 1, max: 49 });
      let bookId = faker.number.int({ min: 1, max: 50 });
      let startPage = faker.number.int({ min: 1, max: books[bookId - 1].num_of_pages });
      if (bookId) {
      }
      let endPage = faker.number.int({ min: startPage, max: books[bookId - 1].num_of_pages });

      let book = {
        userId,
        bookId,
        startPage,
        endPage,
      };

      readingIntervals.push(book);
    }

    for (const interval of readingIntervals) {
      await readingIntervalService.createReadingInterval(interval);
    }

    console.log('Seeded 50 reading intervals into the database.');
  } catch (err) {
    console.log(err);
  }
}

export { seedReadingIntervals };
