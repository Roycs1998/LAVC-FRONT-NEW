import { z } from "zod";
import {
  AgendaItemType,
  EventLocationType,
  EventStatus,
  EventType,
} from "./contants";
import { ticketTypeSchema } from "../ticket-type/schema";

const eventAddressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(3, "La dirección debe tener al menos 3 caracteres")
    .max(120, "La dirección no puede tener más de 120 caracteres")
    .or(z.literal(""))
    .optional(),
  city: z
    .string()
    .trim()
    .min(3, "La ciudad debe tener al menos 3 caracteres")
    .max(80, "La ciudad no puede tener más de 80 caracteres"),
  state: z
    .string()
    .trim()
    .min(3, "El estado / provincia debe tener al menos 3 caracteres")
    .max(80, "El estado / provincia no puede tener más de 80 caracteres")
    .or(z.literal(""))
    .optional(),
  country: z
    .string()
    .trim()
    .min(3, "El país debe tener al menos 3 caracteres")
    .max(80, "El país no puede tener más de 80 caracteres"),
  zipCode: z
    .string()
    .trim()
    .min(3, "El código postal debe tener al menos 3 caracteres")
    .max(20, "El código postal no puede tener más de 20 caracteres")
    .or(z.literal(""))
    .optional(),
});

const eventVirtualDetailsSchema = z.object({
  platform: z
    .string()
    .trim()
    .min(3, "La plataforma debe tener al menos 3 caracteres")
    .max(60, "La plataforma no puede tener más de 60 caracteres")
    .or(z.literal(""))
    .optional(),
  meetingUrl: z
    .url("El enlace de la reunión debe ser una URL válida")
    .or(z.literal(""))
    .optional(),
  meetingId: z
    .string()
    .trim()
    .min(3, "El ID de la reunión debe tener al menos 3 caracteres")
    .max(60, "El ID de la reunión no puede tener más de 60 caracteres")
    .or(z.literal(""))
    .optional(),
  passcode: z
    .string()
    .trim()
    .min(3, "La contraseña de la reunión debe tener al menos 3 caracteres")
    .max(60, "La contraseña no puede tener más de 60 caracteres")
    .or(z.literal(""))
    .optional(),
});

const eventLocationSchema = z.object({
  type: z.enum(EventLocationType),
  venue: z
    .string()
    .trim()
    .min(3, "El nombre del lugar debe tener al menos 3 caracteres")
    .max(120, "El nombre del lugar no puede tener más de 120 caracteres")
    .or(z.literal(""))
    .optional(),
  address: eventAddressSchema.optional(),
  virtualDetails: eventVirtualDetailsSchema.optional(),
  capacity: z.coerce
    .number()
    .min(1, "La capacidad debe ser de al menos 1 persona")
    .optional(),
});

export const eventAgendaItemSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, "El título de la actividad debe tener al menos 5 caracteres")
      .max(
        140,
        "El título de la actividad no puede tener más de 140 caracteres"
      ),
    description: z
      .string()
      .trim()
      .min(
        10,
        "La descripción de la actividad debe tener al menos 10 caracteres"
      )
      .max(
        500,
        "La descripción de la actividad no puede tener más de 500 caracteres"
      )
      .or(z.literal(""))
      .optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    speakerId: z.string().or(z.literal("")).optional(),
    type: z.enum(AgendaItemType),
  })
  .refine((data) => data.endTime > data.startTime, {
    message:
      "La hora de fin de la actividad debe ser posterior a la hora de inicio",
    path: ["endTime"],
  });

const eventRegistrationSchema = z
  .object({
    isOpen: z.boolean(),
    opensAt: z.date().optional(),
    closesAt: z.date().optional(),
    requiresApproval: z.boolean(),
    maxAttendeesPerRegistration: z.coerce
      .number()
      .min(
        1,
        "El número máximo de asistentes por registro debe ser al menos 1"
      ),
    waitlistEnabled: z.boolean(),
  })
  .refine(
    (data) => !data.opensAt || !data.closesAt || data.closesAt > data.opensAt,
    {
      message:
        "La fecha de cierre del registro debe ser posterior a la fecha de apertura",
      path: ["closesAt"],
    }
  );

const eventSettingsSchema = z.object({
  isPrivate: z.boolean(),
  requiresInvitation: z.boolean(),
  ageRestriction: z.coerce
    .number()
    .min(0, "La edad mínima no puede ser negativa")
    .optional(),
  dresscode: z
    .string()
    .trim()
    .min(3, "El código de vestimenta debe tener al menos 3 caracteres")
    .max(80, "El código de vestimenta no puede tener más de 80 caracteres")
    .or(z.literal(""))
    .optional(),
  specialInstructions: z
    .string()
    .trim()
    .min(5, "Las instrucciones especiales deben tener al menos 5 caracteres")
    .max(
      500,
      "Las instrucciones especiales no pueden tener más de 500 caracteres"
    )
    .or(z.literal(""))
    .optional(),
});

export const eventCreateSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, "El título del evento debe tener al menos 5 caracteres")
      .max(140, "El título del evento no puede tener más de 140 caracteres"),
    description: z
      .string()
      .trim()
      .min(20, "La descripción del evento debe tener al menos 20 caracteres")
      .max(
        2000,
        "La descripción del evento no puede tener más de 2000 caracteres"
      )
      .or(z.literal(""))
      .optional(),
    shortDescription: z
      .string()
      .trim()
      .min(
        10,
        "La descripción corta del evento debe tener al menos 10 caracteres"
      )
      .max(
        240,
        "La descripción corta del evento no puede tener más de 240 caracteres"
      )
      .or(z.literal(""))
      .optional(),
    companyId: z.string(),
    type: z.enum(EventType),
    eventStatus: z.enum(EventStatus),
    startDate: z.coerce
      .date()
      .nonoptional("Fecha de inicio del evento es obligatorio"),
    endDate: z.coerce
      .date()
      .nonoptional("Fecha de fin del evento es obligatorio"),
    timezone: z
      .string()
      .trim()
      .min(3, "La zona horaria debe tener al menos 3 caracteres")
      .max(50, "La zona horaria no puede tener más de 50 caracteres")
      .or(z.literal(""))
      .optional(),
    isAllDay: z.boolean(),
    location: eventLocationSchema,
    speakers: z.array(z.string()).optional(),
    agenda: z.array(eventAgendaItemSchema).optional(),
    registration: eventRegistrationSchema,
    featuredImage: z
      .url("La imagen principal debe ser una URL válida")
      .or(z.literal(""))
      .optional(),
    images: z.array(z.url("Cada imagen debe ser una URL válida")).optional(),
    videoUrl: z
      .url("El video debe ser una URL válida")
      .or(z.literal(""))
      .optional(),
    tags: z
      .array(
        z
          .string()
          .trim()
          .min(2, "Cada etiqueta debe tener al menos 2 caracteres")
      )
      .optional(),
    categories: z
      .array(
        z
          .string()
          .trim()
          .min(2, "Cada categoría debe tener al menos 2 caracteres")
      )
      .optional(),
    slug: z.string().trim().or(z.literal("")).optional(),
    settings: eventSettingsSchema.optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message:
      "La fecha de fin del evento debe ser posterior a la fecha de inicio",
    path: ["endDate"],
  });

export const eventUpdateSchema = eventCreateSchema.partial();
export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;

export const eventWithTicketsSchema = z.object({
  event: eventCreateSchema,
  tickets: z.array(ticketTypeSchema).optional().default([]),
});

export type EventWithTicketsFormInput = z.infer<typeof eventWithTicketsSchema>;
