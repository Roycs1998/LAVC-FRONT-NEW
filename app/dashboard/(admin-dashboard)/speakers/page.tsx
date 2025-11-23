import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { serverApi } from "@/lib/axios/server";
import SpeakerTable from "./ui/table/speaker-table";
import { SpeakerPaginatedResponse } from "@/modules/speaker/contract";
import { SpeakerFilters } from "./ui/table/speaker-filters";
import { SpeakerFilters as Filter } from "@/modules/speaker/contract";
import { UserRole } from "@/modules/user";
import { ensureRoles } from "@/lib/utils/server/auth";

interface Props {
  searchParams: Promise<Filter>;
}

export default async function CompaniesPage({ searchParams }: Props) {
  const session = await ensureRoles([
    UserRole.PLATFORM_ADMIN,
    UserRole.COMPANY_ADMIN,
  ]);

  const api = await serverApi();
  const params = await searchParams;

  const { data } = await api.get<SpeakerPaginatedResponse>("/speakers", {
    params: {
      ...params,
      companyId: session.user.company?.id,
    },
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Exponentes"
        subtitle=" Gestiona y supervisa todas los exponentes de tu plataforma."
        actions={
          <Button asChild>
            <Link href="/dashboard/speakers/create">
              <Plus className="h-4 w-4 mr-2" />
              Añadir exponente
            </Link>
          </Button>
        }
      />

      <SpeakerFilters />

      <Suspense fallback={<TableSkeleton />}>
        {data.data?.length ? (
          <SpeakerTable
            data={data.data}
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        ) : (
          <EmptyState
            title="No hay exponentes"
            description="Limpia los filtros o crea un exponente."
          />
        )}
      </Suspense>
    </div>
  );
}
