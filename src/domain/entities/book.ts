export class Book {
  public bookId: number;
  public title: string;
  public author: string;
  public numOfPages: number;

  constructor(bookId: number, title: string, author: string, numOfPages: number) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
  }
}
