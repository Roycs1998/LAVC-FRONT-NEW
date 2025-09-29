import { EntityStatus, Pagination } from "@/modules/common/types";
import { Speaker } from "./types";

export type SpeakerFilters = {
  search?: string;
  entityStatus?: EntityStatus;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
};

export interface SpeakerPaginatedResponse extends Pagination<Speaker> {}

export type CreateSpeakerRequest = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  companyId: string;
  specialty?: string;
  biography?: string;
  yearsExperience?: number;
  certifications?: string[];
  hourlyRate?: number;
  languages?: string[];
  topics?: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    github?: string;
  };
  audienceSize?: { min?: number; max?: number };
  notes?: string;
  currency?: "PEN" | "USD" | "EUR";
};

export type UpdateSpeakerRequest = Partial<CreateSpeakerRequest>;
