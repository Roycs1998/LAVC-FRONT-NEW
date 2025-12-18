"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EventParticipant } from "@/modules/participant/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  InvitationParticipantType,
  PARTICIPANT_TYPE_LABELS,
} from "@/modules/invitation";

const getTypeLabel = (type: InvitationParticipantType): string => {
  return PARTICIPANT_TYPE_LABELS[type] || type;
};

const getTypeVariant = (
  type: InvitationParticipantType
): "default" | "secondary" | "outline" => {
  const variants: Record<
    InvitationParticipantType,
    "default" | "secondary" | "outline"
  > = {
    staff: "default",
    guest: "secondary",
    scholarship: "outline",
    regular: "secondary",
    operational_staff: "default",
  };
  return variants[type] || "default";
};

export const columns: ColumnDef<EventParticipant>[] = [
  {
    accessorKey: "user.person",
    header: "Participante",
    cell: ({ row }) => {
      const participant = row.original;

      const { firstName, lastName, phone } = participant.user.person;

      if (!participant.user.person) {
        return <span className="text-muted-foreground text-sm">-</span>;
      }

      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {firstName} {lastName}
          </span>
          <span className="text-xs text-muted-foreground">
            {participant.user.email}
          </span>
          {phone && (
            <span className="text-xs text-muted-foreground">{phone}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "participantType",
    header: "Tipo",
    cell: ({ row }) => {
      const participant = row.original;
      return (
        <Badge variant={getTypeVariant(participant.participantType)}>
          {getTypeLabel(participant.participantType)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "eventSponsor",
    header: "Sponsor",
    cell: ({ row }) => {
      const participant = row.original;
      if (!participant.eventSponsor) {
        return <span className="text-muted-foreground text-sm">-</span>;
      }
      return (
        <span className="text-sm">{participant.eventSponsor.company.name}</span>
      );
    },
  },
  {
    accessorKey: "registeredAt",
    header: "Fecha de Registro",
    cell: ({ row }) => {
      const participant = row.original;
      return (
        <span className="text-sm">
          {format(new Date(participant.registeredAt), "PPP", { locale: es })}
        </span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const participant = row.original;
      return participant.isActive ? (
        <Badge className="bg-green-600">Activo</Badge>
      ) : (
        <Badge variant="destructive">Inactivo</Badge>
      );
    },
  },
];
