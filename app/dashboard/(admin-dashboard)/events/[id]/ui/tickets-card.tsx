"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TicketType, TicketStatus } from "@/modules/ticket-type";
import { Calendar, Ticket, Users, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type TicketsCardProps = {
  tickets: TicketType[];
};

const statusConfig = {
  [TicketStatus.AVAILABLE]: {
    label: "Disponible",
    variant: "default" as const,
  },
  [TicketStatus.SOLD_OUT]: {
    label: "Agotado",
    variant: "destructive" as const,
  },
  [TicketStatus.COMING_SOON]: {
    label: "Próximamente",
    variant: "secondary" as const,
  },
  [TicketStatus.SALE_ENDED]: {
    label: "Venta finalizada",
    variant: "outline" as const,
  },
  [TicketStatus.HIDDEN]: {
    label: "Oculto",
    variant: "outline" as const,
  },
};

const currencySymbols = {
  PEN: "S/",
  USD: "$",
  EUR: "€",
};

export function TicketsCard({ tickets }: TicketsCardProps) {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Tipos de Tickets
          </CardTitle>
          <CardDescription>
            No hay tipos de tickets configurados para este evento
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Tipos de Tickets
        </CardTitle>
        <CardDescription>
          {tickets.length} {tickets.length === 1 ? "tipo" : "tipos"} de ticket
          disponible{tickets.length === 1 ? "" : "s"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {tickets.map((ticket) => {
            const status = statusConfig[ticket.ticketStatus];
            const currencySymbol =
              currencySymbols[
                ticket.currency as keyof typeof currencySymbols
              ] || ticket.currency;
            const soldPercentage = (ticket.sold / ticket.quantity) * 100;

            return (
              <div
                key={ticket.id}
                className="rounded-lg border p-4 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{ticket.name}</h4>
                    {ticket.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {ticket.description}
                      </p>
                    )}
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                <div className="space-y-2">
                  {/* Price */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {ticket.price !== undefined && ticket.price !== null
                        ? `${currencySymbol}${ticket.price.toFixed(2)}`
                        : "Gratis"}
                    </span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {ticket.sold} / {ticket.quantity} vendidos
                    </span>
                    <span className="text-muted-foreground">
                      ({soldPercentage.toFixed(0)}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(soldPercentage, 100)}%` }}
                    />
                  </div>

                  {/* Sale dates */}
                  {(ticket.saleStartDate || ticket.saleEndDate) && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2 border-t">
                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        {ticket.saleStartDate && (
                          <span>
                            Inicio:{" "}
                            {format(
                              new Date(ticket.saleStartDate),
                              "dd MMM yyyy",
                              { locale: es }
                            )}
                          </span>
                        )}
                        {ticket.saleEndDate && (
                          <span>
                            Fin:{" "}
                            {format(
                              new Date(ticket.saleEndDate),
                              "dd MMM yyyy",
                              { locale: es }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pricing tiers indicator */}
                  {ticket.pricingTiers && ticket.pricingTiers.length > 0 && (
                    <div className="pt-2 border-t">
                      <Badge variant="secondary" className="text-xs">
                        {ticket.pricingTiers.length} nivel
                        {ticket.pricingTiers.length === 1 ? "" : "es"} de precio
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
