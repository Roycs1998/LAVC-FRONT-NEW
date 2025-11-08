"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventCreateSchema } from "@/modules/event/schema";
import type { EventCreateInput } from "@/modules/event/schema";
import { EventsClient } from "@/modules/event/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { EventLocationType, EventType } from "@/modules/event";

export function EventCreateForm({
  isPlatformAdmin,
  myCompanyId,
  onCreated,
}: {
  isPlatformAdmin?: boolean;
  myCompanyId?: string;
  onCreated?: (id: string) => void;
}) {
  const router = useRouter();

  const form = useForm<EventCreateInput>({
    resolver: zodResolver(eventCreateSchema),
    defaultValues: {
      companyId: isPlatformAdmin ? "" : myCompanyId ?? "",
      title: "",
      description: "",
      shortDescription: "",
      type: EventType.CONFERENCE,
      startDate: "",
      endDate: "",
      timezone: "America/Lima",
      isAllDay: false,
      location: {
        type: EventLocationType.PHYSICAL,
        venue: "",
        address: { city: "", country: "" },
        virtualDetails: { platform: "", meetingUrl: "" },
        capacity: undefined,
      },
      speakers: [],
      agenda: [],
      registration: {
        isOpen: false,
        opensAt: "",
        closesAt: "",
        requiresApproval: false,
        maxAttendeesPerRegistration: 1,
        waitlistEnabled: false,
      },
      featuredImage: "",
      images: [],
      videoUrl: "",
      tags: [],
      categories: [],
      slug: "",
    },
    mode: "onBlur",
  });

  const modality = form.watch("location.type");

  async function onSubmit(values: EventCreateInput) {
    /* try {
      const payload = sanitizeEventPayload(values);
      const created = await EventsClient.create(payload);
      toast.success("Evento creado");
      onCreated?.(created.id);
      router.push(`/dashboard/events/${created.id}`);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "No se pudo crear el evento");
    } */
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle>Información básica</CardTitle>
            <CardDescription>Resumen general del evento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPlatformAdmin && (
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa (ID)</FormLabel>
                    <FormControl>
                      <Input placeholder="companyId" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid md:grid-cols-2 items-start gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del evento" {...field} />
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
                    <FormLabel>Tipo</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(EventType).map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción corta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Una frase clara y concisa…"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Detalles del evento, objetivos, público…"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fecha y horario</CardTitle>
            <CardDescription>
              Configura el horario considerando tu zona horaria.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 items-start gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fin</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 items-start gap-4">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zona horaria</FormLabel>
                    <FormControl>
                      <Input placeholder="America/Lima" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAllDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Todo el día</FormLabel>
                    <div className="h-9 flex items-center">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ubicación</CardTitle>
            <CardDescription>
              Muestra campos según la modalidad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="location.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modalidad</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona modalidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={EventLocationType.PHYSICAL}>
                        Presencial
                      </SelectItem>
                      <SelectItem value={EventLocationType.VIRTUAL}>
                        Virtual
                      </SelectItem>
                      <SelectItem value={EventLocationType.HYBRID}>
                        Híbrido
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(modality === EventLocationType.PHYSICAL ||
              modality === EventLocationType.HYBRID) && (
              <>
                <Separator />
                <div className="grid md:grid-cols-2 items-start gap-4">
                  <FormField
                    name="location.venue"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local / Sede</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Centro de Convenciones…"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="location.capacity"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidad</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 items-start gap-4">
                  <FormField
                    name="location.address.city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Lima" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="location.address.country"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input placeholder="Perú" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="location.address.street"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Av. ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(modality === EventLocationType.VIRTUAL ||
              modality === EventLocationType.HYBRID) && (
              <>
                <Separator />

                <div className="grid md:grid-cols-2 items-start gap-4">
                  <FormField
                    name="location.virtualDetails.platform"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plataforma</FormLabel>
                        <FormControl>
                          <Input placeholder="Zoom / Google Meet…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="location.virtualDetails.meetingUrl"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enlace</FormLabel>
                        <FormControl>
                          <Input placeholder="https://…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inscripción</CardTitle>
            <CardDescription>
              Control de registro y aforo por inscripción.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 items-start gap-4">
            <FormField
              name="registration.isOpen"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registro abierto</FormLabel>
                  <div className="h-9 flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="registration.requiresApproval"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requiere aprobación</FormLabel>
                  <div className="h-9 flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="registration.opensAt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apertura</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="registration.closesAt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cierre</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="registration.maxAttendeesPerRegistration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máx. por registro</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="registration.waitlistEnabled"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lista de espera</FormLabel>
                  <div className="h-9 flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medios y meta</CardTitle>
            <CardDescription>
              Imagen destacada, galería, video y etiquetas.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              name="featuredImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen destacada (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="videoUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 items-start gap-4">
              <FormField
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="veterinaria, felinos, cirugía"
                        value={(field.value || []).join(", ")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="categories"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorías</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="educación, congreso"
                        value={(field.value || []).join(", ")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="mi-evento-unico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="h-16" />
        <div className="fixed inset-x-0 bottom-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => history.back()}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear evento</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
