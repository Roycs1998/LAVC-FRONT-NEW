"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EventSponsor } from "@/modules/sponsor";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SponsorActions } from "./sponsor-actions";

const getQuotaPercentage = (used: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
};

const QuotaCell = ({ used, total }: { used: number; total: number }) => {
  const percentage = getQuotaPercentage(used, total);
  const isNearLimit = percentage >= 80;
  const isFull = percentage >= 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className={isFull ? "text-destructive font-medium" : ""}>
          {used} / {total}
        </span>
        <span className="text-muted-foreground text-xs">{percentage}%</span>
      </div>
      <Progress
        value={percentage}
        className={`h-1.5 ${
          isFull
            ? "[&>div]:bg-destructive"
            : isNearLimit
            ? "[&>div]:bg-yellow-500"
            : ""
        }`}
      />
    </div>
  );
};

export const getColumns = (eventId: string): ColumnDef<EventSponsor>[] => [
  {
    accessorKey: "company.name",
    header: "Empresa",
    cell: ({ row }) => {
      const sponsor = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{sponsor.company.name}</span>
          {sponsor.company.contactEmail && (
            <span className="text-xs text-muted-foreground">
              {sponsor.company.contactEmail}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "staffQuota",
    header: "Cuota Staff",
    cell: ({ row }) => {
      const sponsor = row.original;
      return <QuotaCell used={sponsor.staffUsed} total={sponsor.staffQuota} />;
    },
  },
  {
    accessorKey: "guestQuota",
    header: "Cuota Invitados",
    cell: ({ row }) => {
      const sponsor = row.original;
      return <QuotaCell used={sponsor.guestUsed} total={sponsor.guestQuota} />;
    },
  },
  {
    accessorKey: "scholarshipQuota",
    header: "Cuota Becas",
    cell: ({ row }) => {
      const sponsor = row.original;
      return (
        <QuotaCell
          used={sponsor.scholarshipUsed}
          total={sponsor.scholarshipQuota}
        />
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const sponsor = row.original;
      return sponsor.isActive ? (
        <Badge variant="default" className="bg-green-600">
          Activo
        </Badge>
      ) : (
        <Badge variant="secondary">Inactivo</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sponsor = row.original;
      return <SponsorActions sponsor={sponsor} eventId={eventId} />;
    },
  },
];
