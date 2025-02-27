import { IPagination } from './pagination.interface';

export interface ResponseT<T = null> {
  data: T;
  success: boolean;
  message: string | null;
  pagination?: IPagination;
  results?: number;
}

export default ResponseT;
