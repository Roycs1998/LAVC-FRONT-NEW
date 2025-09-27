import { Address } from "@/modules/address/types";
import { Company, CompanySettings, CompanyType } from "./types";
import { EntityStatus, Pagination } from "@/modules/common/types";

export interface CreateCompanyRequest {
  name: string;
  type: CompanyType;
  description?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: Address;
  commissionRate?: number;
  settings?: CompanySettings;
}

export type UpdateCompanyRequest = Partial<CreateCompanyRequest> & {
  entityStatus?: EntityStatus;
};

export interface ChangeCompanyStatusRequest {
  entityStatus: EntityStatus;
}

export interface CompanyFilters {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  entityStatus?: EntityStatus;
  createdFrom?: string;
  createdTo?: string;
  search?: string;
  type?: CompanyType;
  country?: string;
  city?: string;
}

export interface CompanyPaginatedResponse extends Pagination<Company> {}
