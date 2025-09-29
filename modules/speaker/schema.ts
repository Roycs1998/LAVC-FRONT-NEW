import { z } from "zod";
import { Currency, EntityStatus } from "@/modules/common/types";

export const entityStatusEnum = z.enum(EntityStatus);
export const currencyEnum = z.enum(Currency);

export const personCreateSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.email("Correo inválido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

export const socialMediaCreateSchema = z
  .object({
    linkedin: z.union([z.literal(""), z.url("URL inválida")]),
    twitter: z.union([z.literal(""), z.url("URL inválida")]),
    website: z.union([z.literal(""), z.url("URL inválida")]),
    github: z.union([z.literal(""), z.url("URL inválida")]),
  })
  .partial();

export const audienceSizeCreateSchema = z
  .object({
    min: z.number().min(0, "No puede ser negativo").optional(),
    max: z.number().min(0, "No puede ser negativo").optional(),
  })
  .partial();

export const speakerCreateSchema = personCreateSchema.extend({
  companyId: z.string().min(1, "La empresa es obligatoria"),
  specialty: z.string().optional(),
  biography: z.string().optional(),
  yearsExperience: z.number().min(0, "No puede ser negativo").optional(),
  certifications: z.array(z.string()).optional(),
  hourlyRate: z.number().min(0, "No puede ser negativo").optional(),
  languages: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
  socialMedia: socialMediaCreateSchema.optional(),
  audienceSize: audienceSizeCreateSchema.optional(),
  notes: z.string().optional(),
  currency: currencyEnum.optional(),
});

export const speakerUpdateSchema = speakerCreateSchema.partial();

export type SpeakerCreateInput = z.infer<typeof speakerCreateSchema>;
export type SpeakerUpdateInput = z.infer<typeof speakerUpdateSchema>;
export type SpeakerEntityStatus = EntityStatus;
export type SpeakerCurrency = Currency;
