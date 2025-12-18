"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import {
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  CheckCircle,
  XCircle,
  Trash2,
  Users,
  Briefcase,
  QrCode,
} from "lucide-react";
import { Event, EventStatus, EventsClient } from "@/modules/event";
import { toast } from "sonner";

interface EventActionsProps {
  event: Event;
  isPlatformAdmin?: boolean;
}

export function EventActions({
  event,
  isPlatformAdmin = false,
}: EventActionsProps) {
  const router = useRouter();
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "submit" | "approve" | "reject" | "publish" | "delete" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (!actionType) return;

    setIsLoading(true);
    try {
      switch (actionType) {
        case "submit":
          // If event is rejected, first change to draft, then submit
          if (event.eventStatus === EventStatus.REJECTED) {
            await EventsClient.changeStatus(event.id, {
              eventStatus: EventStatus.DRAFT,
            });
          }
          await EventsClient.submit(event.id);
          toast.success("Evento enviado a revisión");
          break;
        case "approve":
          await EventsClient.changeStatus(event.id, {
            eventStatus: EventStatus.APPROVED,
          });
          toast.success("Evento aprobado");
          break;
        case "reject":
          await EventsClient.changeStatus(event.id, {
            eventStatus: EventStatus.REJECTED,
            rejectionReason: "Rechazado por el administrador",
          });
          toast.success("Evento rechazado");
          break;
        case "publish":
          await EventsClient.publish(event.id);
          toast.success("Evento publicado");
          break;
        case "delete":
          await EventsClient.delete(event.id);
          toast.success("Evento eliminado");
          break;
      }
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al realizar la acción";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setActionDialogOpen(false);
      setActionType(null);
    }
  };

  const openActionDialog = (action: typeof actionType) => {
    setActionType(action);
    setActionDialogOpen(true);
  };

  const getActionTitle = () => {
    switch (actionType) {
      case "submit":
        return "¿Enviar a revisión?";
      case "approve":
        return "¿Aprobar evento?";
      case "reject":
        return "¿Rechazar evento?";
      case "publish":
        return "¿Publicar evento?";
      case "delete":
        return "¿Eliminar evento?";
      default:
        return "";
    }
  };

  const getActionDescription = () => {
    switch (actionType) {
      case "submit":
        return event.eventStatus === EventStatus.REJECTED
          ? `El evento "${event.title}" será cambiado a borrador y luego enviado a revisión. No podrá ser editado hasta que sea aprobado o rechazado nuevamente.`
          : `El evento "${event.title}" será enviado a revisión y no podrá ser editado hasta que sea aprobado o rechazado.`;
      case "approve":
        return `El evento "${event.title}" será aprobado y estará listo para ser publicado.`;
      case "reject":
        return `El evento "${event.title}" será rechazado y deberá ser revisado por el creador.`;
      case "publish":
        return `El evento "${event.title}" será publicado y visible para todos los usuarios.`;
      case "delete":
        return `El evento "${event.title}" será eliminado permanentemente. Esta acción no se puede deshacer.`;
      default:
        return "";
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/events/${event.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </Link>
          </DropdownMenuItem>

          {event.eventStatus === EventStatus.PUBLISHED && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event.id}/participants`}>
                  <Users className="mr-2 h-4 w-4" />
                  Participantes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event.id}/sponsors`}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Sponsors
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event.id}/check-in`}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Check-in
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {(event.eventStatus === EventStatus.DRAFT ||
            event.eventStatus === EventStatus.REJECTED ||
            isPlatformAdmin) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {event.eventStatus === EventStatus.DRAFT && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openActionDialog("submit")}>
                <Send className="mr-2 h-4 w-4" />
                Enviar a revisión
              </DropdownMenuItem>
            </>
          )}

          {isPlatformAdmin && (
            <>
              {event.eventStatus === EventStatus.PENDING_APPROVAL && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => openActionDialog("approve")}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Aprobar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openActionDialog("reject")}
                    className="text-destructive"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Rechazar
                  </DropdownMenuItem>
                </>
              )}

              {event.eventStatus === EventStatus.APPROVED && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => openActionDialog("publish")}>
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    Publicar
                  </DropdownMenuItem>
                </>
              )}
            </>
          )}

          {/* Delete - Only for DRAFT */}
          {event.eventStatus === EventStatus.DRAFT && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => openActionDialog("delete")}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getActionTitle()}</AlertDialogTitle>
            <AlertDialogDescription>
              {getActionDescription()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              disabled={isLoading}
              className={
                actionType === "delete" || actionType === "reject"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {isLoading ? "Procesando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
