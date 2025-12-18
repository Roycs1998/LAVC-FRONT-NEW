import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";
import { Event } from "@/modules/event";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function RegistrationCard({ event }: { event: Event }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro e Inscripción</CardTitle>
        <CardDescription>Estado y configuración de registro</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {event.registration?.isOpen ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive" />
          )}
          <div>
            <p className="font-medium">
              {event.registration?.isOpen
                ? "Registro Abierto"
                : "Registro Cerrado"}
            </p>
            <p className="text-sm text-muted-foreground">
              Estado actual de inscripciones
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-1">Máx. por registro</p>
            <p className="text-muted-foreground">
              {event.registration?.maxAttendeesPerRegistration ?? 1} persona(s)
            </p>
          </div>
          {event.location?.capacity && (
            <div>
              <p className="font-medium mb-1">Capacidad total</p>
              <p className="text-muted-foreground">
                {event.location.capacity} personas
              </p>
            </div>
          )}
        </div>

        {event.registration?.requiresApproval && (
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">Requiere Aprobación</p>
            <p className="text-muted-foreground">
              Los registros deben ser aprobados por un administrador
            </p>
          </div>
        )}

        {(event.registration?.opensAt || event.registration?.closesAt) && (
          <div className="space-y-2 text-sm">
            {event.registration.opensAt && (
              <div>
                <p className="font-medium">Apertura de registro</p>
                <p className="text-muted-foreground">
                  {format(new Date(event.registration.opensAt), "PPPp", {
                    locale: es,
                  })}
                </p>
              </div>
            )}
            {event.registration.closesAt && (
              <div>
                <p className="font-medium">Cierre de registro</p>
                <p className="text-muted-foreground">
                  {format(new Date(event.registration.closesAt), "PPPp", {
                    locale: es,
                  })}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
