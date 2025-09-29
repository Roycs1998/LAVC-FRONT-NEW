"use client";
import { Company } from "@/modules/company";
import { ColumnDef } from "@tanstack/react-table";
import { CompanyStatusBadge } from "../company-status-bagde";
import { CompanyActions } from "./company-actions";
import { CompanyTypeLabels } from "@/modules/company/contants";

export const companiesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => (
      <span className="capitalize">{CompanyTypeLabels[row.original.type]}</span>
    ),
  },
  {
    id: "contact",
    header: "Contacto",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div>
          {c.contactName || "-"}
          <div className="text-xs text-muted-foreground">
            {c.contactEmail || c.contactPhone || ""}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "entityStatus",
    header: "Estado",
    cell: ({ row }) => (
      <CompanyStatusBadge status={row.original.entityStatus} />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="text-right">
        <CompanyActions company={row.original} />
      </div>
    ),
  },
];
