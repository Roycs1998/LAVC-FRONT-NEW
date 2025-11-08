import { TicketType } from "./type";

export type CreateTicketTypeRequest = Omit<TicketType, "id">;

export type UpdateTicketTypeRequest = Partial<CreateTicketTypeRequest>;
