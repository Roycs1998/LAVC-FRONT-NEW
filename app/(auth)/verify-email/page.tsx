import type { Metadata } from "next";
import { VerifyEmailForm } from "@/components/forms/auth/verify-email-form";

export const metadata: Metadata = {
  title: "Verificar Email",
  description: "Verifica tu dirección de email",
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
