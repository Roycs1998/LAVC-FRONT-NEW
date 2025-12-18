import { InvitationParticipantType, InvitationUsageType, Invitation } from "./types";

export interface CreateInvitationRequest {
  participantType: InvitationParticipantType;
  usageType: InvitationUsageType;
  maxUses?: number;
  expiresAt?: string;
  ticketTypeId?: string;
}

export interface AcceptInvitationRequest {
  acceptWithAuth: boolean;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    dateOfBirth?: string;
  };
}

export interface AcceptInvitationResponse {
  success: boolean;
  participant: {
    id: string;
    participantType: InvitationParticipantType;
  };
  ticket?: {
    id: string;
    ticketNumber: string;
  };
  user?: {
    id: string;
    email: string;
  };
  accessToken?: string;
}

export type InvitationListResponse = Array<Invitation>;
