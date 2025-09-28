"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { CompaniesClient } from "@/modules/company/client";
import { Company } from "@/modules/company";

interface Props {
  company: Company;
}

export function CompanyActions({ company }: Props) {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await CompaniesClient.remove(company.id);
      toast.success("Empresa eliminada");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "No se pudo eliminar");
    }
  };

  const onEdit = () => router.push(`/dashboard/companies/${company.id}/edit`);
  const onView = () => router.push(`/dashboard/companies/${company.id}`);

  const onStatus = () => {
    const ev = new CustomEvent("open-company-status", {
      detail: { id: company.id, status: company.entityStatus },
    });
    window.dispatchEvent(ev);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>Ver</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={onStatus}>Cambiar estado</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={onDelete}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
