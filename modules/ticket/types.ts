import { TicketSourceType, TicketStatus } from "./constants";
import { Event, EventLocation } from "@/modules/event";
import { TicketType } from "@/modules/ticket-type";

// Ticket event details
export type TicketEvent = Pick<Event, "id" | "title" | "startDate" | "endDate"> & {
  location?: Pick<EventLocation, "type" | "venue">;
};

// Ticket type details
export type TicketTypeInfo = Pick<TicketType, "id" | "name" | "price">;

export interface Ticket {
  id: string;
  ticketNumber: string;
  event: TicketEvent;
  ticketType: TicketTypeInfo;
  qrCode: string; // base64 image data
  status: TicketStatus;
  sourceType: TicketSourceType;
  validatedAt?: string;
  createdAt: string;
}
