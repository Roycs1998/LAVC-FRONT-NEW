import { clientApi } from "@/lib/axios/client";
import { TicketListResponse } from "./contracts";
import { Ticket } from "./types";

export const TicketClient = {
  /**
   * Get all tickets for the current user
   */
  getMyTickets: async () => {
    const api = await clientApi();
    const { data } = await api.get<TicketListResponse>("/tickets/my-tickets");
    return data;
  },

  /**
   * Get a specific ticket by ID
   */
  getTicketById: async (ticketId: string) => {
    const api = await clientApi();
    const { data } = await api.get<Ticket>(`/tickets/${ticketId}`);
    return data;
  },
};
