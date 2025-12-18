import { z } from "zod";

export const acceptInvitationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  lastName: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  email: z
    .email("Email inválido")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede tener más de 100 caracteres"),
  phone: z
    .string()
    .trim()
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .max(15, "El teléfono no puede tener más de 15 dígitos")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.string().optional(),
});

export type AcceptInvitationFormData = z.infer<typeof acceptInvitationSchema>;
