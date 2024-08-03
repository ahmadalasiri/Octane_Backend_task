import { faker } from '@faker-js/faker';

import { pgClient } from '..';

const client = pgClient();

async function seedBooks() {
  try {
    const books = [];

    for (let i = 0; i < 50; i++) {
      books.push({
        numOfPages: faker.number.int({ min: 50, max: 1000 }),
      });
    }

    const query = `
    INSERT INTO books (num_of_pages)
    VALUES ($1)
  `;

    for (const book of books) {
      await client.query(query, [book.numOfPages]);
    }

    console.log('Seeded 50 books into the database.');
  } catch (err) {
    console.log(err);
  }
}

export { seedBooks };
