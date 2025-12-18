import { notFound } from "next/navigation";
import { serverApi } from "@/lib/axios/server";
import { Event } from "@/modules/event";
import { TicketType } from "@/modules/ticket-type";
import { EventProfile } from "./ui/event-profile";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const api = await serverApi();

  let event: Event;
  let tickets: TicketType[] = [];

  try {
    const { data } = await api.get<Event>(`/events/${id}`);
    event = data;

    try {
      const ticketsResponse = await api.get<TicketType[]>(
        `/events/${id}/ticket-types`
      );
      tickets = ticketsResponse.data;
    } catch (error) {
      console.error("Error fetching ticket types:", error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }

  return <EventProfile event={event} tickets={tickets} />;
}
