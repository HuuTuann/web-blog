export const initialPageParam = {
  pageNo: 1,
  pageSize: 10,
};

export interface PageResponseType<T> {
  data: T[];
  pageNo?: number;
  pageSize?: number;
  totalRecords?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface ResponseType<T> {
  data: T;
  code?: number;
  message?: string;
  success?: boolean;
  timestamp?: string;
}

export interface TableParams {
  pageNo?: number;
  pageSize?: number;
  order?: string;
  search?: string;
  sort?: string;
  [key: string]: number | boolean | string | string[] | undefined;
}

export type ParamsType = {
  [key: string]: number | boolean | string | string[] | undefined;
};
