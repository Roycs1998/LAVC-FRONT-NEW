"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
  InvitationClient,
  InvitationValidation,
  acceptInvitationSchema,
  AcceptInvitationFormData,
} from "@/modules/invitation";
import { z } from "zod";

interface InvitationPageProps {
  params: Promise<{ code: string }>;
}

export default function InvitationPage({ params }: InvitationPageProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [code, setCode] = useState<string>("");
  const [validation, setValidation] = useState<InvitationValidation | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);

  const form = useForm<AcceptInvitationFormData>({
    resolver: zodResolver(acceptInvitationSchema),
    defaultValues: {
      acceptWithAuth: false,
      userData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      },
    },
  });

  useEffect(() => {
    params.then((p) => setCode(p.code));
  }, [params]);

  useEffect(() => {
    const validateInvitation = async () => {
      if (!code) return;

      try {
        const data = await InvitationClient.validateInvitation(code);
        setValidation(data);
      } catch (error: any) {
        toast.error("Error al validar la invitación");
        setValidation({ isValid: false });
      } finally {
        setIsValidating(false);
      }
    };

    if (code) {
      validateInvitation();
    }
  }, [code]);

  const onSubmit = async (data: AcceptInvitationFormData) => {
    setIsAccepting(true);
    try {
      const payload = session
        ? { acceptWithAuth: true }
        : {
            acceptWithAuth: false,
            userData: data.userData,
          };

      const result = await InvitationClient.acceptInvitation(code, payload);

      toast.success("¡Invitación aceptada exitosamente!");

      // If new user was created, redirect to login or dashboard
      if (result.accessToken) {
        // Store token and redirect
        router.push("/dashboard/my-tickets");
      } else {
        router.push("/dashboard/my-tickets");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al aceptar la invitación");
    } finally {
      setIsAccepting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3">Validando invitación...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!validation?.isValid) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="h-6 w-6 text-destructive" />
              <CardTitle>Invitación Inválida</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                Esta invitación no es válida o ha expirado. Por favor, contacta al
                organizador del evento.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <CardTitle>Invitación Válida</CardTitle>
          </div>
          <CardDescription>
            Has sido invitado a: <strong>{validation.invitation?.event.title}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Estás autenticado como <strong>{session.user?.email}</strong>
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => onSubmit({ acceptWithAuth: true })}
                disabled={isAccepting}
                className="w-full"
              >
                {isAccepting ? "Aceptando..." : "Aceptar Invitación"}
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Completa el formulario para crear tu cuenta y aceptar la invitación
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="userData.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="userData.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="userData.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userData.password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userData.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isAccepting} className="w-full">
                  {isAccepting ? "Creando cuenta..." : "Crear Cuenta y Aceptar"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
