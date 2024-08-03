import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { container } from 'tsyringe';

import { ReadingIntervalService } from '../../application/services/ReadingIntervalService';

export class ReadingIntervalController {
  private readingIntervalService: ReadingIntervalService;

  constructor() {
    this.readingIntervalService = container.resolve(ReadingIntervalService);
  }

  // Handler to create a new reading interval
  public createReadingInterval = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId, bookId, startPage, endPage } = req.body;
    await this.readingIntervalService.createReadingInterval({ userId, bookId, startPage, endPage });
    res.status(201).json({ message: 'Reading interval created successfully' });
  });
}
