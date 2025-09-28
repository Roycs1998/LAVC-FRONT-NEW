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
import {
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { companiesColumns } from "./table/columns";
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
