"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { AssignStaffDialog } from "./assign-staff-dialog";

interface AssignStaffButtonProps {
  eventId: string;
}

export function AssignStaffButton({ eventId }: AssignStaffButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm">
        <UserPlus className="mr-2 h-4 w-4" />
        Asignar Staff
      </Button>

      <AssignStaffDialog eventId={eventId} open={open} onOpenChange={setOpen} />
    </>
  );
}
