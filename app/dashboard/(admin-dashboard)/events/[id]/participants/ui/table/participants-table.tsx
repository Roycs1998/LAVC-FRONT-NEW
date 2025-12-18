"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PaginatedParticipants } from "@/modules/participant/types";
import { EventSponsor } from "@/modules/sponsor/types";
import { UserRole } from "@/modules/user";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { AssignStaffButton } from "../assign-staff-button";
import { ParticipantsTableContent } from "./participants-table-content";
import { useState } from "react";

interface ParticipantsTableProps {
  participantsData: PaginatedParticipants;
  sponsors: EventSponsor[];
  eventId: string;
}

export function ParticipantsTable({
  participantsData,
  sponsors,
  eventId,
}: ParticipantsTableProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const isPlatformAdmin = session?.user?.roles.includes(
    UserRole.PLATFORM_ADMIN
  );
  const isCompanyAdmin = session?.user?.roles.includes(UserRole.COMPANY_ADMIN);
  const userCompanyId = session?.user?.company?.id;

  const availableSponsors = isPlatformAdmin
    ? sponsors
    : sponsors.filter((s) => s.company.id === userCompanyId);

  const currentSponsorId = searchParams.get("sponsorId");
  const currentParticipantType = searchParams.get("participantType");
  const currentIsActive = searchParams.get("isActive");

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    if (!updates.page) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    updateFilters({ search: searchInput || null });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearAllFilters = () => {
    setSearchInput("");
    router.push(pathname);
  };

  const hasActiveFilters =
    currentSponsorId ||
    currentParticipantType ||
    currentIsActive ||
    searchInput;

  const { data: participants, meta } = participantsData;

  // Calculate stats from current page data
  const activeParticipants = participants.filter((p) => p.isActive);
  const byType = participants.reduce((acc, p) => {
    acc[p.participantType] = (acc[p.participantType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Header with Assign Staff Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Participantes</h3>
          <p className="text-sm text-muted-foreground">
            {meta.total} participante{meta.total === 1 ? "" : "s"} en total
          </p>
        </div>
        <AssignStaffButton eventId={eventId} />
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
        {searchInput && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSearchInput("");
              updateFilters({ search: null });
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Sponsor Filter */}
        {(isPlatformAdmin ||
          (isCompanyAdmin && availableSponsors.length > 0)) && (
          <Select
            value={currentSponsorId || "all"}
            onValueChange={(value) =>
              updateFilters({ sponsorId: value === "all" ? null : value })
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sponsor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los sponsors</SelectItem>
              {availableSponsors.map((sponsor) => (
                <SelectItem key={sponsor.id} value={sponsor.id}>
                  {sponsor.company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Participant Type Filter */}
        <Select
          value={currentParticipantType || "all"}
          onValueChange={(value) =>
            updateFilters({
              participantType: value === "all" ? null : value,
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="guest">Invitado</SelectItem>
            <SelectItem value="scholarship">Beca</SelectItem>
            <SelectItem value="speaker">Ponente</SelectItem>
            <SelectItem value="sponsor_staff">Staff Sponsor</SelectItem>
            <SelectItem value="operational_staff">Staff Operativo</SelectItem>
          </SelectContent>
        </Select>

        {/* Active Status Filter */}
        <Select
          value={currentIsActive || "all"}
          onValueChange={(value) =>
            updateFilters({ isActive: value === "all" ? null : value })
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

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{meta.total}</div>
            <p className="text-xs text-muted-foreground">Total Participantes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {activeParticipants.length}
            </div>
            <p className="text-xs text-muted-foreground">Activos (página)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{byType.staff || 0}</div>
            <p className="text-xs text-muted-foreground">Staff (página)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{byType.guest || 0}</div>
            <p className="text-xs text-muted-foreground">Invitados (página)</p>
          </CardContent>
        </Card>
      </div>

      {/* Table with Pagination */}
      <ParticipantsTableContent
        participants={participants}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        hasActiveFilters={!!hasActiveFilters}
      />
    </div>
  );
}
