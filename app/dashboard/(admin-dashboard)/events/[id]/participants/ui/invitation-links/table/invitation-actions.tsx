"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, X, Check } from "lucide-react";
import { toast } from "sonner";
import { SponsorInvitation } from "@/modules/sponsor-invitation/types";
import { SponsorClient } from "@/modules/sponsor";

interface InvitationActionsProps {
  invitation: SponsorInvitation;
}

export function InvitationActions({ invitation }: InvitationActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleActive = async () => {
    if (!invitation.eventSponsorId) {
      toast.error("No se puede actualizar esta invitación");
      return;
    }

    setIsLoading(true);
    try {
      // Toggle the isActive state
      await SponsorClient.updateInvitation(
        invitation.eventId,
        invitation.eventSponsorId,
        invitation.id,
        { isActive: !invitation.isActive }
      );

      toast.success(
        invitation.isActive ? "Invitación desactivada" : "Invitación activada"
      );
      router.refresh();
    } catch (error) {
      toast.error("Error al actualizar la invitación");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_URL}/invite/${invitation.code}`
            );
            toast.success("Enlace copiado");
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar enlace
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(invitation.code);
            toast.success("Código copiado");
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar código
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToggleActive} disabled={isLoading}>
          {invitation.isActive ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Desactivar
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Activar
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
