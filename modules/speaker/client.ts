import { clientApi } from "@/lib/axios/client";
import type {
  SpeakerPaginatedResponse,
  SpeakerFilters,
  CreateSpeakerRequest,
  UpdateSpeakerRequest,
} from "./contract";
import { Speaker } from "./types";
import { EntityStatus } from "../common/types";

export const SpeakersClient = {
  async list(query: SpeakerFilters) {
    const api = await clientApi();
    const { data } = await api.get<SpeakerPaginatedResponse>("/speakers", {
      params: query,
    });
    return data;
  },
  async get(id: string) {
    const api = await clientApi();
    const { data } = await api.get<Speaker>(`/speakers/${id}`);
    return data;
  },
  async create(payload: CreateSpeakerRequest) {
    const api = await clientApi();
    const { data } = await api.post<Speaker>("/speakers", payload);
    return data;
  },
  async update(id: string, payload: UpdateSpeakerRequest) {
    const api = await clientApi();
    const { data } = await api.patch<Speaker>(`/speakers/${id}`, payload);
    return data;
  },
  async changeStatus(id: string, entityStatus: EntityStatus) {
    const api = await clientApi();
    const { data } = await api.patch(`"/speakers/${id}/status`, {
      entityStatus,
    });
    return data;
  },

  async remove(id: string) {
    const api = await clientApi();
    await api.delete(`/speakers/${id}`);
  },
};
