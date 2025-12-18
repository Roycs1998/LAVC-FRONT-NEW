import { EventParticipant, ParticipantFilters } from "./types";

export interface AssignStaffRequest {
  userId: string;
  notes?: string;
}

export interface ParticipantListResponse extends Array<EventParticipant> {}
