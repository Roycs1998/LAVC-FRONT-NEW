"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
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
import { Badge } from "@/components/ui/badge";
import { EventType, EventStatus } from "@/modules/event";
import { CompaniesClient } from "@/modules/company/client";
import { UserRole } from "@/modules/user";

type Company = {
  id: string;
  name: string;
};

export function BasicInfoStep() {
  const { control, setValue } = useFormContext();
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const isPlatformAdmin = session?.user?.roles.includes(
    UserRole.PLATFORM_ADMIN
  );
  const userCompanyId = session?.user?.company?.id;

  useEffect(() => {
    const loadCompanies = async () => {
      if (isPlatformAdmin) {
        setIsLoadingCompanies(true);
        try {
          const response = await CompaniesClient.list({ limit: 100 });
          setCompanies(response.data);
        } catch (error) {
          console.error("Error loading companies:", error);
        } finally {
          setIsLoadingCompanies(false);
        }
      } else if (userCompanyId) {
        setValue("event.companyId", userCompanyId);
      }
    };

    loadCompanies();
  }, [isPlatformAdmin, userCompanyId, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del evento</CardTitle>
        <CardDescription>
          Define el nombre, la descripción y el tipo de evento. Esto es lo que
          verán tus asistentes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="event.title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Título del evento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Congreso Internacional de Gastroenterología 2025"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Usa un título claro y descriptivo para que las personas
                  entiendan rápidamente de qué trata el evento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="event.shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción corta</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Expertos en hepatología, NAFLD y NASH."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Se mostrará en listados y tarjetas. Un resumen breve que llame
                  la atención.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="event.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de evento</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de evento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EventType.CONFERENCE}>
                      Conferencia
                    </SelectItem>
                    <SelectItem value={EventType.WORKSHOP}>
                      Workshop / Taller
                    </SelectItem>
                    <SelectItem value={EventType.MEETUP}>
                      Meetup / Networking
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Ayuda a clasificar tu evento.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="event.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción detallada</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Describe el contenido, los ponentes, el público objetivo y por qué vale la pena asistir."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Esta información se mostrará en la página del evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isPlatformAdmin && (
          <FormField
            control={control}
            name="event.companyId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {isPlatformAdmin && (
            <FormField
              control={control}
              name="event.companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizador / Empresa</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoadingCompanies}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una empresa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona la empresa responsable del evento.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={control}
            name="event.eventStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado del evento</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EventStatus.DRAFT}>
                      Borrador (no visible al público)
                    </SelectItem>

                    {!isPlatformAdmin && (
                      <SelectItem value={EventStatus.PENDING_APPROVAL}>
                        Enviar a revisión
                      </SelectItem>
                    )}

                    {isPlatformAdmin && (
                      <>
                        <SelectItem value={EventStatus.PENDING_APPROVAL}>
                          Pendiente de aprobación
                        </SelectItem>
                        <SelectItem value={EventStatus.APPROVED}>
                          Aprobado
                        </SelectItem>
                        <SelectItem value={EventStatus.PUBLISHED}>
                          Publicado (visible para los asistentes)
                        </SelectItem>
                        <SelectItem value={EventStatus.CANCELLED}>
                          Cancelado
                        </SelectItem>
                        <SelectItem value={EventStatus.REJECTED}>
                          Rechazado
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {isPlatformAdmin ? (
                    <>
                      Puedes mantenerlo como{" "}
                      <Badge variant="outline">Borrador</Badge> mientras lo
                      configuras.
                    </>
                  ) : (
                    <>
                      Mantén como <Badge variant="outline">Borrador</Badge> para
                      editar, o selecciona{" "}
                      <Badge variant="outline">Enviar a revisión</Badge> cuando
                      esté listo.
                    </>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
