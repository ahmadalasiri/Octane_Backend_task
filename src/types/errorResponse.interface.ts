import { ResponseT } from './response.interface';

export interface ErrorResponse extends ResponseT {
  stack?: string;
}
