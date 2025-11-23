"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Building2, MapPin, Percent, Info } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

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
import FormSection from "@/components/common/form-section";
import FormText from "@/components/common/form-text";
import FormSelect from "@/components/common/form-select";
import FormArea from "@/components/common/form-area";
import FormPhone from "@/components/common/form-phone";

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
        route.push(`/dashboard/companies/${id}`);
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "No se pudo guardar");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSection
          title="Identidad de la empresa"
          description="Define el nombre público, tipo y una breve descripción para contextualizar su actividad."
          icon={<Building2 className="h-5 w-5" />}
        >
          <FormText
            name="name"
            label="Nombre"
            placeholder="Acme Inc."
            control={form.control}
            required
          />

          <FormSelect
            name="type"
            label="Tipo"
            placeholder="Selecciona un tipo"
            control={form.control}
            data={companyTypeEnum.options.map((t) => ({
              label: CompanyTypeLabels[t] ?? t,
              value: t,
            }))}
            required
          />

          <FormArea
            name="description"
            label="Descripción"
            placeholder="Describe brevemente la empresa y su propósito…"
            description="Máximo 300-400 caracteres. Útil para perfiles y listados."
            control={form.control}
            className="md:col-span-2"
          />
        </FormSection>

        <FormSection
          title="Datos de contacto"
          description="Información para comunicación."
          icon={<Info className="h-5 w-5" />}
        >
          <FormText
            name="contactEmail"
            label="Correo"
            placeholder="empresa@dominio.com"
            control={form.control}
            type="email"
          />

          <FormPhone
            name="contactPhone"
            label="Teléfono"
            placeholder="Ingresa un número de teléfono"
            defaultCountry="PE"
            control={form.control}
          />
        </FormSection>

        <FormSection
          title="Dirección fiscal / comercial"
          description="Ubicación de referencia para facturación, envíos o perfil público."
          icon={<MapPin className="h-5 w-5" />}
        >
          <FormText
            control={form.control}
            name="address.street"
            label="Calle"
            placeholder="Av. Siempre Viva 742"
            className="md:col-span-2"
          />

          <FormText
            control={form.control}
            name="address.zipCode"
            label="Código postal"
            placeholder="00000"
            className="md:col-span-2"
            type="number"
          />

          <FormText
            control={form.control}
            name="address.city"
            label="Ciudad"
            placeholder="Ciudad"
            className="md:col-span-2"
          />

          <FormText
            control={form.control}
            name="address.state"
            label="Estado / Provincia"
            placeholder="Provincia"
            className="md:col-span-2"
          />

          <FormText
            control={form.control}
            name="address.country"
            label="País"
            placeholder="País"
            className="md:col-span-2"
          />
        </FormSection>

        <FormSection
          title="Reglas y capacidades"
          description="Controla la comisión y lo que la empresa puede hacer dentro de la plataforma."
          icon={<Percent className="h-5 w-5" />}
        >
          {!isSponsor && (
            <>
              <FormField
                control={form.control}
                name="settings.canCreateEvents"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border rounded-lg p-3 md:col-span-2">
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

              <FormText
                control={form.control}
                name="settings.maxEventsPerMonth"
                label="Eventos por mes"
                placeholder="Ejm. 10"
                disabled={!canCreateEvents}
                type="number"
                className="md:col-span-2"
              />
            </>
          )}

          <FormField
            control={form.control}
            name="settings.canUploadSpeakers"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between border rounded-lg p-3 md:col-span-2">
                <div className="space-y-0.5">
                  <FormLabel className="m-0">Permitir subir ponentes</FormLabel>
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
        </FormSection>

        <div className="h-20" />

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
