import { inject, injectable } from 'tsyringe';

import { Book } from '../../domain/entities/book';
import type { IBookRepository } from '../interfaces/IBookRepository';

@injectable()
export class BookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  // Method to create a new book
  public async createBook(book: Omit<Book, 'bookId' | 'createdAt'>): Promise<void> {
    await this.bookRepository.create(book);
  }

  // Method to get the top five books based on unique pages read
  public async getTopFiveBooks(): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks();
  }
}
