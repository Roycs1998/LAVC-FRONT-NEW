import z from "zod";
import {
  AgendaItemType,
  EventLocationType,
  EventStatus,
  EventType,
} from "./contants";

const addressSchema = z.object({
  street: z.string().max(120).optional(),
  city: z.string().min(1, "Ciudad obligatoria"),
  state: z.string().max(80).optional(),
  country: z.string().min(1, "País obligatorio"),
  zipCode: z.string().max(20).optional(),
});

const virtualDetailsSchema = z.object({
  platform: z.string().max(60).optional(),
  meetingUrl: z.url("URL inválida").optional(),
  meetingId: z.string().max(60).optional(),
  passcode: z.string().max(60).optional(),
});

const locationSchema = z.object({
  type: z.enum(EventLocationType),
  venue: z.string().max(120).optional(),
  address: addressSchema.optional(),
  virtualDetails: virtualDetailsSchema.optional(),
  capacity: z.number().min(1, "Debe ser ≥ 1").optional(),
});

const agendaItemSchema = z.object({
  title: z.string().min(1).max(140),
  description: z.string().max(500).optional(),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  speakerId: z.string().optional(),
  type: z.enum(AgendaItemType),
});

const registrationSchema = z.object({
  isOpen: z.boolean(),
  opensAt: z.string().optional(),
  closesAt: z.string().optional(),
  requiresApproval: z.boolean(),
  maxAttendeesPerRegistration: z.number().min(1, "Debe ser ≥ 1"),
  waitlistEnabled: z.boolean(),
});

const settingsSchema = z.object({
  isPrivate: z.boolean(),
  requiresInvitation: z.boolean(),
  ageRestriction: z.number().min(0).optional(),
  dresscode: z.string().max(80).optional(),
  specialInstructions: z.string().max(500).optional(),
});

export const eventCreateSchema = z.object({
  title: z
    .string()
    .nonempty("Título obligatorio")
    .min(1, "Mínimo 1 carácter")
    .max(140, "Máximo 140 caracteres"),
  description: z
    .string()
    .nonempty("Descripción obligatoria")
    .min(10, "Mínimo 10 caracteres")
    .max(2000, "Máximo 2000 caracteres"),
  shortDescription: z
    .string()
    .nonempty("Descripción corta obligatoria")
    .min(10, "Mínimo 10 caracteres")
    .max(200, "Máximo 200 caracteres"),

  companyId: z.string().min(1),
  type: z.enum(EventType),
  eventStatus: z.enum(EventStatus),

  startDate: z.date().nonoptional("Fecha de inicio obligatoria"),
  endDate: z.date().nonoptional("Fecha de fin obligatoria"),
  isAllDay: z.boolean(),

  location: locationSchema,

  speakers: z.array(z.string()).optional(),
  agenda: z.array(agendaItemSchema).optional(),

  registration: registrationSchema,

  featuredImage: z.url("URL inválida").optional(),
  images: z.array(z.url("URL inválida")).optional(),
  videoUrl: z.url("URL inválida").optional(),

  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  slug: z.string().optional(),

  settings: settingsSchema.optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();
export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
