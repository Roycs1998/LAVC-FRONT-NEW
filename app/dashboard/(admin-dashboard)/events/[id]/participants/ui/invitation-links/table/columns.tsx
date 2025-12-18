"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SponsorInvitation } from "@/modules/sponsor-invitation/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import Image from "next/image";
import { InvitationActions } from "./invitation-actions";

const participantTypeLabels: Record<string, string> = {
  guest: "Invitado",
  staff: "Staff",
  scholarship: "Beca",
  operational_staff: "Staff Operativo",
};

const usageTypeLabels: Record<string, string> = {
  single: "Uso único",
  multiple: "Múltiple",
  unlimited: "Sin límite",
};

export const invitationLinksColumns: ColumnDef<SponsorInvitation>[] = [
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => {
      const code = row.getValue("code") as string;
      return (
        <div className="flex items-center gap-2">
          <code className="font-mono font-semibold text-sm bg-muted px-2 py-1 rounded">
            {code}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast.success("Código copiado al portapapeles");
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "participantType",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("participantType") as string;
      return (
        <Badge variant="outline">{participantTypeLabels[type] || type}</Badge>
      );
    },
  },
  {
    accessorKey: "ticketType",
    header: "Ticket",
    cell: ({ row }) => {
      const ticketType = row.original.ticketType;
      return (
        <div>
          <div className="font-medium">{ticketType.name}</div>
          <div className="text-sm text-muted-foreground">
            {ticketType.currency} {ticketType.price.toFixed(2)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "eventSponsor",
    header: "Sponsor",
    cell: ({ row }) => {
      const sponsor = row.original.eventSponsor;
      if (!sponsor) {
        return <span className="text-muted-foreground text-sm">-</span>;
      }
      return (
        <div className="flex items-center gap-2">
          {sponsor.company.logoUrl && (
            <Image
              src={sponsor.company.logoUrl}
              alt={sponsor.company.name}
              width={24}
              height={24}
              className="rounded object-cover"
            />
          )}
          <span className="text-sm">{sponsor.company.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "usageType",
    header: "Uso",
    cell: ({ row }) => {
      const usageType = row.getValue("usageType") as string;
      const maxUses = row.original.maxUses;
      const currentUses = row.original.currentUses;
      const remainingUses = row.original.remainingUses;

      return (
        <div>
          <div className="text-sm font-medium">
            {usageTypeLabels[usageType] || usageType}
          </div>
          {usageType === "multiple" && (
            <div className="text-xs text-muted-foreground">
              {currentUses} / {maxUses} usado{currentUses === 1 ? "" : "s"}
              {remainingUses !== undefined && ` (${remainingUses} restantes)`}
            </div>
          )}
          {usageType === "single" && (
            <div className="text-xs text-muted-foreground">
              {currentUses > 0 ? "Usado" : "Sin usar"}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "expiresAt",
    header: "Expiración",
    cell: ({ row }) => {
      const expiresAt = row.getValue("expiresAt") as string | null;
      if (!expiresAt) {
        return (
          <span className="text-sm text-muted-foreground">Sin expiración</span>
        );
      }

      const expirationDate = new Date(expiresAt);
      const isExpired = expirationDate < new Date();

      return (
        <div>
          <div className={`text-sm ${isExpired ? "text-destructive" : ""}`}>
            {format(expirationDate, "dd MMM yyyy", { locale: es })}
          </div>
          {isExpired && (
            <Badge variant="destructive" className="text-xs mt-1">
              Expirada
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Activa" : "Inactiva"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creada",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {format(new Date(createdAt), "dd MMM yyyy", { locale: es })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invitation = row.original;
      return <InvitationActions invitation={invitation} />;
    },
  },
];
