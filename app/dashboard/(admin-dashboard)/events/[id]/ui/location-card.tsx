import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Link as LinkIcon, Globe } from "lucide-react";
import { Event } from "@/modules/event";

export function LocationCard({ event }: { event: Event }) {
  const isPhysical =
    event.location.type === "physical" || event.location.type === "hybrid";
  const isVirtual =
    event.location.type === "virtual" || event.location.type === "hybrid";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubicación del Evento</CardTitle>
        <CardDescription>
          Detalles de{" "}
          {event.location.type === "hybrid"
            ? "ubicación híbrida"
            : event.location.type === "virtual"
            ? "evento virtual"
            : "sede física"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isPhysical && (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold mb-1">Sede Física</p>
                <p className="text-sm text-muted-foreground">
                  {event.location.venue || "Por definir"}
                </p>
                {event.location.address && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {[
                      event.location.address.street,
                      event.location.address.city,
                      event.location.address.state,
                      event.location.address.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {isPhysical && isVirtual && <Separator />}

        {isVirtual && (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold mb-1">Acceso Virtual</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Plataforma:{" "}
                  {event.location.virtualDetails?.platform || "Por definir"}
                </p>
                {event.location.virtualDetails?.meetingUrl && (
                  <a
                    href={event.location.virtualDetails.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Abrir enlace de reunión
                    <LinkIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
