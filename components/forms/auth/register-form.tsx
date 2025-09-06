"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RegisterFormData, registerSchema } from "@/modules/auth";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting },
  } = form;

  const watchedPassword = watch("password");
  const watchedTerms = watch("terms");

  const passwordStrength = useMemo(() => {
    const password = watchedPassword || "";
    if (!password) return { strength: 0, text: "", tw: "" };

    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || undefined,
      };

      await axios.post("/api/auth/register", payload);

      toast.success("¡Registro exitoso!", {
        description:
          "Tu cuenta ha sido creada correctamente. Revisa tu email para verificar tu cuenta.",
      });

      setTimeout(() => router.push("/login"), 1200);
    } catch (error) {
      const err = error as AxiosError<{ message?: string; errors?: any[] }>;

      toast.error("Error en el registro", {
        description:
          err.response?.data?.message ||
          "Ocurrió un error al procesar tu solicitud. Intenta nuevamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <Card className="w-full max-w-xl shadow-sm border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-center">
            Completa el formulario para crear tu cuenta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre / Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                        <Input
                          placeholder="Tu nombre"
                          className="pl-10"
                          autoComplete="given-name"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                        <Input
                          placeholder="Tu apellido"
                          className="pl-10"
                          autoComplete="family-name"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
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

            {/* Teléfono */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono (opcional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type="tel"
                        placeholder="+51 999 999 999"
                        className="pl-10"
                        autoComplete="tel"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Incluye el código de país si aplica.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
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

            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirma tu contraseña"
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

            {/* Términos */}
            <FormField
              control={control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-3 rounded-lg p-3 border bg-card/30">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={(v) => field.onChange(Boolean(v))}
                        disabled={isSubmitting}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <p className="text-sm text-muted-foreground">
                        Acepto los{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          términos y condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          política de privacidad
                        </Link>
                        .
                      </p>
                      <FormDescription className="text-xs">
                        Debes aceptarlos para crear tu cuenta.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* CTA */}
            <Button
              type="submit"
              className="w-full h-10"
              disabled={isSubmitting || !watchedTerms}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crear Cuenta
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
              </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
