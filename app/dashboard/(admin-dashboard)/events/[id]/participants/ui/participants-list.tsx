"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { EventParticipant, ParticipantClient } from "@/modules/participant";
import { PARTICIPANT_TYPE_LABELS } from "@/modules/invitation";
import { toast } from "sonner";
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
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ParticipantsListProps {
  eventId: string;
  participants: EventParticipant[];
  onRefresh: () => void;
}

export function ParticipantsList({
  eventId,
  participants,
  onRefresh,
}: ParticipantsListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<EventParticipant | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedParticipant) return;

    setIsDeleting(true);
    try {
      await ParticipantClient.removeOperationalStaff(
        eventId,
        selectedParticipant.id
      );
      toast.success("Staff operativo removido exitosamente");
      onRefresh();
      setDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al remover staff");
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (participant: EventParticipant) => {
    setSelectedParticipant(participant);
    setDeleteDialogOpen(true);
  };

  if (participants.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No hay participantes registrados</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Sponsor</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">
                  {participant.user.person.firstName}{" "}
                  {participant.user.person.lastName}
                </TableCell>
                <TableCell>{participant.user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {PARTICIPANT_TYPE_LABELS[participant.participantType]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {participant.eventSponsor?.company.name || "-"}
                </TableCell>
                <TableCell>
                  {format(new Date(participant.registeredAt), "PPP", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  {participant.isActive ? (
                    <span className="text-green-600 text-sm">Activo</span>
                  ) : (
                    <span className="text-gray-500 text-sm">Inactivo</span>
                  )}
                </TableCell>
                <TableCell>
                  {participant.participantType === "operational_staff" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => openDeleteDialog(participant)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción removerá a{" "}
              <strong>
                {selectedParticipant?.user.person.firstName}{" "}
                {selectedParticipant?.user.person.lastName}
              </strong>{" "}
              como staff operativo del evento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Removiendo..." : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
