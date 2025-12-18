"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, TicketClient, TICKET_STATUS_LABELS } from "@/modules/ticket";
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await TicketClient.getMyTickets();
        setTickets(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error al cargar tickets");
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">Cargando tickets...</div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Mis Tickets</CardTitle>
            <CardDescription>
              No tienes tickets registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <TicketIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aún no tienes tickets para ningún evento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mis Tickets</h1>
        <p className="text-muted-foreground">
          Gestiona tus tickets para eventos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">
                    {ticket.event.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {ticket.ticketType.name}
                  </CardDescription>
                </div>
                <Badge
                  variant={ticket.status === "active" ? "default" : "secondary"}
                >
                  {TICKET_STATUS_LABELS[ticket.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(ticket.event.startDate), "PPP", {
                      locale: es,
                    })}
                  </span>
                </div>
                {ticket.event.location?.venue && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">
                      {ticket.event.location.venue}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="text-xs text-muted-foreground mb-2">
                  Código del Ticket
                </div>
                <div className="font-mono text-sm font-semibold">
                  {ticket.ticketNumber}
                </div>
              </div>

              {ticket.qrCode && (
                <div className="border-t pt-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <img
                      src={ticket.qrCode}
                      alt="QR Code"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Presenta este código QR en el evento
                  </p>
                </div>
              )}

              {ticket.validatedAt && (
                <div className="text-xs text-green-600">
                  ✓ Validado el{" "}
                  {format(new Date(ticket.validatedAt), "PPP 'a las' p", {
                    locale: es,
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
