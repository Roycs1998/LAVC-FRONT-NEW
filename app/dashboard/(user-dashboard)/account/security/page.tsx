"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Shield,
  Lock,
  Mail,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ChangePasswordFormData, changePasswordSchema } from "@/modules/auth";

export default function SecurityPage() {
  const { data: session } = useSession();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      confirmNewPassword: "",
      newPassword: "",
    },
  });

  const watchedNewPassword = form.watch("newPassword");

  const onSubmitPasswordChange = async (data: ChangePasswordFormData) => {
    setIsChangingPassword(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error al cambiar contraseña", {
          description: result.message || "No se pudo cambiar tu contraseña",
        });
        return;
      }

      toast.success("Contraseña actualizada", {
        description: "Tu contraseña ha sido cambiada correctamente.",
      });

      form.reset();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error inesperado", {
        description:
          "Ocurrió un error al cambiar tu contraseña. Intenta nuevamente.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResendingVerification(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error al enviar verificación", {
          description:
            result.message || "No se pudo enviar el email de verificación",
        });
        return;
      }

      toast.success("Email de verificación enviado", {
        description: "Revisa tu bandeja de entrada y carpeta de spam.",
      });
    } catch (error) {
      console.error("Error resending verification:", error);
      toast.error("Error inesperado", {
        description:
          "Ocurrió un error al enviar la verificación. Intenta nuevamente.",
      });
    } finally {
      setIsResendingVerification(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength = Object.values(checks).filter(Boolean).length;

    const strengthLevels = {
      0: { text: "", color: "" },
      1: { text: "Muy débil", color: "bg-red-500" },
      2: { text: "Débil", color: "bg-orange-500" },
      3: { text: "Regular", color: "bg-yellow-500" },
      4: { text: "Fuerte", color: "bg-green-500" },
      5: { text: "Muy fuerte", color: "bg-green-600" },
    };

    return {
      strength,
      ...strengthLevels[strength as keyof typeof strengthLevels],
    };
  };

  const passwordStrength = getPasswordStrength(watchedNewPassword || "");

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { user } = session;

  // Calculate security score
  const securityChecks = [
    { label: "Email verificado", completed: user.emailVerified, weight: 40 },
    {
      label: "Información personal completa",
      completed: !!(user.person?.firstName && user.person?.lastName),
      weight: 30,
    },
    { label: "Teléfono agregado", completed: !!user.person?.phone, weight: 30 },
  ];

  const totalScore = securityChecks.reduce(
    (acc, check) => acc + (check.completed ? check.weight : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/account">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Seguridad</h1>
          <p className="text-muted-foreground">
            Administra tu seguridad y configuración de acceso
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Security Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Seguridad de la Cuenta</span>
            </CardTitle>
            <CardDescription>
              Estado actual de la seguridad de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Security Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Puntuación de seguridad
                </span>
                <Badge
                  variant={
                    totalScore === 100
                      ? "default"
                      : totalScore >= 70
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {totalScore}%
                </Badge>
              </div>
              <Progress value={totalScore} className="h-2" />
            </div>

            {/* Security Checklist */}
            <div className="space-y-3">
              {securityChecks.map((check, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {check.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                  <span
                    className={`text-sm ${
                      check.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {check.label}
                  </span>
                </div>
              ))}
            </div>

            {totalScore < 100 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Completa los elementos faltantes para mejorar la seguridad de
                  tu cuenta.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Verificación de Email</span>
              </CardTitle>
              <CardDescription>
                Estado de verificación de tu dirección de email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{user.email}</p>
                  <div className="flex items-center space-x-2">
                    {user.emailVerified ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge variant="default">Verificado</Badge>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <Badge variant="destructive">Sin verificar</Badge>
                      </>
                    )}
                  </div>
                </div>

                {!user.emailVerified && (
                  <Button
                    onClick={handleResendVerification}
                    disabled={isResendingVerification}
                    size="sm"
                  >
                    {isResendingVerification && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Reenviar verificación
                  </Button>
                )}
              </div>

              {!user.emailVerified && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Tu email no está verificado. Algunas funciones pueden estar
                    limitadas hasta que verifiques tu dirección de email.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Cambiar Contraseña</span>
              </CardTitle>
              <CardDescription>
                Actualiza tu contraseña para mantener tu cuenta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitPasswordChange)}
                  className="space-y-4"
                >
                  {/* Current Password */}
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña Actual</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Tu contraseña actual"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

                  {/* New Password */}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Tu nueva contraseña"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        {/* Password Strength Indicator */}
                        {watchedNewPassword && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                  style={{
                                    width: `${
                                      (passwordStrength.strength / 5) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground">
                                {passwordStrength.text}
                              </span>
                            </div>
                          </div>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm New Password */}
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirma tu nueva contraseña"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isChangingPassword}>
                      {isChangingPassword && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Cambiar Contraseña
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
