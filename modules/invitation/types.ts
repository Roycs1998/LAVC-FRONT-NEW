import { Event } from "../event";
import { ShortCompany } from "../company";

export type InvitationUsageType = "single" | "multiple" | "unlimited";

export type InvitationParticipantType =
  | "staff"
  | "guest"
  | "scholarship"
  | "regular"
  | "operational_staff";

export interface InvitationTicketType {
  id: string;
  name: string;
  price: number;
}

export interface InvitationEventSponsor {
  id: string;
  eventId: string;
  company: ShortCompany;
}

export interface InvitationUse {
  id: string;
  userId: string;
  usedAt: string;
}

export interface Invitation {
  id: string;
  eventSponsorId: string;
  eventId: string;
  code: string;
  participantType: InvitationParticipantType;
  ticketTypeId: string;
  usageType: InvitationUsageType;
  maxUses: number | null;
  currentUses: number;
  remainingUses: number | null;
  expiresAt: string | null;
  isActive: boolean;
  ticketType: InvitationTicketType;
  eventSponsor: InvitationEventSponsor;
  event: Event;
  uses: InvitationUse[];
  createdAt: string;
  updatedAt: string;
}

export interface InvitationValidationResponse {
  valid: boolean;
  errors: string[];
  invitation: Invitation;
}

export interface InvitationAcceptResponse {
  success: boolean;
  message: string;
  participant: {
    id: string;
    participantType: InvitationParticipantType;
  };
  ticket: {
    id: string;
    ticketNumber: string;
    qrCode?: string;
  };
}
