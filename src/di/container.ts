// src/di/container.ts
import 'reflect-metadata';
import { container } from 'tsyringe';

// BookRepository
import { BookRepository } from '../infrastructure/repositories/BookRepository';

container.register('BookRepository', {
  useClass: BookRepository,
});
