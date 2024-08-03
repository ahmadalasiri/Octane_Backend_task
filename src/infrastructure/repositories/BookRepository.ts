import { Pool } from 'pg';
import { injectable } from 'tsyringe';

import { IBookRepository } from '../../application/interfaces/IBookRepository';
import { Book } from '../../domain/entities/book';
import { pgClient } from '../database';

@injectable()
export class BookRepository implements IBookRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  // Method to create a new book in the database
  public async create(book: Omit<Book, 'bookId' | 'createdAt'>): Promise<void> {
    const query = `
      INSERT INTO books (title, author, num_of_pages)
      VALUES ($1, $2, $3)
    `;
    const values = [book.numOfPages];

    await this.client.query(query, values);
  }

  // Method to update the unique pages read for a book
  public async updateUniquePagesRead(bookId: number, uniquePagesRead: number): Promise<void> {
    const query = `
      UPDATE books
      SET unique_pages_read = $1
      WHERE book_id = $2
    `;
    const values = [uniquePagesRead, bookId];

    await this.client.query(query, values);
  }

  // Method to get the top five books based on the unique pages read
  public async getTopFiveBooks(): Promise<Book[]> {
    const query = `
      SELECT book_id, num_of_pages, unique_pages_read
      FROM books
      ORDER BY unique_pages_read DESC
      LIMIT 5
    `;
    const result = await this.client.query(query);

    return result.rows.map(row => new Book(row.num_of_pages, row.book_id, row.unique_pages_read));
  }
}
