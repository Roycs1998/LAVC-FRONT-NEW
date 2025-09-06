// src/lib/validations/auth/update-profile.ts
import * as z from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    )
    .transform((name) => name.trim()),

  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios"
    )
    .transform((name) => name.trim()),

  email: z
    .email("Ingresa un email válido")
    .max(254, "El email no puede exceder 254 caracteres")
    .transform((email) => email.toLowerCase().trim()),

  phone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone || phone.trim() === "") return true;
      return phone.length >= 10 && phone.length <= 15;
    }, "El teléfono debe tener entre 10 y 15 dígitos")
    .refine((phone) => {
      if (!phone || phone.trim() === "") return true;
      return /^\+?[\d\s\-\(\)]+$/.test(phone);
    }, "Ingresa un número de teléfono válido")
    .transform((phone) => phone?.replace(/\D/g, "") || ""),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
