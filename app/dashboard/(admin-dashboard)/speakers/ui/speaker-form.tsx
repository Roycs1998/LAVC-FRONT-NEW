"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

type Props = {
  mode: "create" | "edit";
  defaultValues?: Partial<Speaker>;
  id?: string;
};

export function SpeakerForm({ mode, defaultValues, id }: Props) {
  const schema = mode === "create" ? speakerCreateSchema : speakerUpdateSchema;
  const router = useRouter();

  const flatDefaults = React.useMemo(() => {
    return {
      firstName: defaultValues?.person?.firstName ?? "",
      lastName: defaultValues?.person?.lastName ?? "",
      email: "",
      phone: defaultValues?.person?.phone ?? "",
      companyId: defaultValues?.company?.id ?? "",
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
        min: defaultValues?.audienceSize?.min ?? undefined,
        max: defaultValues?.audienceSize?.max ?? undefined,
      },
      notes: defaultValues?.notes ?? "",
      currency: defaultValues?.currency ?? "PEN",
    };
  }, [defaultValues]);

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "create"
        ? {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyId: "",
            specialty: "",
            biography: "",
            yearsExperience: 0,
            certifications: [""],
            hourlyRate: 0,
            languages: [""],
            topics: [""],
            socialMedia: { linkedin: "", twitter: "", website: "", github: "" },
            audienceSize: { min: undefined, max: undefined },
            notes: "",
            currency: "PEN",
          }
        : flatDefaults,
  });

  const onSubmit = async (values: SpeakerCreateInput | SpeakerUpdateInput) => {
    try {
      const cleaned = deepClean(values);

      if (mode === "create") {
        await SpeakersClient.create(cleaned as any);
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
        <Section
          title="Identidad del expositor"
          description="Completa los datos principales del expositor."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormText
              name="firstName"
              label="Nombre"
              placeholder="Ej. Ana"
              control={form.control}
              required
            />
            <FormText
              name="lastName"
              label="Apellido"
              placeholder="Ej. Torres"
              control={form.control}
              required
            />
            <FormText
              name="phone"
              label="Teléfono"
              placeholder="+51 ..."
              control={form.control}
            />
            <FormText
              name="email"
              label="Correo"
              placeholder="ana@acme.com"
              control={form.control}
              type="email"
            />
            <FormText
              name="companyId"
              label="Empresa (ID)"
              placeholder="64f14b1a2c4e5a1234567891"
              control={form.control}
              required
            />
          </div>
        </Section>

        <Section
          title="Perfil profesional"
          description="Especialidad, experiencia y contenidos."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormText
              name="specialty"
              label="Especialidad"
              placeholder="Cardiología"
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
            <FormText
              name="currency"
              label="Moneda (PEN/USD/EUR)"
              placeholder="PEN"
              control={form.control}
            />
          </div>

          <FormField
            control={form.control}
            name="biography"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografía</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Resumen profesional…"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArrayField
              control={form.control}
              name="languages"
              label="Idiomas"
              placeholder="es / en / pt…"
            />
            <ArrayField
              control={form.control}
              name="topics"
              label="Temas"
              placeholder="hepatología, nutrición…"
            />
            <ArrayField
              control={form.control}
              name="certifications"
              label="Certificaciones"
              placeholder="ACLS / BLS…"
            />
          </div>
        </Section>

        <Section
          title="Redes y audiencia"
          description="Enlaces y alcance estimado."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas internas</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Notas para el equipo…"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

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

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        <div>
          <h2 className="text-base font-semibold leading-none">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <Separator />
        {children}
      </CardContent>
    </Card>
  );
}

function FormText({
  name,
  label,
  placeholder,
  control,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  type?: string;
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
