import { Pagination } from "@/modules/common";
import { EventLocationType, EventStatus, EventType } from "./contants";
import { Event } from "./type";

export type CreateEventRequest = Omit<Event, "id" | "speakers" | "company"> & {
  companyId: string;
  speakers?: string[];
};

export type UpdateEventRequest = Partial<CreateEventRequest>;

export interface EventPaginatedResponse extends Pagination<Event> {}

export type ChangeEventStatusRequest = {
  eventStatus: EventStatus;
  rejectionReason?: string;
};

export type CancelEventRequest = {
  reason?: string;
};

export type EventListParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  companyId?: string;
  type?: EventType;
  eventStatus?: EventStatus | EventStatus[];
  locationType?: EventLocationType;
  city?: string;
  country?: string;
  startFrom?: string;
  startTo?: string;
  endFrom?: string;
  endTo?: string;
  tags?: string[];
  hasAvailableTickets?: boolean;
  minPrice?: number;
  maxPrice?: number;
  createdFrom?: string;
  createdTo?: string;
  search?: string;
};
