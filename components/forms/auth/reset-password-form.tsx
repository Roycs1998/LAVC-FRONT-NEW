"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Loader2, CheckCircle } from "lucide-react";

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
  FormDescription,
} from "@/components/ui/form";

import { ResetPasswordFormData, resetPasswordSchema } from "@/modules/auth";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const watchedPassword = watch("password");

  const passwordStrength = useMemo(() => {
    const p = watchedPassword || "";
    if (!p) return { strength: 0, text: "", tw: "" };

    const checks = [
      p.length >= 8,
      /[a-z]/.test(p),
      /[A-Z]/.test(p),
      /\d/.test(p),
      /[!@#$%^&*(),.?":{}|<>]/.test(p),
    ];
    const score = checks.filter(Boolean).length;

    const map: Record<number, { text: string; tw: string }> = {
      0: { text: "", tw: "" },
      1: { text: "Muy débil", tw: "bg-red-500" },
      2: { text: "Débil", tw: "bg-orange-500" },
      3: { text: "Regular", tw: "bg-yellow-500" },
      4: { text: "Fuerte", tw: "bg-green-500" },
      5: { text: "Muy fuerte", tw: "bg-green-600" },
    };

    return { strength: score, ...map[score] };
  }, [watchedPassword]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error("Error", {
          description: result?.message || "Error al restablecer la contraseña",
        });
        return;
      }

      setIsSuccess(true);
      toast.success("Contraseña restablecida", {
        description: "Tu contraseña ha sido restablecida correctamente.",
      });
    } catch {
      toast.error("Error inesperado", {
        description:
          "Ocurrió un error al procesar tu solicitud. Intenta nuevamente.",
      });
    }
  };

  // Estado: token inválido/ausente
  if (!token) {
    return (
      <Card className="w-full max-w-md border">
        <CardHeader className="text-center">
          <CardTitle>Token inválido</CardTitle>
          <CardDescription>
            El enlace de restablecimiento es inválido o ha expirado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/forgot-password">
            <Button className="w-full">Solicitar nuevo enlace</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Estado: éxito
  if (isSuccess) {
    return (
      <Card className="w-full max-w-md border">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>¡Contraseña restablecida!</CardTitle>
          <CardDescription>
            Ahora puedes iniciar sesión con tu nueva contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button className="w-full">Ir al login</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Form
  return (
    <Form {...form}>
      <Card className="w-full max-w-md border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            Restablecer contraseña
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tu nueva contraseña
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Token oculto (si tu schema lo requiere como field) */}
            <FormField
              control={control}
              name="token"
              render={({ field }) => <input type="hidden" {...field} />}
            />

            {/* Password */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu nueva contraseña"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Barra de fuerza */}
                  {watchedPassword ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted/70 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${passwordStrength.tw}`}
                            style={{
                              width: `${
                                (passwordStrength.strength / 5) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground min-w-20 text-right">
                          {passwordStrength.text}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <FormDescription>
                    Usa 8+ caracteres con mayúsculas, minúsculas, números y un
                    símbolo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirma tu nueva contraseña"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={
                          showConfirmPassword
                            ? "Ocultar confirmación de contraseña"
                            : "Mostrar confirmación de contraseña"
                        }
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Restablecer contraseña
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline"
              >
                Volver al login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
