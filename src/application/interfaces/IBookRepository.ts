import { Book } from '../../domain/entities/book';

export interface IBookRepository {
  create(title: string, author: string, numOfPages: number): Promise<void>;
  getTopFiveBooks(): Promise<Book[]>;
}
