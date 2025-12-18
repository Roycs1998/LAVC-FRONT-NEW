import { clientApi } from "@/lib/axios/client";
import {
  AssignStaffRequest,
  ParticipantListResponse,
} from "./contracts";
import { EventParticipant, ParticipantFilters } from "./types";

export const ParticipantClient = {
  /**
   * List all participants for an event
   */
  listEventParticipants: async (
    eventId: string,
    params?: ParticipantFilters
  ) => {
    const api = await clientApi();
    const { data } = await api.get<ParticipantListResponse>(
      `/events/${eventId}/participants`,
      { params }
    );
    return data;
  },

  /**
   * List operational staff for an event
   */
  listOperationalStaff: async (eventId: string) => {
    const api = await clientApi();
    const { data } = await api.get<ParticipantListResponse>(
      `/events/${eventId}/participants/operational-staff`
    );
    return data;
  },

  /**
   * Assign a user as operational staff for an event
   */
  assignOperationalStaff: async (
    eventId: string,
    payload: AssignStaffRequest
  ) => {
    const api = await clientApi();
    const { data } = await api.post<EventParticipant>(
      `/events/${eventId}/participants/operational-staff`,
      payload
    );
    return data;
  },

  /**
   * Remove operational staff from an event
   */
  removeOperationalStaff: async (eventId: string, participantId: string) => {
    const api = await clientApi();
    await api.delete(
      `/events/${eventId}/participants/operational-staff/${participantId}`
    );
  },
};
