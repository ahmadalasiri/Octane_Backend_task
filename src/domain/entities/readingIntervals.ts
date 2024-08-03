export class ReadingInterval {
  constructor(
    public userId: number,
    public bookId: number,
    public startPage: number,
    public endPage: number,
    public intervalId?: number,
    public createdAt?: Date
  ) {}
}
