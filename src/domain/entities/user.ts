export class User {
  public userId: string;
  public username: string;
  public password: string;
  public role: string;
  public createdAt: Date;

  constructor(userId: string, username: string, password: string, role: string, createdAt: Date) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}
