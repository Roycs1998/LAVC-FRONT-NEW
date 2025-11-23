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
