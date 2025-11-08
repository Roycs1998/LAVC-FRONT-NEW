import { clientApi } from "@/lib/axios/client";
import {
  CancelEventRequest,
  ChangeEventStatusRequest,
  CreateEventRequest,
  EventListParams,
  EventPaginatedResponse,
} from "./contracts";
import { CompanyEventStats, Event, EventStats } from "./type";

export const EventsClient = {
  create: async (payload: CreateEventRequest) => {
    const api = await clientApi();

    const { data } = await api.post<Event>("/events", payload);
    return data;
  },

  list: async (params: EventListParams = {}) => {
    const api = await clientApi();
    const { data } = await api.get<EventPaginatedResponse>("/events", {
      params,
    });
    return data;
  },

  listPublic: async (params: Partial<EventListParams> = {}) => {
    const api = await clientApi();
    const { data } = await api.get<EventPaginatedResponse>("/events/public", {
      params,
    });
    return data;
  },

  get: async (id: string) => {
    const api = await clientApi();
    const { data } = await api.get<Event>(`/events/${id}`);
    return data;
  },

  getBySlug: async (slug: string) => {
    const api = await clientApi();
    const { data } = await api.get<Event>(`/events/slug/${slug}`);
    return data;
  },

  update: async (id: string, payload: Partial<CreateEventRequest>) => {
    const api = await clientApi();
    const { data } = await api.patch<Event>(`/events/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const api = await clientApi();
    await api.delete(`/events/${id}`);
  },

  submit: async (id: string) => {
    const api = await clientApi();
    const { data } = await api.post<Event>(`/events/${id}/submit`, {});
    return data;
  },

  changeStatus: async (id: string, payload: ChangeEventStatusRequest) => {
    const api = await clientApi();
    const { data } = await api.patch<Event>(`/events/${id}/status`, payload);
    return data;
  },
  publish: async (id: string) => {
    const api = await clientApi();
    const { data } = await api.patch<Event>(`/events/${id}/publish`, {});
    return data;
  },
  cancel: async (id: string, payload: CancelEventRequest = {}) => {
    const api = await clientApi();
    const { data } = await api.patch<Event>(`/events/${id}/cancel`, payload);
    return data;
  },
  companyStats: async (companyId: string) => {
    const api = await clientApi();
    const { data } = await api.get<CompanyEventStats>(
      `/events/company/${companyId}/stats`
    );
    return data;
  },
  eventStats: async (id: string) => {
    const api = await clientApi();
    const { data } = await api.get<EventStats>(`/events/${id}/stats`);
    return data;
  },
};
