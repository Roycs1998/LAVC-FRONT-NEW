"use client";

import { useState } from "react";
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
import { MoreHorizontal, Copy, Ban, Check } from "lucide-react";
import { SponsorInvitationLink, SponsorClient } from "@/modules/sponsor";
import { toast } from "sonner";

interface InvitationLinkActionsProps {
  link: SponsorInvitationLink;
}

export function InvitationLinkActions({ link }: InvitationLinkActionsProps) {
  const router = useRouter();
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = `${window.location.origin}/register?code=${link.code}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Enlace copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await SponsorClient.deactivateInvitationLink(
        link.eventId,
        link.sponsorId,
        link.id
      );
      toast.success("Enlace desactivado exitosamente");
      router.refresh();
      setDeactivateDialogOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al desactivar enlace";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const expiryDate = link.expiresAt ? new Date(link.expiresAt) : null;
  const isExpired = expiryDate ? expiryDate < new Date() : false;
  const isFull = link.currentUses >= link.maxUses;
  const canDeactivate = link.isActive && !isExpired && !isFull;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar enlace
              </>
            )}
          </DropdownMenuItem>
          {canDeactivate && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeactivateDialogOpen(true)}
              >
                <Ban className="mr-2 h-4 w-4" />
                Desactivar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desactivar enlace?</AlertDialogTitle>
            <AlertDialogDescription>
              El enlace de invitación para{" "}
              <strong>{link.sponsor.company.name}</strong> será desactivado y ya
              no podrá ser utilizado. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeactivate}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Desactivando..." : "Desactivar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
