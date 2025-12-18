"use client";

import { Event, EventStatus, EventStatusLabels } from "@/modules/event";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { EventActions } from "./event-actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const getStatusBadgeVariant = (status: EventStatus) => {
  switch (status) {
    case EventStatus.DRAFT:
      return "secondary";
    case EventStatus.PENDING_APPROVAL:
      return "outline";
    case EventStatus.APPROVED:
      return "default";
    case EventStatus.PUBLISHED:
      return "default";
    case EventStatus.REJECTED:
      return "destructive";
    case EventStatus.CANCELLED:
      return "destructive";
    case EventStatus.COMPLETED:
      return "secondary";
    default:
      return "secondary";
  }
};

export const eventsColumns = (isPlatformAdmin: boolean): ColumnDef<Event>[] => [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "company",
    header: "Empresa",
    cell: ({ row }) => <span>{row.original.company?.name || "-"}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Fecha",
    cell: ({ row }) => (
      <span>
        {format(new Date(row.original.startDate), "PPP", { locale: es })}
      </span>
    ),
  },
  {
    accessorKey: "eventStatus",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.original.eventStatus)}>
        {EventStatusLabels[row.original.eventStatus]}
      </Badge>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Capacidad",
    cell: ({ row }) => <span>{row.original.capacity || "-"}</span>,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="text-right">
        <EventActions event={row.original} isPlatformAdmin={isPlatformAdmin} />
      </div>
    ),
  },
];
