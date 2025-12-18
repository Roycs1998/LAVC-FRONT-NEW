import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Event } from "@/modules/event";
import { getLocationText } from "@/modules/invitation";

interface EventInfoProps {
  event: Event;
}

export function EventInfo({ event }: EventInfoProps) {
  const eventStartText = event.startDate
    ? format(new Date(event.startDate), "PPP", { locale: es })
    : "Por confirmar";

  const locationText = getLocationText(event.location);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Información del Evento</h3>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Fecha</p>
            <p className="text-sm text-muted-foreground">{eventStartText}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Ubicación</p>
            <p className="text-sm text-muted-foreground">{locationText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
