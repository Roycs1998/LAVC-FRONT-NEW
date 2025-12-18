import { InvitationParticipantType } from "../invitation";
import { User } from "@/modules/user";
import { EventSponsor } from "@/modules/sponsor";
import { Person } from "@/modules/person";

export type ParticipantUser = Pick<User, "id" | "email"> & {
  person: Pick<Person, "firstName" | "lastName" | "phone">;
};

export type ParticipantSponsor = Pick<EventSponsor, "id" | "company">;

export interface EventParticipant {
  id: string;
  userId: string;
  eventId: string;
  participantType: InvitationParticipantType;
  isActive: boolean;
  registeredAt: string;
  user: ParticipantUser;
  eventSponsor?: ParticipantSponsor;
  notes?: string;
}

export interface ParticipantFilters {
  participantType?: InvitationParticipantType;
  sponsorId?: string;
  isActive?: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedParticipants {
  data: EventParticipant[];
  meta: PaginationMeta;
}

export interface ListParticipantsParams {
  page?: number;
  limit?: number;
  sponsorId?: string;
  participantType?: InvitationParticipantType;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
