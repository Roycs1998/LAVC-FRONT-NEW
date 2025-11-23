import { z } from "zod";
import { Currency, EntityStatus } from "@/modules/common/types";
import { isValidPhoneNumber } from "react-phone-number-input";

export const entityStatusEnum = z.enum(EntityStatus);
export const currencyEnum = z.enum(Currency);

export const personCreateSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.email("Correo inválido").optional().or(z.literal("")),
  phone: z
    .string()
    .refine((val) => isValidPhoneNumber(val), "Número de teléfono inválido")
    .optional()
    .or(z.literal("")),
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
    min: z.coerce.number().min(0, "No puede ser negativo"),
    max: z.coerce.number().min(0, "No puede ser negativo"),
  })
  .refine(
    (data) =>
      data.min === undefined || data.max === undefined || data.min <= data.max,
    {
      message: "El valor mínimo no puede ser mayor que el máximo",
      path: ["max"],
    }
  );

export const speakerCreateSchema = personCreateSchema.extend({
  companyId: z.string().min(1, "La empresa es obligatoria"),
  specialty: z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")),
  biography: z.string().min(20, "Mínimo 20 caracteres").or(z.literal("")),
  yearsExperience: z.coerce
    .number()
    .min(0, "La experiencia debe ser positiva")
    .optional(),
  certifications: z
    .array(z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")))
    .optional(),
  hourlyRate: z.coerce
    .number()
    .min(0, "La tarifa por hora debe ser positiva")
    .optional(),
  languages: z
    .array(z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")))
    .optional(),
  topics: z
    .array(z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")))
    .optional(),
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
