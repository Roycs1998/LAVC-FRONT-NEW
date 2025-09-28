"use client";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CompaniesClient } from "@/modules/company/client";
import { EntityStatus } from "@/modules/common/types";

export function CompanyStatusDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [status, setStatus] = useState<EntityStatus>(EntityStatus.ACTIVE);

  useEffect(() => {
    const handler = (e: any) => {
      setId(e.detail.id);
      setStatus(() => e.detail.status);
      setOpen(() => true);
    };
    window.addEventListener("open-company-status", handler as any);
    return () =>
      window.removeEventListener("open-company-status", handler as any);
  }, []);

  const onSave = async () => {
    if (!id) return;
    try {
      await CompaniesClient.changeStatus(id, { entityStatus: status });
      toast.success("Estado actualizado");
      setOpen(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error al cambiar estado");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar estado</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Estado</Label>
          <Select value={status} onValueChange={(v: any) => setStatus(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activa</SelectItem>
              <SelectItem value="inactive">Inactiva</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
