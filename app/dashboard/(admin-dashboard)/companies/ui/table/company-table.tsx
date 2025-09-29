"use client";

import { Company } from "@/modules/company";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { companiesColumns } from "./columns";
import DataTable from "@/components/common/data-table";

interface Props {
  data: Company[];
  currentPage: number;
  totalPages: number;
}

export function CompanyTable({ data, currentPage, totalPages }: Props) {
  const columns = companiesColumns;

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
