"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function LoginButton({
  children = "Iniciar Sesión",
  className,
}: LoginButtonProps) {
  return (
    <Button onClick={() => signIn()} className={className}>
      {children}
    </Button>
  );
}
