import { inject, injectable } from 'tsyringe';

import { Book } from '../../domain/entities/book';
import type { IBookRepository } from '../interfaces/IBookRepository';

@injectable()
export class BookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  // Method to create a new book
  public async createBook(id: number, title: string, author: string, numOfPages: number): Promise<void> {
    const book = new Book(id, title, author, numOfPages);
    await this.bookRepository.create(book);
  }

  // Method to get the top five books based on unique pages read
  public async getTopFiveBooks(): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks();
  }
}
