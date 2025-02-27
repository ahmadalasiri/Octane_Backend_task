import { ResponseT } from '../types/response.interface';

export const customResponse = <T>({ data, success, message, pagination, results }: ResponseT<T>) => {
  return {
    results,
    pagination,
    success,
    message,
    data,
  };
};

export default customResponse;
