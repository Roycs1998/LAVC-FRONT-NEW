import { ResetPasswordForm } from "@/components/forms/auth/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
  description: "Restablece tu contraseña con el enlace enviado a tu email",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
