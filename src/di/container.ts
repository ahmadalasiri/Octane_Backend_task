import 'reflect-metadata';
import { container } from 'tsyringe';

import { BookRepository } from '../infrastructure/repositories/BookRepository';
import { UserRepository } from '../infrastructure/repositories/UserRepository';

container.register('BookRepository', {
  useClass: BookRepository,
});

container.register('UserRepository', {
  useClass: UserRepository,
});
