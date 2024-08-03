import 'reflect-metadata';
import { container } from 'tsyringe';

import { BookRepository } from '../infrastructure/repositories/BookRepository';
import { ReadingIntervalRepository } from '../infrastructure/repositories/ReadingIntervalRepository';
import { UserRepository } from '../infrastructure/repositories/UserRepository';

container.register('BookRepository', {
  useClass: BookRepository,
});

container.register('UserRepository', {
  useClass: UserRepository,
});

container.register('ReadingIntervalRepository', {
  useClass: ReadingIntervalRepository,
});
