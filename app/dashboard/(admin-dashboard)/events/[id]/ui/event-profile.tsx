"use client";

import { Event } from "@/modules/event";
import { TicketType } from "@/modules/ticket-type";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EventHeader } from "./event-header";
import { RejectionAlert } from "./rejection-alert";
import { DescriptionCard } from "./description-card";
import { RegistrationCard } from "./registration-card";
import { LocationCard } from "./location-card";
import { TagsDisplay } from "./tags-display";
import { TicketsCard } from "./tickets-card";

type EventProfileProps = {
  event: Event;
  tickets: TicketType[];
};

export function EventProfile({ event, tickets }: EventProfileProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Detalles del Evento"
        subtitle={`Información completa de ${event.title}`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/dashboard/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a eventos
            </Link>
          </Button>
        }
      />

      <EventHeader event={event} />

      {event.rejectionReason && (
        <RejectionAlert reason={event.rejectionReason} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <DescriptionCard description={event.description} />
        <RegistrationCard event={event} />
      </div>

      <TicketsCard tickets={tickets} />

      <LocationCard event={event} />

      <TagsDisplay tags={event.tags} />
    </div>
  );
}
