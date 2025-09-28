import * as z from "zod";
import { EntityStatus } from "@/modules/common/types";
import { CompanyType } from "./types";

export const entityStatusEnum = z.enum(EntityStatus);
export const companyTypeEnum = z.enum(CompanyType);

export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});

export const settingsSchema = z.object({
  canUploadSpeakers: z.boolean().optional(),
  canCreateEvents: z.boolean().optional(),
  maxEventsPerMonth: z.number().int().min(0).optional(),
});

export const companyCreateSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  type: companyTypeEnum,
  description: z.string().max(1000).optional(),
  contactEmail: z.union([z.literal(""), z.email("Email inválido")]),
  contactPhone: z.string().optional(),
  address: addressSchema.partial().optional(),
  commissionRate: z.number().min(0).max(1).optional(),
  settings: settingsSchema.optional(),
});

export const companyUpdateSchema = companyCreateSchema.partial().extend({
  entityStatus: entityStatusEnum.optional(),
});

export const companyFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  entityStatus: entityStatusEnum.optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  search: z.string().optional(),
  type: companyTypeEnum.optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});
