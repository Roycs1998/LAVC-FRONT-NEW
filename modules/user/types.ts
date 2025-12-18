import { ShortCompany } from "@/modules/company";
import { Person } from "@/modules/person/types";

export enum UserRole {
  PLATFORM_ADMIN = "platform_admin",
  COMPANY_ADMIN = "company_admin",
  STAFF = "staff",
  USER = "user",
}

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
  companyId?: string;
  emailVerified: boolean;
  person: Person;
  company?: ShortCompany;
}

export interface OperationalStaffRole {
  eventId: string;
  eventTitle: string;
  eventStartDate: string;
  eventEndDate: string;
  participantId: string;
  role: "operational_staff";
  canAccess: boolean;
}

export interface SponsorStaffRole {
  eventId: string;
  eventTitle: string;
  sponsorId: string;
  sponsorName: string;
  participantId: string;
  role: "sponsor_staff";
  canAccess: boolean;
}

export interface StaffRolesResponse {
  hasStaffRoles: boolean;
  operationalStaff: OperationalStaffRole[];
  sponsorStaff: SponsorStaffRole[];
}
