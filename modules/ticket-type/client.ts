import { clientApi } from "@/lib/axios/client";
import { CreateTicketTypeRequest, UpdateTicketTypeRequest } from "./contracts";
import { TicketType } from "./type";

export const EventsClient = {
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

  deleteTicketType: async (ticketTypeId: string) => {
    const api = await clientApi();
    await api.delete(`/events/ticket-types/${ticketTypeId}`);
  },
  getEventTicketTypesPublic: async (eventId: string) => {
    const api = await clientApi();
    const { data } = await api.get<TicketType[]>(
      `/events/${eventId}/ticket-types`
    );
    return data;
  },
};
