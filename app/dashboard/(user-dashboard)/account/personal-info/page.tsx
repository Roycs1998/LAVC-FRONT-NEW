"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  Camera,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  UpdateProfileFormData,
  updateProfileSchema,
} from "@/modules/user/schema";

export default function PersonalInfoPage() {
  const { data: session, update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: session?.user?.person?.firstName || "",
      lastName: session?.user?.person?.lastName || "",
      email: session?.user?.email || "",
      phone: session?.user?.person?.phone || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error al actualizar", {
          description: result.message || "No se pudo actualizar tu información",
        });
        return;
      }

      await updateSession();

      toast.success("Perfil actualizado", {
        description:
          "Tu información personal ha sido actualizada correctamente.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error inesperado", {
        description:
          "Ocurrió un error al actualizar tu información. Intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/account">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Información Personal
          </h1>
          <p className="text-muted-foreground">
            Administra tu información personal y de contacto
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Foto de Perfil</span>
            </CardTitle>
            <CardDescription>
              Tu foto de perfil se muestra en toda la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <button className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">
                  {user.person?.firstName} {user.person?.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Haz click para cambiar tu foto
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal. Esta información será visible
                para otros usuarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu apellido" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                          {user.emailVerified ? (
                            <Badge variant="default" className="text-xs">
                              Verificado
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs">
                              Sin verificar
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        {!user.emailVerified && (
                          <p className="text-xs text-muted-foreground">
                            Para cambiar tu email, primero debes verificar el
                            actual.{" "}
                            <Link
                              href="/resend-verification"
                              className="text-primary hover:underline"
                            >
                              Reenviar verificación
                            </Link>
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Teléfono</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+51 999 999 999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {user.company && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Información de la Empresa</span>
                </CardTitle>
                <CardDescription>
                  Información de la empresa a la que perteneces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre de la Empresa</Label>
                  <Input value={user.company.name} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Badge
                    variant={
                      user.company.entityStatus === "ACTIVE"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {user.company.entityStatus}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Para cambiar la información de la empresa, contacta a tu
                  administrador.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
