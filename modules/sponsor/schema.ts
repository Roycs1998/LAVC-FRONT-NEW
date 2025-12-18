import { z } from "zod";

export const createSponsorSchema = z.object({
  companyId: z.string().min(1, "Selecciona una empresa"),
  staffQuota: z.number().min(0, "La cuota debe ser mayor o igual a 0"),
  guestQuota: z.number().min(0, "La cuota debe ser mayor o igual a 0"),
  scholarshipQuota: z.number().min(0, "La cuota debe ser mayor o igual a 0"),
});

export const updateSponsorSchema = z.object({
  staffQuota: z.number().min(0).optional(),
  guestQuota: z.number().min(0).optional(),
  scholarshipQuota: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const createInvitationLinkSchema = z.object({
  sponsorId: z.string().min(1, "Selecciona un sponsor"),
  type: z.enum(["staff", "guest", "scholarship"]),
  maxUses: z.number().min(1, "Debe permitir al menos 1 uso").max(1000, "Máximo 1000 usos"),
  expiresAt: z.string().optional(),
});

export type CreateSponsorFormData = z.infer<typeof createSponsorSchema>;
export type UpdateSponsorFormData = z.infer<typeof updateSponsorSchema>;
export type CreateInvitationLinkFormData = z.infer<typeof createInvitationLinkSchema>;
