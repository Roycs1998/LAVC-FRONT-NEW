"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CompanyTypeLabels } from "@/modules/company/contants";
import useUpdateQueryParams from "@/hooks/use-update-query-params";

type CompanyFiltersParams = {
  search: string;
  entityStatus: string;
  type: string;
  page: string;
};

export function CompanyFilters() {
  const searchParams = useSearchParams();
  const updateParams = useUpdateQueryParams<CompanyFiltersParams>();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("entityStatus") || "all";
  const currentType = searchParams.get("type") || "all";

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

  const handleTypeChange = (value: string) => {
    updateParams({
      type: value === "all" ? null : value,
      page: "1",
    });
  };

  const clearFilters = () => {
    updateParams({
      search: null,
      entityStatus: null,
      type: null,
      page: null,
    });
  };

  const hasFilters =
    currentSearch || currentStatus !== "all" || currentType !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Buscar empresas..."
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

      <Select
        key={currentType}
        value={currentType}
        onValueChange={handleTypeChange}
      >
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          {Object.entries(CompanyTypeLabels).map(([k, v]) => (
            <SelectItem key={k} value={k}>
              {v}
            </SelectItem>
          ))}
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
