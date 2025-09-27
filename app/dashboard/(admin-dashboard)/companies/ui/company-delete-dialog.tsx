"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { CompaniesClient } from "@/modules/company/client";

type Props = { id: string; open: boolean; onOpenChange: (v: boolean) => void };

export function CompanyDeleteDialog({ id, open, onOpenChange }: Props) {
  const router = useRouter();

  const onConfirm = async () => {
    try {
      await CompaniesClient.remove(id);
      toast.success("Eliminada");
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error al eliminar");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar empresa?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
