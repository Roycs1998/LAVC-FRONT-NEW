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
import { PaginatedInvitations } from "@/modules/sponsor-invitation/types";
import { EventSponsor } from "@/modules/sponsor/types";
import { UserRole } from "@/modules/user";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { InvitationLinksTableContent } from "./invitation-links-table-content";
import { CreateInvitationLinkButton } from "../create-invitation-link-button";
import { useState } from "react";

interface InvitationLinksTableProps {
  invitationsData: PaginatedInvitations;
  sponsors: EventSponsor[];
  eventId: string;
}

export function InvitationLinksTable({
  invitationsData,
  sponsors,
  eventId,
}: InvitationLinksTableProps) {
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
  const currentUsageType = searchParams.get("usageType");
  const currentIsActive = searchParams.get("isActive");
  const currentIsExpired = searchParams.get("isExpired");
  const currentHasAvailableUses = searchParams.get("hasAvailableUses");

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

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
    currentUsageType ||
    currentIsActive ||
    currentIsExpired ||
    currentHasAvailableUses ||
    searchInput;

  const { data: invitations, meta } = invitationsData;

  // Calculate stats from current page data
  const activeInvitations = invitations.filter((i) => i.isActive);
  const multipleUseInvitations = invitations.filter(
    (i) => i.usageType === "multiple"
  );
  const availableInvitations = invitations.filter(
    (i) =>
      i.isActive &&
      (i.usageType === "single"
        ? i.currentUses === 0
        : (i.remainingUses || 0) > 0)
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Enlaces de Invitación</h3>
          <p className="text-sm text-muted-foreground">
            {meta.total} invitación{meta.total === 1 ? "" : "es"} en total
          </p>
        </div>
        <CreateInvitationLinkButton eventId={eventId} sponsors={sponsors} />
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código de invitación..."
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
            <SelectItem value="operational_staff">Staff Operativo</SelectItem>
          </SelectContent>
        </Select>

        {/* Usage Type Filter */}
        <Select
          value={currentUsageType || "all"}
          onValueChange={(value) =>
            updateFilters({ usageType: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Uso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="single">Uso único</SelectItem>
            <SelectItem value="multiple">Múltiple</SelectItem>
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
            <SelectItem value="true">Activas</SelectItem>
            <SelectItem value="false">Inactivas</SelectItem>
          </SelectContent>
        </Select>

        {/* Expired Filter */}
        <Select
          value={currentIsExpired || "all"}
          onValueChange={(value) =>
            updateFilters({ isExpired: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Expiración" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="false">Vigentes</SelectItem>
            <SelectItem value="true">Expiradas</SelectItem>
          </SelectContent>
        </Select>

        {/* Available Uses Filter */}
        <Select
          value={currentHasAvailableUses || "all"}
          onValueChange={(value) =>
            updateFilters({
              hasAvailableUses: value === "all" ? null : value,
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disponibilidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="true">Con usos disponibles</SelectItem>
            <SelectItem value="false">Sin usos disponibles</SelectItem>
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
            <p className="text-xs text-muted-foreground">Total Invitaciones</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeInvitations.length}</div>
            <p className="text-xs text-muted-foreground">Activas (página)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {availableInvitations.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Disponibles (página)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {multipleUseInvitations.length}
            </div>
            <p className="text-xs text-muted-foreground">Múltiples (página)</p>
          </CardContent>
        </Card>
      </div>

      {/* Table with Pagination */}
      <InvitationLinksTableContent
        invitations={invitations}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        hasActiveFilters={!!hasActiveFilters}
      />
    </div>
  );
}
