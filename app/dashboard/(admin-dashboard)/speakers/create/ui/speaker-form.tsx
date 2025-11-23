"use client";
import { useMemo } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Speaker } from "@/modules/speaker/types";
import {
  SpeakerCreateInput,
  speakerCreateSchema,
  SpeakerUpdateInput,
  speakerUpdateSchema,
} from "@/modules/speaker/schema";

import { SpeakersClient } from "@/modules/speaker/client";
import { ArrayField } from "@/components/common/array-field";
import { deepClean } from "@/modules/common/utils/clean";
import { Company } from "@/modules/company";

import FormText from "@/components/common/form-text";
import FormArea from "@/components/common/form-area";
import FormSection from "@/components/common/form-section";
import FormPhone from "@/components/common/form-phone";
import { useSession } from "next-auth/react";
import { UserRole } from "@/modules/user";
import FormSelect from "@/components/common/form-select";

type Props = {
  mode: "create" | "edit";
  defaultValues?: Partial<Speaker>;
  id?: string;
  companies?: Company[];
  defaultCompanyId?: string;
};

export function SpeakerForm({
  mode,
  defaultValues,
  id,
  companies,
  defaultCompanyId,
}: Props) {
  const schema = mode === "create" ? speakerCreateSchema : speakerUpdateSchema;
  const router = useRouter();

  const { data: session } = useSession();

  const flatDefaults = useMemo(() => {
    return {
      firstName: defaultValues?.person?.firstName ?? "",
      lastName: defaultValues?.person?.lastName ?? "",
      email: defaultValues?.person?.email ?? "",
      phone: defaultValues?.person?.phone ?? "",
      companyId: (defaultCompanyId || defaultValues?.company?.id) ?? "",
      specialty: defaultValues?.specialty ?? "",
      biography: defaultValues?.biography ?? "",
      yearsExperience: defaultValues?.yearsExperience ?? 0,
      certifications: defaultValues?.certifications?.length
        ? defaultValues.certifications
        : [""],
      hourlyRate: defaultValues?.hourlyRate ?? 0,
      languages: defaultValues?.languages?.length
        ? defaultValues.languages
        : [""],
      topics: defaultValues?.topics?.length ? defaultValues.topics : [""],
      socialMedia: {
        linkedin: defaultValues?.socialMedia?.linkedin ?? "",
        twitter: defaultValues?.socialMedia?.twitter ?? "",
        website: defaultValues?.socialMedia?.website ?? "",
        github: defaultValues?.socialMedia?.github ?? "",
      },
      audienceSize: {
        min: defaultValues?.audienceSize?.min ?? 0,
        max: defaultValues?.audienceSize?.max ?? 100,
      },
      notes: defaultValues?.notes ?? "",
      currency: defaultValues?.currency ?? "PEN",
    } as SpeakerCreateInput | SpeakerUpdateInput;
  }, [defaultValues]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: flatDefaults,
  });

  const onSubmit = async (values: SpeakerCreateInput | SpeakerUpdateInput) => {
    try {
      const cleaned = deepClean(values);

      if (mode === "create") {
        await SpeakersClient.create(cleaned);
        toast.success("Expositor creado");
        router.push("/dashboard/speakers");
      } else if (id) {
        await SpeakersClient.update(id, cleaned);
        toast.success("Cambios guardados");
        router.push(`/dashboard/speakers/${id}`);
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "No se pudo guardar");
    }
  };

  return (
    <Form {...form}>
      <form
        className="gap-6 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormSection
          title="Identidad del expositor"
          description="Completa los datos principales del expositor."
        >
          <FormText
            name="firstName"
            label="Nombre"
            placeholder="Ingresar nombre"
            control={form.control}
            required
          />
          <FormText
            name="lastName"
            label="Apellido"
            placeholder="Ingresar apellido"
            control={form.control}
            required
          />

          <FormPhone
            name="phone"
            label="Teléfono"
            placeholder="Número de teléfono"
            control={form.control}
            defaultCountry="PE"
          />

          <FormText
            name="email"
            label="Correo"
            placeholder="Ingresar correo"
            control={form.control}
            type="email"
          />

          {session?.user?.roles.includes(UserRole.PLATFORM_ADMIN) && (
            <FormSelect
              name="companyId"
              label="Empresa"
              placeholder="Selecciona una empresa"
              control={form.control}
              data={companies?.map((company) => ({
                label: company.name,
                value: company.id,
              }))}
              required
            />
          )}
        </FormSection>

        <FormSection
          title="Perfil profesional"
          description="Especialidad, experiencia y contenidos."
        >
          <FormText
            name="specialty"
            label="Especialidad"
            placeholder="Ejm: Cardiología"
            control={form.control}
          />

          <FormText
            name="yearsExperience"
            label="Años de experiencia"
            placeholder="5"
            control={form.control}
            type="number"
          />

          <FormText
            name="hourlyRate"
            label="Tarifa por hora"
            placeholder="100"
            control={form.control}
            type="number"
          />

          <FormSelect
            name="currency"
            label="Moneda"
            placeholder="PEN"
            control={form.control}
            data={[
              { label: "Soles (PEN)", value: "PEN" },
              { label: "Dólares (USD)", value: "USD" },
              { label: "Euros (EUR)", value: "EUR" },
            ]}
          />

          <FormArea
            name="biography"
            label="Biografía"
            placeholder="Resumen profesional..."
            control={form.control}
            className="col-span-1 md:col-span-2"
          />

          <ArrayField
            control={form.control}
            name="languages"
            label="Idiomas"
            placeholder="Ejm: Español"
          />

          <ArrayField
            control={form.control}
            name="topics"
            label="Temas"
            placeholder="Ejm: Hepatología"
          />

          <ArrayField
            control={form.control}
            name="certifications"
            label="Certificaciones"
            placeholder="Ejm: ACLS"
          />
        </FormSection>

        <FormSection
          title="Redes y audiencia"
          description="Enlaces y alcance estimado."
        >
          <FormText
            name="socialMedia.linkedin"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/..."
            control={form.control}
          />
          <FormText
            name="socialMedia.twitter"
            label="Twitter/X"
            placeholder="https://twitter.com/..."
            control={form.control}
          />
          <FormText
            name="socialMedia.website"
            label="Website"
            placeholder="https://..."
            control={form.control}
          />
          <FormText
            name="socialMedia.github"
            label="GitHub"
            placeholder="https://github.com/..."
            control={form.control}
          />

          <FormText
            name="audienceSize.min"
            label="Audiencia mín."
            placeholder="50"
            control={form.control}
            type="number"
          />

          <FormText
            name="audienceSize.max"
            label="Audiencia máx."
            placeholder="300"
            control={form.control}
            type="number"
          />

          <FormArea
            name="notes"
            label="Notas internas"
            placeholder="Notas para el equipo…"
            control={form.control}
            className="col-span-1 md:col-span-2"
          />
        </FormSection>

        <div className="h-20" />

        <div className="fixed inset-x-0 bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="mx-auto max-w-screen-xl px-4 py-3 flex flex-col sm:flex-row gap-3 items-center justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => history.back()}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "create" ? "Crear expositor" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
