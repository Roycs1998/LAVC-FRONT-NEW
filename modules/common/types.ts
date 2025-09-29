export enum EntityStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
  PENDING = "pending",
}

export interface Pagination<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export enum Currency {
  PEN = "PEN",
  USD = "USD",
  EUR = "EUR",
}
