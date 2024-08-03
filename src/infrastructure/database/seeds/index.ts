import { seedBooks } from './bookSeeds';
import { seedReadingIntervals } from './readIntervalSeeds';
import { seedUsers } from './userSeeds';

async function seed() {
  await seedUsers();
  await seedBooks();
  await seedReadingIntervals();
}

seed().then(() => {
  console.log('Seeding complete.');
});
