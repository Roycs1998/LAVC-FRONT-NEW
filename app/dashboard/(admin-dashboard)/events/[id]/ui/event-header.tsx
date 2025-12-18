import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, MapPin, Building2, Clock } from "lucide-react";
import { Event, EventStatusLabels } from "@/modules/event";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "draft":
      return "secondary";
    case "pending_approval":
      return "outline";
    case "approved":
    case "published":
      return "default";
    case "rejected":
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export function EventHeader({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden">
      {event.bannerUrl && (
        <div
          className="h-64 w-full bg-gradient-to-br from-primary/20 to-primary/5 relative"
          style={{
            backgroundImage: `url(${event.bannerUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold leading-tight">
                  {event.title}
                </h1>
                <Badge variant={getStatusBadgeVariant(event.eventStatus)}>
                  {EventStatusLabels[event.eventStatus]}
                </Badge>
              </div>
              {event.shortDescription && (
                <p className="text-muted-foreground text-lg">
                  {event.shortDescription}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>
                {format(new Date(event.startDate), "PPP", { locale: es })}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {format(new Date(event.startDate), "p", { locale: es })} -{" "}
                {format(new Date(event.endDate), "p", { locale: es })}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="capitalize">{event.location.type}</span>
            </div>
            {event.company?.name && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <div className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{event.company.name}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
