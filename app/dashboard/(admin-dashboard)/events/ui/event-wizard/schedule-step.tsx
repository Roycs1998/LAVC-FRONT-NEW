import { useFormContext } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventLocationType } from "@/modules/event";

export function ScheduleStep() {
  const { control, watch } = useFormContext();
  const locationType = watch("event.location.type");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fechas y ubicación</CardTitle>
        <CardDescription>
          Define cuándo se realiza el evento y si es presencial, virtual o
          híbrido.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="event.startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha y hora de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? new Date(field.value).toLocaleString()
                          : "Selecciona una fecha y hora"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Indica el momento exacto en el que comienza el evento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="event.endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha y hora de finalización</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? new Date(field.value).toLocaleString()
                          : "Selecciona una fecha y hora"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Debe ser posterior a la fecha de inicio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-center">
          <FormField
            control={control}
            name="event.timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zona horaria</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. America/Lima" {...field} />
                </FormControl>
                <FormDescription>
                  Se usa para mostrar las fechas y horas correctamente a tus
                  asistentes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="event.isAllDay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Evento de día completo</FormLabel>
                  <FormDescription>
                    Actívalo si el evento dura todo el día y la hora exacta no
                    es relevante.
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

        <Separator />

        <FormField
          control={control}
          name="event.location.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de ubicación</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de ubicación" />
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
              <FormDescription>
                Indica cómo asistirán tus participantes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Physical Location */}
        {(locationType === EventLocationType.PHYSICAL ||
          locationType === EventLocationType.HYBRID) && (
          <div className="space-y-4 rounded-lg border p-4">
            <Label className="text-sm font-medium">Ubicación física</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name="event.location.venue"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nombre del lugar</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Centro de Convenciones de Lima"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="event.location.address.street"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Av. Las Flores 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="event.location.address.city"
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
                control={control}
                name="event.location.address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado / Provincia</FormLabel>
                    <FormControl>
                      <Input placeholder="Lima" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="event.location.address.country"
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

              <FormField
                control={control}
                name="event.location.address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código postal</FormLabel>
                    <FormControl>
                      <Input placeholder="15001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Virtual Location */}
        {(locationType === EventLocationType.VIRTUAL ||
          locationType === EventLocationType.HYBRID) && (
          <div className="space-y-4 rounded-lg border p-4">
            <Label className="text-sm font-medium">Detalles virtuales</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name="event.location.virtualDetails.platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataforma</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Zoom, Google Meet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="event.location.virtualDetails.meetingUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Enlace de la reunión</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="event.location.virtualDetails.meetingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID de la reunión</FormLabel>
                    <FormControl>
                      <Input placeholder="Opcional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="event.location.virtualDetails.passcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Opcional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <FormField
          control={control}
          name="event.location.capacity"
          render={({ field }) => (
            <FormItem className="max-w-xs">
              <FormLabel>Capacidad estimada</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej. 300"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Número aproximado de asistentes que esperas (puedes dejarlo
                vacío).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
