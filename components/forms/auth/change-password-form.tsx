"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";

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
import { ChangePasswordFormData, changePasswordSchema } from "@/modules/auth";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const watchedNewPassword = watch("newPassword");

  const passwordStrength = useMemo(() => {
    const p = watchedNewPassword || "";
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
  }, [watchedNewPassword]);

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error("Error", {
          description: result?.message || "Error al cambiar la contraseña",
        });
        return;
      }

      toast.success("Contraseña actualizada", {
        description: "Tu contraseña ha sido cambiada correctamente.",
      });
      reset();
    } catch {
      toast.error("Error inesperado", {
        description:
          "Ocurrió un error al procesar tu solicitud. Intenta nuevamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <Card className="w-full max-w-xl border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            Cambiar Contraseña
          </CardTitle>
          <CardDescription>
            Actualiza tu contraseña para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contraseña actual */}
            <FormField
              control={control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Tu contraseña actual"
                        className="pl-10 pr-10"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={
                          showCurrentPassword
                            ? "Ocultar contraseña actual"
                            : "Mostrar contraseña actual"
                        }
                        disabled={isSubmitting}
                      >
                        {showCurrentPassword ? (
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

            <FormField
              control={control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Tu nueva contraseña"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={
                          showNewPassword
                            ? "Ocultar nueva contraseña"
                            : "Mostrar nueva contraseña"
                        }
                        disabled={isSubmitting}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Barra de fuerza */}
                  {watchedNewPassword ? (
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

            <FormField
              control={control}
              name="confirmNewPassword"
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
              Cambiar contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
