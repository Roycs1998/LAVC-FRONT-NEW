"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { SponsorInvitation } from "@/modules/sponsor-invitation/types";
import { invitationLinksColumns } from "./columns";
import DataTable from "@/components/common/data-table";

interface InvitationLinksTableContentProps {
  invitations: SponsorInvitation[];
  currentPage: number;
  totalPages: number;
  hasActiveFilters?: boolean;
}

export function InvitationLinksTableContent({
  invitations,
  currentPage,
  totalPages,
}: InvitationLinksTableContentProps) {
  const table = useReactTable({
    data: invitations,
    columns: invitationLinksColumns,
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
