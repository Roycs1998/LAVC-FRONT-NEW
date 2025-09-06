"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function LogoutButton({
  children = "Cerrar Sesión",
  className,
}: LogoutButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={className}
    >
      {children}
    </Button>
  );
}
