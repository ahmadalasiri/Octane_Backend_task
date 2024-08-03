import { inject, injectable } from 'tsyringe';

import { Book } from '../../domain/entities/book';
import type { IBookRepository } from '../interfaces/IBookRepository';

@injectable()
export class BookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  // Method to create a new book
  public async createBook(title: string, author: string, numOfPages: number): Promise<void> {
    await this.bookRepository.create(title, author, numOfPages);
  }

  // Method to get the top five books based on unique pages read
  public async getTopFiveBooks(): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks();
  }
}
