import { serverApi } from "@/lib/axios/server";
import { EventProfile } from "./ui/event-profile";
import { Event } from "@/modules/event";

interface Props {
  params: Promise<{ id: string }>;
}

const EventProfilePage = async ({ params }: Props) => {
  const { id } = await params;
  const api = await serverApi();

  const { data } = await api.get<Event>(`/events/${id}`);

  return <EventProfile event={data} onEdit={() => {}} />;
};

export default EventProfilePage;
