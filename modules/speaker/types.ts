import { Currency, EntityStatus } from "@/modules/common/types";
import { Person } from "@/modules/person/types";
import { ShortCompany } from "@/modules/company";

export interface AudienceSize {
  min?: number;
  max?: number;
}

export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  website?: string;
  github?: string;
}

export interface Speaker {
  id: string;
  person: Person;
  company?: ShortCompany;
  specialty: string;
  biography?: string;
  yearsExperience: number;
  certifications?: string[];
  hourlyRate?: number;
  currency?: Currency;
  socialMedia?: SocialMedia;
  languages?: string[];
  topics?: string[];
  audienceSize?: AudienceSize;
  notes?: string;
  entityStatus: EntityStatus;
  createdAt: Date;
}
