"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";
import useUpdateQueryParams from "@/hooks/use-update-query-params";

type SpeakerFiltersParams = {
  search: string;
  entityStatus: string;
  page: string;
};

export function SpeakerFilters() {
  const searchParams = useSearchParams();
  const updateParams = useUpdateQueryParams<SpeakerFiltersParams>();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("entityStatus") || "all";

  const handleSearchChange = (value: string) => {
    updateParams({
      search: value || null,
      page: value ? "1" : null,
    });
  };

  const handleStatusChange = (value: string) => {
    updateParams({
      entityStatus: value === "all" ? null : value,
      page: "1",
    });
  };

  const clearFilters = () => {
    updateParams({
      search: null,
      entityStatus: null,
      page: null,
    });
  };

  const hasFilters = currentSearch || currentStatus !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Nombre, empresa, especialidad…"
        value={currentSearch}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="sm:max-w-xs"
      />

      <Select
        key={currentStatus}
        value={currentStatus}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="active">Activo</SelectItem>
          <SelectItem value="inactive">Inactivo</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="sm:w-auto">
          <X className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
