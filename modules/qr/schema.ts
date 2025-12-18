import { z } from "zod";

export const qrValidateSchema = z.object({
  qrCode: z.string().min(1, "El código QR es requerido"),
  eventId: z.string().min(1, "El evento es requerido"),
});

export type QRValidateFormData = z.infer<typeof qrValidateSchema>;
