"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { ForgotPasswordFormData, forgotPasswordSchema } from "@/modules/auth";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error", {
          description: result?.message || "Ocurrió un error al enviar el email",
        });
        return;
      }

      setIsSubmitted(true);
      toast.success("Email enviado", {
        description:
          "Te hemos enviado las instrucciones para restablecer tu contraseña.",
      });
    } catch {
      toast.error("Error inesperado", {
        description:
          "Ocurrió un error al procesar tu solicitud. Intenta nuevamente.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md border">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Email enviado</CardTitle>
          <CardDescription>
            Te hemos enviado las instrucciones para restablecer tu contraseña a{" "}
            <strong>{getValues("email")}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Si no recibes el email en los próximos minutos, revisa tu carpeta de
            spam.
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al login
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => setIsSubmitted(false)}
              className="flex-1"
            >
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <Card className="w-full max-w-md border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            ¿Olvidaste tu contraseña?
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tu email y te enviaremos las instrucciones para
            restablecerla
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        autoComplete="email"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar instrucciones
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Volver al login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
