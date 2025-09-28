import { clientApi } from "@/lib/axios/client";
import type {
  CompanyPaginatedResponse,
  CompanyFilters,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  ChangeCompanyStatusRequest,
} from "./contracts";
import type { Company } from "./types";

export const CompaniesClient = {
  async list(filters: CompanyFilters = {}): Promise<CompanyPaginatedResponse> {
    const api = await clientApi();

    const { data } = await api.get(`/companies`, { params: filters });
    return data;
  },

  async getById(id: string): Promise<Company> {
    const api = await clientApi();
    const { data } = await api.get(`/companies/${id}`);
    return data;
  },

  async create(dto: CreateCompanyRequest): Promise<Company> {
    const api = await clientApi();
    const { data } = await api.post(`/companies`, dto);
    return data;
  },

  async update(id: string, dto: UpdateCompanyRequest): Promise<Company> {
    const api = await clientApi();
    const { data } = await api.patch(`/companies/${id}`, dto);
    return data;
  },

  async changeStatus(
    id: string,
    dto: ChangeCompanyStatusRequest
  ): Promise<Company> {
    const api = await clientApi();
    const { data } = await api.patch(`/companies/${id}/status`, dto);
    return data;
  },

  async remove(id: string): Promise<void> {
    const api = await clientApi();
    await api.delete(`/companies/${id}`);
  },
};
