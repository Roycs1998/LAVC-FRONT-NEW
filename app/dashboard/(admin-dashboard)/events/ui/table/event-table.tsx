"use client";

import { Event } from "@/modules/event";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { eventsColumns } from "./columns";
import DataTable from "@/components/common/data-table";

interface Props {
  data: Event[];
  currentPage: number;
  totalPages: number;
  isPlatformAdmin?: boolean;
}

export function EventTable({
  data,
  currentPage,
  totalPages,
  isPlatformAdmin = false,
}: Props) {
  const columns = eventsColumns(isPlatformAdmin);

  const table = useReactTable({
    data,
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
