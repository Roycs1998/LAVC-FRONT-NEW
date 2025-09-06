import { ChangePasswordForm } from "@/components/forms/auth/change-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cambiar Contraseña",
  description: "Cambia tu contraseña actual por una nueva",
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
