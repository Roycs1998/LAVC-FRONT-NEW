import { Speaker } from "@/modules/speaker/types";
import { ColumnDef } from "@tanstack/react-table";
import SpeakerStatusBadge from "../speaker-status-badge";
import { SpeakerActions } from "./speaker-actions";

export const speakersColumns: ColumnDef<Speaker>[] = [
  {
    id: "person",
    header: "Expositor",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div>
          <div className="font-medium">
            {s.person?.fullName ||
              `${s.person?.firstName ?? ""} ${
                s.person?.lastName ?? ""
              }`.trim() ||
              "—"}
          </div>
          <div className="text-xs text-muted-foreground">
            {s.specialty || s.biography?.slice(0, 60) || "—"}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "company",
    header: "Empresa",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.company?.name ?? "—"}</span>
    ),
    enableSorting: false,
  },
  {
    id: "contact",
    header: "Contacto",
    cell: ({ row }) => {
      const p = row.original.person;
      return (
        <div className="text-sm">
          {p?.phone ? (
            <div className="text-muted-foreground">{p.phone}</div>
          ) : (
            "—"
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "entityStatus",
    header: "Estado",
    cell: ({ row }) => (
      <SpeakerStatusBadge status={row.original.entityStatus} />
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right">
        <SpeakerActions speaker={row.original} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
