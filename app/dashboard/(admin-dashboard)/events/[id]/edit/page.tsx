import { EventWizard } from "../../ui/event-wizard";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { serverApi } from "@/lib/axios/server";
import { Event } from "@/modules/event";
import { TicketType } from "@/modules/ticket-type";
import { notFound } from "next/navigation";
import { EventStatus } from "@/modules/event";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const api = await serverApi();

  let event: Event;
  let ticketTypes: TicketType[] = [];

  try {
    const { data } = await api.get<Event>(`/events/${id}`);
    event = data;

    // Fetch ticket types for the event
    try {
      const ticketsResponse = await api.get<TicketType[]>(
        `/events/${id}/ticket-types`
      );
      ticketTypes = ticketsResponse.data;
    } catch (error) {
      console.error("Error fetching ticket types:", error);
      // Continue without tickets if fetch fails
    }
  } catch {
    notFound();
  }

  if (
    event.eventStatus !== EventStatus.DRAFT &&
    event.eventStatus !== EventStatus.REJECTED &&
    event.eventStatus !== EventStatus.PUBLISHED
  ) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="No se puede editar"
          subtitle="Este evento no puede ser editado en su estado actual"
          actions={
            <Button variant="outline" asChild>
              <Link href="/dashboard/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a eventos
              </Link>
            </Button>
          }
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Solo los eventos en estado Borrador o Rechazado pueden ser editados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {event.eventStatus === EventStatus.REJECTED && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Evento Rechazado</AlertTitle>
          <AlertDescription>
            {event.rejectionReason ? (
              <>
                <p className="font-medium mb-2">Motivo del rechazo:</p>
                <p className="mb-3">{event.rejectionReason}</p>
              </>
            ) : (
              <p className="mb-3">
                Este evento fue rechazado por el administrador.
              </p>
            )}
            <p className="text-sm">
              Por favor, realiza los cambios necesarios y selecciona{" "}
              <strong>&quot;Enviar a revisión&quot;</strong> en el campo de
              estado cuando esté listo para re-enviarlo.
            </p>
          </AlertDescription>
        </Alert>
      )}

      <EventWizard
        eventId={id}
        initialData={event}
        initialTickets={ticketTypes}
      />
    </div>
  );
}
