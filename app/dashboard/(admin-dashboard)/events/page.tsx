import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { serverApi } from "@/lib/axios/server";
import { EventPaginatedResponse, EventListParams } from "@/modules/event";
import { EventFilters } from "./ui/table/event-filters";
import { EventTable } from "./ui/table/event-table";
import { UserRole } from "@/modules/user";
import { ensureRoles } from "@/lib/utils/server/auth";

interface Props {
  searchParams: Promise<EventListParams>;
}

export default async function EventsPage({ searchParams }: Props) {
  const session = await ensureRoles([
    UserRole.PLATFORM_ADMIN,
    UserRole.COMPANY_ADMIN,
  ]);

  const api = await serverApi();
  const params = await searchParams;

  const queryParams: EventListParams = {
    ...params,
  };

  if (session.user.roles?.includes(UserRole.COMPANY_ADMIN)) {
    queryParams.companyId = session.user.company?.id;
  }

  const { data } = await api.get<EventPaginatedResponse>("/events", {
    params: queryParams,
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Eventos"
        subtitle="Gestiona y supervisa todos los eventos de tu plataforma."
        actions={
          <Button asChild>
            <Link href="/dashboard/events/create">
              <Plus className="h-4 w-4 mr-2" />
              Crear evento
            </Link>
          </Button>
        }
      />

      <EventFilters />

      <Suspense fallback={<TableSkeleton />}>
        {data.data?.length ? (
          <EventTable
            data={data.data}
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            isPlatformAdmin={session.user.roles?.includes(
              UserRole.PLATFORM_ADMIN
            )}
          />
        ) : (
          <EmptyState
            title="No hay eventos"
            description="Limpia los filtros o crea un evento."
          />
        )}
      </Suspense>
    </div>
  );
}
