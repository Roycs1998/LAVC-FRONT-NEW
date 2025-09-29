"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Eye,
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Company } from "@/modules/company";
import { EntityStatus } from "@/modules/common/types";
import { useMemo, useState } from "react";
import { ActionConfirmDialog } from "@/components/common/action-confirm-dialog";

interface Props {
  company: Company;
}

export function CompanyActions({ company }: Props) {
  const router = useRouter();

  const onEdit = () => router.push(`/dashboard/companies/${company.id}/edit`);
  const onView = () => router.push(`/dashboard/companies/${company.id}`);

  const [statusTarget, setStatusTarget] = useState<null | EntityStatus>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const isActive = company.entityStatus === EntityStatus.ACTIVE;
  const isInactive = company.entityStatus === EntityStatus.INACTIVE;
  const isDeleted = company.entityStatus === EntityStatus.DELETED;

  const statusDialog = useMemo(() => {
    if (statusTarget === EntityStatus.ACTIVE) {
      return {
        title: "Reactivar empresa",
        description: "La empresa podrá volver a tener acceso a la plataforma.",
        confirmLabel: "Activar",
        confirmVariant: "default" as const,
        payload: { entityStatus: EntityStatus.ACTIVE },
      };
    }
    if (statusTarget === EntityStatus.INACTIVE) {
      return {
        title: "Cambiar estado de la empresa a inactiva",
        description:
          "La empresa no podrá ser asignada a nuevos eventos hasta que se reactive.",
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
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            Ver
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onEdit}>
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
          url={`${process.env.NEXT_PUBLIC_API_URL}/companies/${company.id}/status`}
          method="PATCH"
          payload={statusDialog.payload}
          successMessage="Estado actualizado"
          onSuccess={() => router.refresh()}
        />
      )}

      <ActionConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Eliminar empresa"
        description="Esta acción es irreversible y eliminará la empresa de la plataforma."
        confirmLabel="Eliminar definitivamente"
        confirmVariant="destructive"
        url={`${process.env.NEXT_PUBLIC_API_URL}/companies/${company.id}`}
        method="DELETE"
        payload={{ entityStatus: EntityStatus.DELETED }}
        successMessage="Empresa eliminada"
        onSuccess={() => router.refresh()}
      />
    </>
  );
}
