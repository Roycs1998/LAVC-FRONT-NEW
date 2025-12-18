import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { serverApi } from "@/lib/axios/server";
import { EventSponsor } from "@/modules/sponsor";
import { notFound } from "next/navigation";
import { AddSponsorButton } from "./ui/add-sponsor-button";
import { SponsorsTable } from "./ui/table/sponsors-table";

interface SponsorsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SponsorsPage({ params }: SponsorsPageProps) {
  const { id } = await params;
  const api = await serverApi();

  let sponsors: EventSponsor[];
  try {
    const { data } = await api.get<EventSponsor[]>(`/events/${id}/sponsors`);
    sponsors = data;
  } catch (error) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sponsors del Evento"
        subtitle="Gestiona los sponsors y sus cuotas de participación"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/events/${id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al evento
              </Link>
            </Button>
            <AddSponsorButton eventId={id} />
          </div>
        }
      />

      <SponsorsTable sponsors={sponsors} eventId={id} />
    </div>
  );
}
