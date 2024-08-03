import { Book } from '../../domain/entities/book';

export interface IBookRepository {
  create(book: Omit<Book, 'bookId' | 'createdAt'>): Promise<void>;
  updateUniquePagesRead(bookId: number, uniquePagesRead: number): Promise<void>;
  getTopFiveBooks(): Promise<Book[]>;
}
