import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { serverApi } from "@/lib/axios/server";
import { PaginatedParticipants } from "@/modules/participant/types";
import { PaginatedInvitations } from "@/modules/sponsor-invitation/types";
import { EventSponsor } from "@/modules/sponsor/types";
import { ParticipantsTabs } from "./ui/participants-tabs";

interface ParticipantsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    tab?: string;
    page?: string;
    limit?: string;
    sponsorId?: string;
    participantType?: string;
    isActive?: string;
    search?: string;
    usageType?: string;
    isExpired?: string;
    hasAvailableUses?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function ParticipantsPage({
  params,
  searchParams,
}: ParticipantsPageProps) {
  const { id } = await params;
  const {
    tab = "participants",
    page = "1",
    limit = "10",
    sponsorId,
    participantType,
    isActive,
    search,
    usageType,
    isExpired,
    hasAvailableUses,
    sortBy,
    sortOrder,
  } = await searchParams;

  const api = await serverApi();

  let participantsData: PaginatedParticipants = {
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };

  let invitationsData: PaginatedInvitations = {
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };

  let sponsors: EventSponsor[] = [];

  // Load participants (only if on participants tab)
  if (tab === "participants") {
    try {
      const params: Record<string, string> = {
        page,
        limit,
      };

      if (sponsorId) params.sponsorId = sponsorId;
      if (participantType) params.participantType = participantType;
      if (isActive !== undefined) params.isActive = isActive;
      if (search) params.search = search;

      const { data } = await api.get<PaginatedParticipants>(
        `/events/${id}/participants`,
        { params }
      );
      participantsData = data;

      console.log("participantsData", participantsData);
    } catch (error) {
      console.error("Error loading participants:", error);
    }
  }

  if (tab === "invitation-links") {
    try {
      const params: Record<string, string> = {
        page,
        limit,
      };

      if (sponsorId) params.sponsorId = sponsorId;
      if (participantType) params.participantType = participantType;
      if (isActive !== undefined) params.isActive = isActive;
      if (usageType) params.usageType = usageType;
      if (isExpired !== undefined) params.isExpired = isExpired;
      if (hasAvailableUses !== undefined)
        params.hasAvailableUses = hasAvailableUses;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;

      const { data } = await api.get<PaginatedInvitations>(
        `/events/${id}/invitations`,
        { params }
      );
      invitationsData = data;
    } catch (error) {
      console.error("Error loading invitations:", error);
    }
  }

  try {
    const { data } = await api.get<EventSponsor[]>(`/events/${id}/sponsors`);

    sponsors = data;
  } catch (error) {
    console.error("Error loading sponsors:", error);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Participantes del Evento"
        subtitle="Gestiona participantes e invitaciones"
        actions={
          <Button variant="outline" asChild>
            <Link href={`/dashboard/events/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al evento
            </Link>
          </Button>
        }
      />

      <ParticipantsTabs
        eventId={id}
        participantsData={participantsData}
        invitationsData={invitationsData}
        sponsors={sponsors}
        activeTab={tab}
      />
    </div>
  );
}
