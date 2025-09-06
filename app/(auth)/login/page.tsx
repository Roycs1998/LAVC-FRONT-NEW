import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión en tu cuenta de LAVC Platform",
};

export default function LoginPage() {
  return <LoginForm />;
}
