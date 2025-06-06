import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { container } from 'tsyringe';

import { BookService } from '../../application/services/BookService';
import { Book } from '../../domain/entities/book';
import customResponse from '../../utils/customResponse';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = container.resolve(BookService);
  }

  // Handler to create a new book
  public createBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { numOfPages } = req.body;
    const book: Omit<Book, 'bookId' | 'createdAt'> = { numOfPages };
    await this.bookService.createBook(book);
    res.status(201).json({ message: 'Book created successfully' });
  });

  // Handler to get the top five books
  public getTopFiveBooks = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const books = await this.bookService.getTopFiveBooks();
    res.status(200).json(customResponse({ data: books, message: 'Top five books fetched successfully', success: true }));
  });
}
