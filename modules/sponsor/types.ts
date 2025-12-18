import { ShortCompany } from "@/modules/company";

export interface EventSponsor {
  id: string;
  eventId: string;
  company: ShortCompany;
  staffQuota: number;
  staffUsed: number;
  guestQuota: number;
  guestUsed: number;
  scholarshipQuota: number;
  scholarshipUsed: number;
  isActive: boolean;
  createdAt: string;
}

export type ShortSponsor = Pick<EventSponsor, "id" | "company">;

export interface SponsorInvitationLink {
  id: string;
  eventId: string;
  sponsorId: string;
  sponsor: ShortSponsor;
  code: string;
  participantType: "staff" | "guest" | "scholarship" | "regular" | "operational_staff";
  usageType: "single" | "multiple" | "unlimited";
  maxUses: number;
  currentUses: number;
  expiresAt?: string;
  isActive: boolean;
  ticketType?: {
    id: string;
    name: string;
  };
  createdBy: {
    id: string;
    email: string;
  };
  createdAt: string;
}
