import type { Metadata } from "next";
import { ResendVerificationForm } from "@/components/forms/auth/resend-verification-form";

export const metadata: Metadata = {
  title: "Reenviar Verificación",
  description: "Reenvía el email de verificación a tu cuenta",
};

export default function ResendVerificationPage() {
  return <ResendVerificationForm />;
}
