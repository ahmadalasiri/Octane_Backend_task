import { Book } from '../../domain/entities/book';

export interface IBookRepository {
  create(book: Book): Promise<void>;
  getTopFiveBooks(): Promise<Book[]>;
}
