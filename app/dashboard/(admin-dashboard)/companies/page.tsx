import { Suspense } from "react";
import { CompanyStatusDialog } from "./ui/company-status-dialog";
import { CompanyFilters } from "./ui/company-filters";
import { TableSkeleton } from "@/components/skeletons";
import { CompanyTable } from "./ui/company-table";
import { EmptyState } from "@/components/common/empty-state";
import {
  CompanyPaginatedResponse,
  CompanyFilters as Filter,
} from "@/modules/company";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { serverApi } from "@/lib/axios/server";

interface Props {
  searchParams: Promise<Filter>;
}

export default async function CompaniesPage({ searchParams }: Props) {
  const api = await serverApi();
  const params = await searchParams;

  const { data } = await api.get<CompanyPaginatedResponse>("/companies", {
    params,
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Empresas"
        subtitle=" Gestiona y supervisa todas las empresas de tu plataforma."
        actions={
          <Button asChild>
            <Link href="/dashboard/companies/create">
              <Plus className="h-4 w-4 mr-2" />
              Añadir empresa
            </Link>
          </Button>
        }
      />

      <CompanyFilters />

      <Suspense fallback={<TableSkeleton />}>
        {data.data?.length ? (
          <CompanyTable
            data={data.data}
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        ) : (
          <EmptyState
            title="No hay empresas"
            description="Limpia los filtros o crea una empresa."
          />
        )}
      </Suspense>

      <CompanyStatusDialog />
    </div>
  );
}
