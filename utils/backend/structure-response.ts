import { StatusCode } from "hono/utils/http-status";

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
};

export class ApiResponse<T> {
  constructor(
    public status: StatusCode,
    public data?: T,
    public errors?: T[],
    public pagination?: Pagination,
  ) {}

  public static success<T>(
    status: StatusCode,
    data: T,
    errors?: any,
    pagination?: Pagination,
  ) {
    return new ApiResponse<T>(status, data, errors, pagination);
  }

  public static error<T>(status: StatusCode, errors?: T[]) {
    return new ApiResponse<T>(status, undefined, errors);
  }
}
