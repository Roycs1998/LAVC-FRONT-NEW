import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Recuperar Contraseña",
  description: "Recupera el acceso a tu cuenta",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
