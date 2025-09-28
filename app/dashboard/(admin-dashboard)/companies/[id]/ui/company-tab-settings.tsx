import { Button } from "@/components/ui/button";
import React from "react";

const CompanyTabSettings = () => {
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
          <Button variant="outline" size="sm">
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
          <Button variant="outline" size="sm">
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyTabSettings;
