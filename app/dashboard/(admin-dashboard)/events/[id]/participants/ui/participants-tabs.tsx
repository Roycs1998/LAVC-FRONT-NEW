"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaginatedParticipants } from "@/modules/participant/types";
import { PaginatedInvitations } from "@/modules/sponsor-invitation/types";
import { EventSponsor } from "@/modules/sponsor/types";
import { ParticipantsTable } from "./table/participants-table";
import { InvitationLinksTable } from "./invitation-links/table/invitation-links-table";

interface ParticipantsTabsProps {
  eventId: string;
  participantsData: PaginatedParticipants;
  invitationsData: PaginatedInvitations;
  sponsors: EventSponsor[];
  activeTab: string;
}

export function ParticipantsTabs({
  eventId,
  participantsData,
  invitationsData,
  sponsors,
  activeTab,
}: ParticipantsTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    // Reset page when changing tabs
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="space-y-6"
    >
      <TabsList>
        <TabsTrigger value="participants">Participantes</TabsTrigger>
        <TabsTrigger value="invitation-links">
          Enlaces de Invitación
        </TabsTrigger>
      </TabsList>

      <TabsContent value="participants" className="space-y-4">
        <ParticipantsTable
          participantsData={participantsData}
          sponsors={sponsors}
          eventId={eventId}
        />
      </TabsContent>

      <TabsContent value="invitation-links" className="space-y-4">
        <InvitationLinksTable
          invitationsData={invitationsData}
          sponsors={sponsors}
          eventId={eventId}
        />
      </TabsContent>
    </Tabs>
  );
}
