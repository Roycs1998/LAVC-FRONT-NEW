"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateInvitationLinkDialog } from "./create-invitation-link-dialog";
import { EventSponsor } from "@/modules/sponsor/types";

interface CreateInvitationLinkButtonProps {
  eventId: string;
  sponsors: EventSponsor[];
}

export function CreateInvitationLinkButton({
  eventId,
  sponsors,
}: CreateInvitationLinkButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Generar Enlace
      </Button>

      <CreateInvitationLinkDialog
        eventId={eventId}
        sponsors={sponsors}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
