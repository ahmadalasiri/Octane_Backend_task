import { faker } from '@faker-js/faker';

import { pgClient } from '..';

const client = pgClient();

async function seedUsers() {
  try {
    const users = [];

    for (let i = 0; i < 50; i++) {
      users.push({
        username: faker.lorem.word({ length: { min: 10, max: 30 } }) + Math.floor(Math.random() * 1000),
        password: 'password',
      });
    }

    users.push({
      role: 'admin',
      password: 'password',
    });

    const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
  `;

    for (const user of users) {
      await client.query(query, [user.username, user.password]);
    }

    console.log('Seeded 50 users into the database.');
  } catch (err) {
    console.log(err);
  }
}

export { seedUsers };
