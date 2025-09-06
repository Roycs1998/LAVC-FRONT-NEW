"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Home, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const { data: session } = useSession();

  const getDashboardUrl = () => {
    if (!session?.user) return "/";

    const userRole = session.user.role as string;

    if (["SUPER_ADMIN", "COMPANY_ADMIN", "STAFF"].includes(userRole)) {
      return "/admin-dashboard";
    } else {
      return "/user-dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Acceso Denegado</CardTitle>
          <CardDescription>
            No tienes permisos para acceder a esta página
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            {session?.user ? (
              <p>
                Tu rol actual ({session.user.role.replace("_", " ")}) no tiene
                permisos para ver este contenido.
              </p>
            ) : (
              <p>Necesitas iniciar sesión para acceder a esta página.</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {session?.user ? (
              <Link href={getDashboardUrl()}>
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Ir al Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="w-full">Iniciar Sesión</Button>
              </Link>
            )}

            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ir al Inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
