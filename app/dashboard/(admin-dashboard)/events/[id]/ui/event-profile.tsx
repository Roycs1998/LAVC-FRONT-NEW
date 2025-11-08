import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, MapPin, Link as LinkIcon, Users } from "lucide-react";
import { Event } from "@/modules/event";

type EventProfileProps = {
  event: Event;
  onEdit?: () => void;
  rightActions?: React.ReactNode;
};

export function EventProfile({
  event,
  onEdit,
  rightActions,
}: EventProfileProps) {
  const period = `${new Date(event.startDate).toLocaleString()} — ${new Date(
    event.endDate
  ).toLocaleString()}`;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {!!event.featuredImage && (
          <div
            className="h-48 w-full bg-muted"
            style={{
              backgroundImage: `url(${event.featuredImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold leading-tight">
                  {event.title}
                </h1>
                {event.eventStatus && <Badge>{event.eventStatus}</Badge>}
              </div>
              {event.shortDescription && (
                <p className="text-sm text-muted-foreground">
                  {event.shortDescription}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CalendarClock className="h-4 w-4" />
                  {period} {event.timezone ? `(${event.timezone})` : ""}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location.type}
                </span>
                {event.company?.name && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm">
                      Empresa: <b>{event.company.name}</b>
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">{rightActions}</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
            <CardDescription>Resumen y detalles del evento.</CardDescription>
          </CardHeader>
          <CardContent>
            {event.description ? (
              <p className="text-sm leading-6 whitespace-pre-wrap">
                {event.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Sin descripción.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>Estado de inscripción y reglas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Badge
                variant={event.registration?.isOpen ? "default" : "secondary"}
              >
                {event.registration?.isOpen
                  ? "Registro abierto"
                  : "Registro cerrado"}
              </Badge>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" />
                Máx. por registro:{" "}
                {event.registration?.maxAttendeesPerRegistration ?? 1}
              </span>
            </div>
            {event.registration?.requiresApproval && (
              <div className="text-muted-foreground">
                Requiere aprobación de registro.
              </div>
            )}
            {event.registration?.opensAt && (
              <div>
                Apertura:{" "}
                {new Date(event.registration.opensAt).toLocaleString()}
              </div>
            )}
            {event.registration?.closesAt && (
              <div>
                Cierre: {new Date(event.registration.closesAt).toLocaleString()}
              </div>
            )}
            {event.location?.capacity && (
              <div>Capacidad de sede: {event.location.capacity}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
          <CardDescription>Datos físicos y/o virtuales.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {(event.location.type === "physical" ||
            event.location.type === "hybrid") && (
            <div className="space-y-1 text-sm">
              <div>
                <b>Sede:</b> {event.location.venue || "—"}
              </div>
              <div>
                <b>Dirección:</b>{" "}
                {event.location.address?.street ||
                event.location.address?.city ||
                event.location.address?.country
                  ? `${event.location.address?.street ?? ""} ${
                      event.location.address?.city ?? ""
                    } ${event.location.address?.country ?? ""}`.trim()
                  : "—"}
              </div>
            </div>
          )}
          {(event.location.type === "virtual" ||
            event.location.type === "hybrid") && (
            <div className="space-y-1 text-sm">
              <div>
                <b>Plataforma:</b>{" "}
                {event.location.virtualDetails?.platform || "—"}
              </div>
              <div className="inline-flex items-center gap-2">
                <b>Enlace:</b>
                {event.location.virtualDetails?.meetingUrl ? (
                  <a
                    href={event.location.virtualDetails.meetingUrl}
                    target="_blank"
                    className="text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    Abrir <LinkIcon className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  "—"
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {!!event.tags?.length && (
        <div className="flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
