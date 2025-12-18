import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/auth/register-form";

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description: "Crea tu cuenta en LAVC Platform",
};

interface RegisterPageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const { code } = await searchParams;
  return <RegisterForm invitationCode={code} />;
}
