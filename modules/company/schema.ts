"use client";

import * as z from "zod";
import { EntityStatus } from "@/modules/common/types";
import { CompanyType } from "./types";
import { isValidPhoneNumber } from "react-phone-number-input";

export const entityStatusEnum = z.enum(EntityStatus);
export const companyTypeEnum = z.enum(CompanyType);

export const addressSchema = z.object({
  street: z.string().min(10, "Mínimo 10 caracteres").or(z.literal("")),
  city: z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")),
  state: z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")),
  country: z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")),
  zipCode: z.string().min(5, "Mínimo 5 caracteres").or(z.literal("")),
});

export const settingsSchema = z.object({
  canUploadSpeakers: z.boolean().optional(),
  canCreateEvents: z.boolean().optional(),
  maxEventsPerMonth: z.coerce
    .number()
    .min(0, "El máximo de eventos por mes debe ser positivo")
    .optional(),
});

export const companyCreateSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  type: companyTypeEnum,
  description: z.union([
    z.literal(""),
    z
      .string()
      .min(20, "Mínimo 20 caracteres")
      .max(400, "Máximo 400 caracteres"),
  ]),
  contactEmail: z.union([z.literal(""), z.email("Email inválido")]),
  contactPhone: z
    .string()
    .refine((val) => isValidPhoneNumber(val), "Número de teléfono inválido")
    .optional()
    .or(z.literal("")),
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
