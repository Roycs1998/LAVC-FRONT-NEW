"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Company } from "@/modules/company";
import { CompanyStatusBadge } from "./company-status-bagde";
import { CompanyActions } from "./company-actions";

export function CompanyTable({ items }: { items: Company[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>{c.type}</TableCell>
            <TableCell>
              {c.contactName || "-"}
              <br />
              <span className="text-xs text-muted-foreground">
                {c.contactEmail || c.contactPhone || ""}
              </span>
            </TableCell>
            <TableCell>
              <CompanyStatusBadge status={c.entityStatus} />
            </TableCell>
            <TableCell className="text-right">
              <CompanyActions id={c.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
