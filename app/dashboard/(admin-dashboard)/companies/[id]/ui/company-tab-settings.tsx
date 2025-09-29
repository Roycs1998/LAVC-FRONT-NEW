"use client";

import { ActionConfirmDialog } from "@/components/common/action-confirm-dialog";
import { Button } from "@/components/ui/button";
import { EntityStatus } from "@/modules/common/types";
import { Company } from "@/modules/company";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  company: Company;
}

const CompanyTabSettings = ({ company }: Props) => {
  const router = useRouter();

  const [openInactive, setOpenInactive] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const currentStatus = company.entityStatus;
  const isInactive = currentStatus == EntityStatus.INACTIVE;
  const isDeleted = currentStatus == EntityStatus.DELETED;

  return (
    <div className="rounded-lg border p-6 flex flex-col divide-y divide-accent">
      <div className="flex flex-col gap-2 pb-3">
        <h3 className="font-medium">Configuración</h3>

        <p className="text-sm text-muted-foreground">
          Acciones irreversibles para esta empresa
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Suspender empresa</span>
            <p className="text-sm text-muted-foreground">
              Desactivar temporalmente el acceso de esta empresa.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => setOpenInactive(true)}
            disabled={isInactive || isDeleted}
            title={
              isDeleted
                ? "La empresa está eliminada"
                : isInactive
                ? "La empresa ya está suspendida"
                : "Suspender"
            }
          >
            Suspender
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Eliminar empresa</span>
            <p className="text-sm text-muted-foreground">
              Eliminar definitivamente esta empresa y todos sus datos.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => setOpenDelete(true)}
            disabled={isDeleted}
            title={isDeleted ? "La empresa ya está eliminada" : "Eliminar"}
          >
            Eliminar
          </Button>
        </div>
      </div>

      <ActionConfirmDialog
        open={openInactive}
        onOpenChange={setOpenInactive}
        title="Suspender empresa"
        description="¿Seguro que deseas suspender esta empresa? Podrás reactivarla más adelante."
        confirmLabel="Suspender"
        confirmVariant="destructive"
        url={`${process.env.NEXT_PUBLIC_API_URL}/companies/${company.id}/status`}
        method="PATCH"
        payload={{ entityStatus: EntityStatus.INACTIVE }}
        successMessage="Empresa suspendida con éxito."
        onSuccess={() => router.refresh()}
      />

      <ActionConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Eliminar empresa"
        description="Esta acción es irreversible. Se eliminará la empresa y todos sus datos asociados."
        confirmLabel="Eliminar definitivamente"
        confirmVariant="destructive"
        url={`${process.env.NEXT_PUBLIC_API_URL}/companies/${company.id}`}
        method="DELETE"
        payload={{ entityStatus: EntityStatus.INACTIVE }}
        successMessage="Empresa eliminada correctamente."
        onSuccess={() => router.push("/dashboard/companies")}
      />
    </div>
  );
};

export default CompanyTabSettings;
