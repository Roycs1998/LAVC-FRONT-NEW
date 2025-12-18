import { z } from "zod";

export const assignStaffSchema = z.object({
  userId: z.string().min(1, "El usuario es requerido"),
  notes: z.string().optional(),
});

export type AssignStaffFormData = z.infer<typeof assignStaffSchema>;
