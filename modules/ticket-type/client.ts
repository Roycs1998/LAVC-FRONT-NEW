import { clientApi } from "@/lib/axios/client";
import {
  CreateTicketTypeRequest,
  UpdateTicketTypeRequest,
  TicketTypeListResponse,
} from "./contracts";
import { TicketType } from "./types";

export const TicketTypeClient = {
  /**
   * List all ticket types for an event
   */
  listTicketTypes: async (eventId: string) => {
    const api = await clientApi();
    const { data } = await api.get<TicketTypeListResponse>(
      `/events/${eventId}/ticket-types`
    );
    return data;
  },

  /**
   * Get a specific ticket type by ID
   */
  getTicketType: async (eventId: string, ticketTypeId: string) => {
    const api = await clientApi();
    const { data } = await api.get<TicketType>(
      `/events/${eventId}/ticket-types/${ticketTypeId}`
    );
    return data;
  },

  /**
   * Create a new ticket type for an event
   */
  createTicketType: async (
    eventId: string,
    payload: CreateTicketTypeRequest
  ) => {
    const api = await clientApi();
    const { data } = await api.post<TicketType>(
      `/events/${eventId}/ticket-types`,
      payload
    );
    return data;
  },

  /**
   * Update an existing ticket type
   */
  updateTicketType: async (
    ticketTypeId: string,
    payload: UpdateTicketTypeRequest
  ) => {
    const api = await clientApi();
    const { data } = await api.patch<TicketType>(
      `/events/ticket-types/${ticketTypeId}`,
      payload
    );
    return data;
  },

  /**
   * Delete a ticket type
   */
  deleteTicketType: async (eventId: string, ticketTypeId: string) => {
    const api = await clientApi();
    await api.delete(`/events/${eventId}/ticket-types/${ticketTypeId}`);
  },
};
