import { clientApi } from "@/lib/axios/client";
import {
  CreateSponsorRequest,
  SponsorListResponse,
  UpdateSponsorRequest,
  CreateInvitationLinkRequest,
  InvitationLinksListResponse,
} from "./contracts";
import { EventSponsor, SponsorInvitationLink } from "./types";

export const SponsorClient = {
  listEventSponsors: async (eventId: string) => {
    const api = await clientApi();
    const { data } = await api.get<SponsorListResponse>(
      `/events/${eventId}/sponsors`
    );
    return data;
  },

  addSponsor: async (eventId: string, payload: CreateSponsorRequest) => {
    const api = await clientApi();
    const { data } = await api.post<EventSponsor>(
      `/events/${eventId}/sponsors`,
      payload
    );
    return data;
  },

  updateSponsor: async (
    eventId: string,
    sponsorId: string,
    payload: UpdateSponsorRequest
  ) => {
    const api = await clientApi();
    const { data } = await api.patch<EventSponsor>(
      `/events/${eventId}/sponsors/${sponsorId}`,
      payload
    );
    return data;
  },

  removeSponsor: async (eventId: string, sponsorId: string) => {
    const api = await clientApi();
    await api.delete(`/events/${eventId}/sponsors/${sponsorId}`);
  },

  getSponsor: async (eventId: string, sponsorId: string) => {
    const api = await clientApi();
    const { data } = await api.get<EventSponsor>(
      `/events/${eventId}/sponsors/${sponsorId}`
    );
    return data;
  },

  createInvitationLink: async (
    eventId: string,
    sponsorId: string,
    payload: Omit<CreateInvitationLinkRequest, "sponsorId">
  ) => {
    const api = await clientApi();
    const { data } = await api.post<SponsorInvitationLink>(
      `/events/${eventId}/sponsors/${sponsorId}/invitations`,
      payload
    );
    return data;
  },

  listInvitationLinks: async (eventId: string) => {
    const api = await clientApi();
    const { data } = await api.get<InvitationLinksListResponse>(
      `/events/${eventId}/invitations`
    );
    return data;
  },

  deactivateInvitationLink: async (
    eventId: string,
    sponsorId: string,
    invitationId: string
  ) => {
    const api = await clientApi();
    const { data } = await api.patch(
      `/events/${eventId}/sponsors/${sponsorId}/invitations/${invitationId}/deactivate`
    );
    return data;
  },

  updateInvitation: async (
    eventId: string,
    sponsorId: string,
    invitationId: string,
    payload: { isActive: boolean }
  ) => {
    const api = await clientApi();
    const { data } = await api.patch(
      `/events/${eventId}/sponsors/${sponsorId}/invitations/${invitationId}`,
      payload
    );
    return data;
  },
};