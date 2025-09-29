"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Building2,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Languages,
  CalendarClock,
  UserCheck2,
  BriefcaseBusiness,
  Info,
  HelpCircle,
  Pencil,
  Users,
  Banknote,
  ArrowLeft,
  ShieldCheck,
  Tag,
} from "lucide-react";
import type { Speaker } from "@/modules/speaker/types";
import type { Currency } from "@/modules/common/types";
import SpeakerStatusBadge from "../../ui/speaker-status-badge";
import Link from "next/link";

const CURRENCY_SYMBOL: Record<Currency, string> = {
  PEN: "S/",
  USD: "$",
  EUR: "€",
} as any;

function formatMoney(value?: number, currency?: Currency) {
  if (value == null || currency == null) return "—";
  try {
    return `${CURRENCY_SYMBOL[currency] ?? ""}${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)}`;
  } catch {
    return `${value}`;
  }
}

function formatAudience(a?: { min?: number; max?: number }) {
  if (!a || (a.min == null && a.max == null)) return "—";
  if (a.min != null && a.max != null) return `${a.min}–${a.max}`;
  if (a.min != null) return `≥ ${a.min}`;
  return `≤ ${a.max}`;
}

function getInitials(fullname?: string) {
  if (!fullname) return "SP";
  const parts = fullname.trim().split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

function Stat({
  icon: Icon,
  label,
  value,
  help,
}: {
  icon: any;
  label: string;
  value: string | number;
  help?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-3">
      <div className="rounded-lg bg-muted p-2">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          {help ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/80" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  {help}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
        <span className="truncate text-base font-semibold">{value}</span>
      </div>
    </div>
  );
}

function EmptyHint({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center w-full">
      <Icon className="mb-2 h-6 w-6 text-muted-foreground" />
      <p className="text-sm font-medium">{title}</p>
      {desc ? (
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      ) : null}
    </div>
  );
}

interface Props {
  speaker: Speaker;
}

export default function SpeakerProfile({ speaker }: Props) {
  const fullname = speaker.person.fullName;
  const avatarUrl = "";
  const company = speaker.company;
  const status = speaker.entityStatus;

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/speakers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-24 w-full bg-gradient-to-r from-primary/15 via-primary/10 to-transparent" />

        <CardContent className="-mt-10 flex flex-col gap-4 px-6 pb-6 pt-0 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <Avatar className="h-20 w-20 ring-2 ring-background">
              <AvatarImage src={avatarUrl} alt={fullname} />
              <AvatarFallback className="text-base">
                {getInitials(fullname)}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold leading-tight">
                  {fullname}
                </h1>
                <SpeakerStatusBadge status={status} />
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {speaker.specialty ? (
                  <span className="inline-flex items-center gap-1">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {speaker.specialty}
                  </span>
                ) : null}

                {company?.name ? (
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {company.name}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {company?.id ? (
              <Link href={`/dashboard/companies/${company.id}`}>
                <Button variant="outline" className="cursor-pointer">
                  <Building2 className="mr-2 h-4 w-4" />
                  Ver empresa
                </Button>
              </Link>
            ) : null}
            <Link href={`/dashboard/speakers/${speaker.id}/edit`}>
              <Button className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={UserCheck2}
          label="Años de experiencia"
          value={speaker.yearsExperience ?? "—"}
          help="Experiencia profesional acumulada en su especialidad."
        />
        <Stat
          icon={Banknote}
          label="Tarifa por hora"
          value={formatMoney(speaker.hourlyRate, speaker.currency)}
          help="Tarifa de referencia para sesiones, workshops o charlas."
        />
        <Stat
          icon={Users}
          label="Audiencia ideal"
          value={formatAudience(speaker.audienceSize)}
          help="Tamaño de público sugerido para óptima dinámica de sesión."
        />
        <Stat
          icon={CalendarClock}
          label="Creado"
          value={
            speaker.createdAt
              ? new Date(speaker.createdAt).toLocaleDateString()
              : "—"
          }
          help="Fecha de alta del expositor en el sistema."
        />
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="expertise">Experiencia</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Biografía
              </CardTitle>
              <CardDescription>
                Resumen del perfil profesional del expositor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {speaker.biography ? (
                <p className="text-sm leading-6 text-foreground/90 whitespace-pre-wrap">
                  {speaker.biography}
                </p>
              ) : (
                <EmptyHint
                  icon={Info}
                  title="Sin biografía"
                  desc="Agrega una biografía para mejorar el contexto y la presentación."
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Empresa / Afiliciación
              </CardTitle>
              <CardDescription>
                Datos de la empresa con la que colabora el expositor.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {company ? (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{company.name}</span>
                    {(company.contactEmail || company.contactPhone) && (
                      <Separator orientation="vertical" className="h-4" />
                    )}
                    {company.contactEmail ? (
                      <a
                        href={`mailto:${company.contactEmail}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {company.contactEmail}
                      </a>
                    ) : null}
                    {company.contactPhone ? (
                      <a
                        href={`tel:${company.contactPhone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {company.contactPhone}
                      </a>
                    ) : null}
                  </div>
                </>
              ) : (
                <EmptyHint
                  icon={Building2}
                  title="Sin empresa asociada"
                  desc="Puedes vincular una empresa para mantener consistencia de marca y facturación."
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Notas internas
              </CardTitle>
              <CardDescription>
                Información visible solo para el equipo (no pública).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {speaker.notes ? (
                <p className="text-sm leading-6 text-foreground/90 whitespace-pre-wrap">
                  {speaker.notes}
                </p>
              ) : (
                <EmptyHint
                  icon={Info}
                  title="Sin notas"
                  desc="Agrega observaciones internas sobre condiciones, logística o preferencias."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expertise" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Idiomas
                </CardTitle>
                <CardDescription>
                  Lenguas en las que puede dictar.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {speaker.languages?.length ? (
                  speaker.languages.map((lang, i) => (
                    <Badge key={i} variant="secondary" className="capitalize">
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <EmptyHint
                    icon={Languages}
                    title="Sin idiomas registrados"
                    desc="Agrega idiomas para asignaciones internacionales."
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Certificaciones
                </CardTitle>
                <CardDescription>
                  Avales y formación complementaria.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {speaker.certifications?.length ? (
                  speaker.certifications.map((c, i) => (
                    <Badge key={i} variant="outline" className="capitalize">
                      {c}
                    </Badge>
                  ))
                ) : (
                  <EmptyHint
                    icon={ShieldCheck}
                    title="Sin certificaciones"
                    desc="Agrega certificaciones relevantes para potenciar la credibilidad."
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Temáticas
              </CardTitle>
              <CardDescription>Principales tópicos que domina.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {speaker.topics?.length ? (
                speaker.topics.map((t, i) => (
                  <Badge key={i} variant="default" className="capitalize">
                    {t}
                  </Badge>
                ))
              ) : (
                <EmptyHint
                  icon={Tag}
                  title="Sin temáticas registradas"
                  desc="Agrega tópicos para mejorar la búsqueda y el matching con eventos."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Redes y enlaces
              </CardTitle>
              <CardDescription>
                Canales de contacto público del expositor.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              {speaker.socialMedia?.website ? (
                <a
                  href={speaker.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Sitio web
                </a>
              ) : null}
              {speaker.socialMedia?.linkedin ? (
                <a
                  href={speaker.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              ) : null}
              {speaker.socialMedia?.twitter ? (
                <a
                  href={speaker.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Twitter className="h-4 w-4" />X / Twitter
                </a>
              ) : null}
              {speaker.socialMedia?.github ? (
                <a
                  href={speaker.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              ) : null}

              {!speaker.socialMedia?.website &&
              !speaker.socialMedia?.linkedin &&
              !speaker.socialMedia?.twitter &&
              !speaker.socialMedia?.github ? (
                <EmptyHint
                  icon={Globe}
                  title="Sin enlaces"
                  desc="Agrega redes o web para facilitar el contacto."
                />
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SpeakerProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-24 w-full animate-pulse bg-muted" />
        <CardContent className="-mt-10 flex flex-col gap-4 px-6 pb-6 pt-0 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-6 w-56 animate-pulse rounded bg-muted" />
              <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="h-9 w-24 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-xl border bg-muted/40"
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-56 animate-pulse rounded-xl border bg-muted/40" />
        <div className="h-56 animate-pulse rounded-xl border bg-muted/40" />
      </div>

      <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  );
}
