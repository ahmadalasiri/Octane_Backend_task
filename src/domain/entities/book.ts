export class Book {
  constructor(
    public title: string,
    public author: string,
    public numOfPages: number,
    public bookId?: number,
    public uniquePagesRead?: number,
    public createdAt?: Date
  ) {}
}
