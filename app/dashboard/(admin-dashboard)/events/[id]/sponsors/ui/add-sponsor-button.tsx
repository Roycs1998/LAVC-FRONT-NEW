"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddSponsorDialog } from "./add-sponsor-dialog";

interface AddSponsorButtonProps {
  eventId: string;
}

export function AddSponsorButton({ eventId }: AddSponsorButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Agregar Sponsor
      </Button>

      <AddSponsorDialog eventId={eventId} open={open} onOpenChange={setOpen} />
    </>
  );
}
