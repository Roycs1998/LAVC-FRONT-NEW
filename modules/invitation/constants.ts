import { InvitationParticipantType, InvitationUsageType } from "./types";

export const PARTICIPANT_TYPE_LABELS: Record<InvitationParticipantType, string> = {
  guest: "Invitado",
  staff: "Staff del Sponsor",
  scholarship: "Beca",
  regular: "Participante Regular",
  operational_staff: "Staff Operativo",
};

export const PARTICIPANT_TYPE_DESCRIPTIONS: Record<InvitationParticipantType, string> = {
  guest: "Tendrás acceso como invitado al evento",
  staff: "Formarás parte del equipo del sponsor",
  scholarship: "Participarás con una beca completa",
  regular: "Participación regular con entrada pagada",
  operational_staff: "Formarás parte del equipo organizador",
};

export const USAGE_TYPE_LABELS: Record<InvitationUsageType, string> = {
  single: "Uso único",
  multiple: "Usos limitados",
  unlimited: "Usos ilimitados",
};

// Re-export types as enums for schema validation
export enum ParticipantType {
  GUEST = "guest",
  STAFF = "staff",
  SCHOLARSHIP = "scholarship",
  REGULAR = "regular",
  OPERATIONAL_STAFF = "operational_staff",
}

export enum UsageType {
  SINGLE = "single",
  MULTIPLE = "multiple",
  UNLIMITED = "unlimited",
}

export type { InvitationParticipantType, InvitationUsageType };
