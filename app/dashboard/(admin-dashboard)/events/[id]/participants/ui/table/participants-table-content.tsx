"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { EventParticipant } from "@/modules/participant/types";
import { columns } from "./columns";
import DataTable from "@/components/common/data-table";

interface ParticipantsTableContentProps {
  participants: EventParticipant[];
  currentPage: number;
  totalPages: number;
  hasActiveFilters?: boolean;
}

export function ParticipantsTableContent({
  participants,
  currentPage,
  totalPages,
}: ParticipantsTableContentProps) {
  const table = useReactTable({
    data: participants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <DataTable
      table={table}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
