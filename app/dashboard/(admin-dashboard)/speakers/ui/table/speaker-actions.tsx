"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Edit,
  ShieldAlert,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ActionConfirmDialog } from "@/components/common/action-confirm-dialog";
import { Speaker } from "@/modules/speaker/types";
import { EntityStatus } from "@/modules/common/types";
import { useMemo, useState } from "react";

interface Props {
  speaker: Speaker;
}

export function SpeakerActions({ speaker }: Props) {
  const router = useRouter();

  const [openDelete, setOpenDelete] = useState(false);
  const [statusTarget, setStatusTarget] = useState<null | EntityStatus>(null);

  const isActive = speaker.entityStatus === EntityStatus.ACTIVE;
  const isInactive = speaker.entityStatus === EntityStatus.INACTIVE;
  const isDeleted = speaker.entityStatus === EntityStatus.DELETED;

  const statusDialog = useMemo(() => {
    if (statusTarget === EntityStatus.ACTIVE) {
      return {
        title: "Reactivar expositor",
        description:
          "El expositor podrá volver a ser asignado a nuevos eventos.",
        confirmLabel: "Activar",
        confirmVariant: "default" as const,
        payload: { entityStatus: EntityStatus.ACTIVE },
      };
    }
    if (statusTarget === EntityStatus.INACTIVE) {
      return {
        title: "Cambiar estado a inactivo",
        description:
          "El expositor no podrá ser asignado a nuevos eventos hasta reactivarlo.",
        confirmLabel: "Inactivar",
        confirmVariant: "destructive" as const,
        payload: { entityStatus: EntityStatus.INACTIVE },
      };
    }
    return null;
  }, [statusTarget]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Acciones">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/speakers/${speaker.id}`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/speakers/${speaker.id}/edit`)
            }
            disabled={isDeleted}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isActive && (
            <DropdownMenuItem
              onClick={() => setStatusTarget(EntityStatus.INACTIVE)}
              disabled={isDeleted}
            >
              <ShieldAlert className="h-4 w-4 mr-2" />
              Cambiar a inactivo
            </DropdownMenuItem>
          )}

          {isInactive && (
            <DropdownMenuItem
              onClick={() => setStatusTarget(EntityStatus.ACTIVE)}
              disabled={isDeleted}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Activar
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            disabled={isDeleted}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {statusDialog && (
        <ActionConfirmDialog
          open={statusTarget !== null}
          onOpenChange={(open) => setStatusTarget(open ? statusTarget : null)}
          title={statusDialog.title}
          description={statusDialog.description}
          confirmLabel={statusDialog.confirmLabel}
          confirmVariant={statusDialog.confirmVariant}
          url={`${process.env.NEXT_PUBLIC_API_URL}/speakers/${speaker.id}/status`}
          method="PATCH"
          payload={statusDialog.payload}
          successMessage="Estado actualizado"
          onSuccess={() => router.refresh()}
        />
      )}

      <ActionConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Eliminar expositor"
        description="Esta acción es irreversible y eliminará al expositor de la plataforma."
        confirmLabel="Eliminar definitivamente"
        confirmVariant="destructive"
        url={`${process.env.NEXT_PUBLIC_API_URL}/speakers/${speaker.id}`}
        method="DELETE"
        payload={{ entityStatus: EntityStatus.DELETED }}
        successMessage="Expositor eliminado"
        onSuccess={() => router.refresh()}
      />
    </>
  );
}
