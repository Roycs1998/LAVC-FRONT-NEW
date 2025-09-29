"use client";

import { Speaker } from "@/modules/speaker/types";
import { speakersColumns } from "./columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "@/components/common/data-table";

interface Props {
  data: Speaker[];
  currentPage: number;
  totalPages: number;
}

const SpeakerTable = ({ data, currentPage, totalPages }: Props) => {
  const columns = speakersColumns;

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
};

export default SpeakerTable;
