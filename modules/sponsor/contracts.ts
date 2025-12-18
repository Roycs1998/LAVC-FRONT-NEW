import { EventSponsor, SponsorInvitationLink } from "./types";

export type CreateSponsorRequest = {
  companyId: string;
  staffQuota: number;
  guestQuota: number;
  scholarshipQuota: number;
};

export type UpdateSponsorRequest = Partial<
  Pick<EventSponsor, "staffQuota" | "guestQuota" | "scholarshipQuota" | "isActive">
>;

export type SponsorListResponse = EventSponsor[];

export type CreateInvitationLinkRequest = {
  participantType: "staff" | "guest" | "scholarship" | "regular" | "operational_staff";
  usageType: "single" | "multiple" | "unlimited";
  maxUses?: number;
  ticketTypeId?: string;
  expiresAt?: string;
};

export type InvitationLinksListResponse = SponsorInvitationLink[];
