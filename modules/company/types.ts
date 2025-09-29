import { Address } from "@/modules/address/types";
import { EntityStatus } from "@/modules/common/types";

export enum CompanyType {
  EVENT_ORGANIZER = "event_organizer",
  EDUCATIONAL = "educational",
  CORPORATE = "corporate",
}

export interface CompanySettings {
  canUploadSpeakers: boolean;
  canCreateEvents: boolean;
  maxEventsPerMonth?: number;
}

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  contactName?: string;
  contactEmail: string;
  contactPhone?: string;
  description?: string;
  address: Address;
  commissionRate: number;
  settings: CompanySettings;
  entityStatus: EntityStatus;
  createdAt: string;
}

export type ShortCompany = Pick<
  Company,
  "id" | "name" | "contactEmail" | "contactPhone"
>;
