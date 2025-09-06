import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/auth/register-form";

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description: "Crea tu cuenta en LAVC Platform",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
