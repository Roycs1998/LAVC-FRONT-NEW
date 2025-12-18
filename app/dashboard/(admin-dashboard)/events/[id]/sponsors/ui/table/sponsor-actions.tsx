"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Users, Edit } from "lucide-react";
import { EventSponsor, SponsorClient } from "@/modules/sponsor";
import { toast } from "sonner";
import { EditSponsorQuotasDialog } from "../edit-sponsor-quotas-dialog";

interface SponsorActionsProps {
  sponsor: EventSponsor;
  eventId: string;
}

export function SponsorActions({ sponsor, eventId }: SponsorActionsProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editQuotasOpen, setEditQuotasOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await SponsorClient.removeSponsor(eventId, sponsor.id);
      toast.success("Sponsor eliminado exitosamente");
      router.refresh();
      setDeleteDialogOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al eliminar sponsor";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const totalUsed =
    sponsor.staffUsed + sponsor.guestUsed + sponsor.scholarshipUsed;
  const hasParticipants = totalUsed > 0;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditQuotasOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar cuotas
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/events/${eventId}/participants?sponsorId=${sponsor.id}`}
            >
              <Users className="mr-2 h-4 w-4" />
              Ver participantes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditSponsorQuotasDialog
        sponsor={sponsor}
        open={editQuotasOpen}
        onOpenChange={setEditQuotasOpen}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar sponsor?</AlertDialogTitle>
            <AlertDialogDescription>
              {hasParticipants ? (
                <>
                  El sponsor <strong>{sponsor.company.name}</strong> tiene{" "}
                  <strong>{totalUsed} participantes registrados</strong>. Al
                  eliminarlo, estos participantes perderán su asociación con el
                  sponsor.
                </>
              ) : (
                <>
                  Esta acción eliminará el sponsor{" "}
                  <strong>{sponsor.company.name}</strong> del evento.
                </>
              )}{" "}
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
