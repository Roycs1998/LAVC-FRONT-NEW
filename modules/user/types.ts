import { Company } from "../company";

type CompanyBasic = Pick<
  Company,
  "id" | "name" | "contactEmail" | "contactPhone"
>;

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  fullName: string;
}

export enum UserRole {
  PLATFORM_ADMIN = "platform_admin",
  COMPANY_ADMIN = "company_admin",
  STAFF = "staff",
  USER = "user",
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId?: string;
  emailVerified: boolean;
  person: Person;
  company?: CompanyBasic;
}
