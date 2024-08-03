import { Pool } from 'pg';
import { injectable } from 'tsyringe';

import { IBookRepository } from '../../domain/IBookRepository';
import { Book } from '../../domain/entities/book';
import { pgClient } from '../database';

@injectable()
export class BookRepository implements IBookRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  // Method to create a new book in the database
  public async create(book: Book): Promise<void> {
    const query = `
      INSERT INTO books (id, title, author, num_of_pages)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [book.bookId, book.title, book.author, book.numOfPages];

    await this.client.query(query, values);
  }

  // Method to get the top five books based on the unique pages read
  public async getTopFiveBooks(): Promise<Book[]> {
    const query = `
      SELECT b.book_id, b.title, b.author, b.num_of_pages, b.created_at,
            COUNT(DISTINCT r.start_page) + COUNT(DISTINCT r.end_page) AS unique_pages_read
      FROM books b
      JOIN reading_intervals r ON b.book_id = r.book_id
      GROUP BY b.book_id, b.title, b.author, b.num_of_pages, b.created_at
      ORDER BY unique_pages_read DESC
      LIMIT 5;
    `;

    const result = await this.client.query(query);

    return result.rows.map(row => new Book(row.id, row.title, row.author, row.num_of_pages));
  }
}
