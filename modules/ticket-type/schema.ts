import z from "zod";
import { Currency } from "../common";
import { TicketStatus } from "./contants";

export const pricingTierSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "El nombre del tier debe tener al menos 3 caracteres")
      .max(80, "El nombre del tier no puede tener más de 80 caracteres"),
    price: z.coerce.number().min(0, "El precio del tier no puede ser negativo"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    isActive: z.boolean(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La fecha de fin del tier debe ser posterior a la fecha de inicio",
    path: ["endDate"],
  });

export const ticketRestrictionsSchema = z
  .object({
    minPerOrder: z.coerce
      .number()
      .min(1, "El mínimo de entradas por orden debe ser al menos 1"),

    maxPerOrder: z.coerce
      .number()
      .min(1, "El máximo de entradas por orden debe ser al menos 1"),
    maxPerUser: z.coerce.number().optional(),
    requiresApproval: z.boolean(),
    transferable: z.boolean(),
    refundable: z.boolean(),
  })
  .refine((data) => data.maxPerOrder >= data.minPerOrder, {
    message:
      "El máximo de entradas por orden debe ser mayor o igual al mínimo por orden",
    path: ["maxPerOrder"],
  })
  .refine(
    (data) => data.maxPerUser == null || data.maxPerUser >= data.minPerOrder,
    {
      message:
        "El máximo de entradas por usuario debe ser mayor o igual al mínimo por orden",
      path: ["maxPerUser"],
    }
  );

export const ticketAccessSchema = z.object({
  includesAccess: z
    .array(
      z
        .string()
        .trim()
        .min(3, "Cada acceso incluido debe tener al menos 3 caracteres")
    )
    .optional(),
  excludesAccess: z
    .array(
      z
        .string()
        .trim()
        .min(3, "Cada acceso excluido debe tener al menos 3 caracteres")
    )
    .optional(),
  perks: z
    .array(
      z
        .string()
        .trim()
        .min(3, "Cada beneficio debe tener al menos 3 caracteres")
    )
    .optional(),
});

export const ticketTypeSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string()
      .trim()
      .min(3, "El nombre del tipo de ticket debe tener al menos 3 caracteres")
      .max(
        120,
        "El nombre del tipo de ticket no puede tener más de 120 caracteres"
      ),
    description: z
      .string()
      .trim()
      .min(10, "La descripción del ticket debe tener al menos 10 caracteres")
      .max(
        500,
        "La descripción del ticket no puede tener más de 500 caracteres"
      )
      .or(z.literal(""))
      .optional(),
    currency: z.enum(Currency),
    quantity: z.coerce
      .number()
      .min(1, "La cantidad total disponible debe ser al menos 1"),
    ticketStatus: z.enum(TicketStatus).optional(),
    saleStartDate: z.date().optional(),
    saleEndDate: z.date().optional(),
    price: z.coerce
      .number()
      .min(0, "El precio no puede ser negativo")
      .optional(),
    pricingTiers: z.array(pricingTierSchema).optional(),
    restrictions: ticketRestrictionsSchema.optional(),
    access: ticketAccessSchema.optional(),
  })
  .refine(
    (data) =>
      !data.saleStartDate ||
      !data.saleEndDate ||
      data.saleEndDate > data.saleStartDate,
    {
      message:
        "La fecha de fin de venta debe ser posterior a la fecha de inicio de venta",
      path: ["saleEndDate"],
    }
  );
