"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Building2, Mail, Phone, MapPin, Percent, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Company,
  companyCreateSchema,
  companyTypeEnum,
  companyUpdateSchema,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "@/modules/company";
import { CompaniesClient } from "@/modules/company/client";
import { CompanyTypeLabels } from "@/modules/company/contants";
import { useRouter } from "next/navigation";

type Props = {
  mode: "create" | "edit";
  defaultValues?: Partial<Company>;
  id?: string;
};

export function CompanyForm({ mode, defaultValues, id }: Props) {
  const route = useRouter();

  const schema = mode === "create" ? companyCreateSchema : companyUpdateSchema;

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      type: (defaultValues?.type as any) ?? "corporate",
      description: defaultValues?.description ?? "",
      contactEmail: defaultValues?.contactEmail ?? "",
      contactPhone: defaultValues?.contactPhone ?? "",
      address: {
        street: defaultValues?.address?.street ?? "",
        city: defaultValues?.address?.city ?? "",
        state: defaultValues?.address?.state ?? "",
        country: defaultValues?.address?.country ?? "",
        zipCode: defaultValues?.address?.zipCode ?? "",
      },
      commissionRate: defaultValues?.commissionRate ?? 0,
      settings: {
        canUploadSpeakers: defaultValues?.settings?.canUploadSpeakers ?? false,
        canCreateEvents: defaultValues?.settings?.canCreateEvents ?? false,
        maxEventsPerMonth: defaultValues?.settings?.maxEventsPerMonth ?? 0,
      },
    },
    mode: "onBlur",
  });

  const type = useWatch({ control: form.control, name: "type" });
  const isSponsor = type === "sponsor";
  const canCreateEvents = useWatch({
    control: form.control,
    name: "settings.canCreateEvents",
  });

  const onSubmit = async (values: any) => {
    try {
      if (mode === "create") {
        await CompaniesClient.create(values as CreateCompanyRequest);
        toast.success("Empresa creada correctamente");
        route.push("/dashboard/companies");
      } else if (id) {
        await CompaniesClient.update(id, values as UpdateCompanyRequest);
        toast.success("Cambios guardados");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "No se pudo guardar");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Section
          title="Identidad de la empresa"
          description="Define el nombre público, tipo y una breve descripción para contextualizar su actividad."
          icon={<Building2 className="h-5 w-5" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tipo <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companyTypeEnum.options.map((t) => (
                        <SelectItem key={t} value={t}>
                          {CompanyTypeLabels[t] ?? t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Describe brevemente la empresa y su propósito…"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Máximo 300–400 caracteres. Útil para perfiles y listados.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>
        <Section
          title="Datos de contacto"
          description="Información para comunicación."
          icon={<Info className="h-5 w-5" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-8"
                        type="email"
                        inputMode="email"
                        placeholder="empresa@dominio.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-8"
                        inputMode="tel"
                        placeholder="+51 999 999 999"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>
        <Section
          title="Dirección fiscal / comercial"
          description="Ubicación de referencia para facturación, envíos o perfil público."
          icon={<MapPin className="h-5 w-5" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem className="md:col-span-8">
                  <FormLabel>Calle</FormLabel>
                  <FormControl>
                    <Input placeholder="Av. Siempre Viva 742" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem className="md:col-span-4">
                  <FormLabel>Código postal</FormLabel>
                  <FormControl>
                    <Input placeholder="00000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="md:col-span-4">
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ciudad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="md:col-span-4">
                  <FormLabel>Estado / Provincia</FormLabel>
                  <FormControl>
                    <Input placeholder="Provincia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem className="md:col-span-4">
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="Perú" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>
        <Section
          title="Reglas y capacidades"
          description="Controla la comisión y lo que la empresa puede hacer dentro de la plataforma."
          icon={<Percent className="h-5 w-5" />}
        >
          <div className="grid gap-4">
            {!isSponsor && (
              <>
                <FormField
                  control={form.control}
                  name="settings.canCreateEvents"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between border rounded-lg p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="m-0">
                          Permitir creación de eventos
                        </FormLabel>
                        <FormDescription>
                          Habilita módulos de eventos, equipo y ventas.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="settings.maxEventsPerMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eventos por mes</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder={canCreateEvents ? "p. ej. 10" : "—"}
                          disabled={!canCreateEvents}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Límite para controlar carga operativa.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="settings.canUploadSpeakers"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border rounded-lg p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="m-0">
                      Permitir subir ponentes
                    </FormLabel>
                    <FormDescription>
                      Podrán gestionar perfiles de speakers para eventos.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Section>
        <div className="h-20" /> {/* espacio para la barra sticky */}
        {/* Barra de acciones sticky */}
        <div className="fixed inset-x-0 bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="mx-auto max-w-screen-xl px-4 py-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <Info className="h-4 w-4" />
              Revisa los datos antes de guardar. Puedes editar todo luego.
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => history.back()}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {mode === "create" ? "Crear empresa" : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
          <div>
            <h2 className="text-base font-semibold leading-none">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <Separator />
        {children}
      </CardContent>
    </Card>
  );
}
