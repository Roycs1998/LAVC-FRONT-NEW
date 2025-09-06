import { Address } from "../address/types";
import { EntityStatus } from "../common/types";

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
  description?: string;
  logo?: string;
  website?: string;
  contactEmail: string;
  contactPhone?: string;
  address: Address;
  type: CompanyType;
  comissionRate: number;
  settings: CompanySettings;
  entityStatus: EntityStatus;
  createdAt: string;
}
