"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { User, Shield, Settings, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { user } = session;

  const completenessChecks = [
    { label: "Email verificado", completed: user.emailVerified },
    {
      label: "Nombre completo",
      completed: !!(user.person?.firstName && user.person?.lastName),
    },
    { label: "Información de contacto", completed: !!user.person?.phone },
  ];

  const completedCount = completenessChecks.filter(
    (check) => check.completed
  ).length;
  const completenessPercent = Math.round(
    (completedCount / completenessChecks.length) * 100
  );

  const accountSections = [
    {
      title: "Información Personal",
      description: "Administra tu perfil y datos personales",
      icon: User,
      href: "/dashboard/account/personal-info",
      badge:
        user.person?.firstName && user.person?.lastName ? null : "Incompleto",
      badgeVariant: "secondary" as const,
    },
    {
      title: "Seguridad",
      description:
        "Contraseña, verificación de email y configuración de seguridad",
      icon: Shield,
      href: "/dashboard/account/security",
      badge: user.emailVerified ? "Verificado" : "Pendiente",
      badgeVariant: user.emailVerified
        ? ("default" as const)
        : ("destructive" as const),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mi Cuenta</h1>
        <p className="text-muted-foreground">
          Administra tu información personal y configuración de seguridad
        </p>
      </div>

      {/* Account Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Resumen de la Cuenta</CardTitle>
              <CardDescription>
                Estado actual de tu perfil y configuración
              </CardDescription>
            </div>
            <Badge
              variant={completenessPercent === 100 ? "default" : "secondary"}
            >
              {completenessPercent}% Completo
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-lg font-medium">
                {user.person?.firstName} {user.person?.lastName}
              </h3>
              <p className="text-muted-foreground">{user.email}</p>
              {user.company && (
                <p className="text-sm text-muted-foreground">
                  {user.company.name}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Completitud del perfil</h4>
              <span className="text-sm text-muted-foreground">
                {completenessPercent}%
              </span>
            </div>
            <Progress value={completenessPercent} className="h-2" />

            <div className="space-y-2">
              {completenessChecks.map((check, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      check.completed ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                  <span
                    className={
                      check.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        {accountSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {section.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {section.badge && (
                        <Badge variant={section.badgeVariant}>
                          {section.badge}
                        </Badge>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
