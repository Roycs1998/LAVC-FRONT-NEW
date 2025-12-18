"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventStatusLabels } from "@/modules/event";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useUpdateQueryParams from "@/hooks/use-update-query-params";

type EventFiltersParams = {
  search: string;
  eventStatus: string;
  page: string;
};

export function EventFilters() {
  const searchParams = useSearchParams();
  const updateParams = useUpdateQueryParams<EventFiltersParams>();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("eventStatus") || "all";

  const handleSearchChange = (value: string) => {
    updateParams({
      search: value || null,
      page: value ? "1" : null,
    });
  };

  const handleStatusChange = (value: string) => {
    updateParams({
      eventStatus: value === "all" ? null : value,
      page: "1",
    });
  };

  const clearFilters = () => {
    updateParams({
      search: null,
      eventStatus: null,
      page: null,
    });
  };

  const hasFilters = currentSearch || currentStatus !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Buscar por título..."
        value={currentSearch}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="sm:max-w-xs"
      />

      <Select
        key={currentStatus} // Force re-render when status changes
        value={currentStatus}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="sm:w-[200px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          {Object.entries(EventStatusLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
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
