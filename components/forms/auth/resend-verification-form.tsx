"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export function ResendVerificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { data: session } = useSession();

  const handleResend = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error", {
          description:
            result.message || "Error al enviar el email de verificación",
        });
      } else {
        setIsSent(true);
        toast.success("Email enviado", {
          description: "Te hemos enviado un nuevo email de verificación.",
        });
      }
    } catch (error) {
      console.error("Error en resend verification:", error);
      toast.error("Error inesperado", {
        description: "Ocurrió un error al enviar el email. Intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Email enviado</CardTitle>
          <CardDescription>
            Te hemos enviado un nuevo email de verificación a{" "}
            <strong>{session?.user?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Revisa tu bandeja de entrada y también tu carpeta de spam.
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ir al Login
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => setIsSent(false)}
              className="flex-1"
            >
              Reenviar otro
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Reenviar Verificación
        </CardTitle>
        <CardDescription className="text-center">
          Te enviaremos un nuevo email para verificar tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {session?.user && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{session.user.email}</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.emailVerified
                    ? "Verificado"
                    : "Pendiente de verificación"}
                </p>
              </div>
            </div>
          </div>
        )}

        {session?.user?.emailVerified ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Tu email ya está verificado. No necesitas hacer nada más.
            </p>
            <Link href="/user-dashboard">
              <Button className="w-full">Ir al Dashboard</Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground text-center">
              Si no has recibido el email de verificación o ha expirado, puedes
              solicitar uno nuevo.
            </p>

            <Button
              onClick={handleResend}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reenviar Email de Verificación
            </Button>
          </>
        )}

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline inline-flex items-center"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Volver al login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
