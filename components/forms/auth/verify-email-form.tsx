"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

type VerificationStatus = "loading" | "success" | "error" | "invalid";

export function VerifyEmailForm() {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setMessage("Token de verificación no válido");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const result = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(result.message || "Email verificado correctamente");
          toast.success("Email verificado", {
            description: "Tu email ha sido verificado correctamente.",
          });
        } else {
          setStatus("error");
          setMessage(result.message || "Error al verificar el email");
          toast.error("Error de verificación", {
            description: result.message || "Error al verificar el email",
          });
        }
      } catch (error) {
        console.error("Error en verify email:", error);
        setStatus("error");
        setMessage("Error inesperado al verificar el email");
        toast.error("Error inesperado", {
          description: "Ocurrió un error al verificar tu email.",
        });
      }
    };

    verifyEmail();
  }, [token, toast]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-8 w-8 animate-spin text-primary" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "error":
      case "invalid":
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Mail className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "bg-primary/10";
      case "success":
        return "bg-green-100";
      case "error":
      case "invalid":
        return "bg-red-100";
      default:
        return "bg-muted";
    }
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Verificando email...";
      case "success":
        return "¡Email verificado!";
      case "error":
        return "Error de verificación";
      case "invalid":
        return "Enlace inválido";
      default:
        return "Verificación de email";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div
          className={`mx-auto h-16 w-16 ${getStatusColor()} rounded-full flex items-center justify-center mb-4`}
        >
          {getStatusIcon()}
        </div>
        <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "loading" && (
          <p className="text-center text-muted-foreground">
            Por favor espera mientras verificamos tu email...
          </p>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Tu cuenta ha sido verificada correctamente. Ahora puedes acceder a
              todas las funcionalidades de la plataforma.
            </p>
            <Link href="/login">
              <Button className="w-full">Iniciar Sesión</Button>
            </Link>
          </div>
        )}

        {(status === "error" || status === "invalid") && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              {status === "invalid"
                ? "El enlace de verificación no es válido o ha expirado."
                : "Ocurrió un error al verificar tu email. Intenta nuevamente."}
            </p>
            <div className="flex gap-2">
              <Link href="/resend-verification" className="flex-1">
                <Button variant="outline" className="w-full">
                  Reenviar verificación
                </Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button className="w-full">Ir al Login</Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
