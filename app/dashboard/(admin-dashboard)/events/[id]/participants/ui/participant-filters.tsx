"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParticipantType, PARTICIPANT_TYPE_LABELS } from "@/modules/invitation";
import { ParticipantFilters } from "@/modules/participant";

interface ParticipantFiltersProps {
  filters: ParticipantFilters;
  onFiltersChange: (filters: ParticipantFilters) => void;
}

export function ParticipantFiltersComponent({
  filters,
  onFiltersChange,
}: ParticipantFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={filters.participantType || "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            participantType: value === "all" ? undefined : (value as ParticipantType),
          })
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tipo de participante" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          {Object.entries(PARTICIPANT_TYPE_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.isActive === undefined ? "all" : filters.isActive.toString()}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            isActive: value === "all" ? undefined : value === "true",
          })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="true">Activos</SelectItem>
          <SelectItem value="false">Inactivos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
