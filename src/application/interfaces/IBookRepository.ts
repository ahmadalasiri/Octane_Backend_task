import { Book } from '../../domain/entities/book';

export interface IBookRepository {
  create(book: Omit<Book, 'bookId' | 'createdAt'>): Promise<void>;
  getTopFiveBooks(): Promise<Book[]>;
}
