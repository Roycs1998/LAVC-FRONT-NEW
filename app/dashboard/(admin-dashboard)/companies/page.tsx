import { Suspense } from "react";
import { CompanyStatusDialog } from "./ui/company-status-dialog";
import { CompanyFilters } from "./ui/company-filters";
import { TableSkeleton } from "@/components/skeletons";
import { CompanyTable } from "./ui/company-table";
import { AppPagination } from "@/components/common/app-pagination";
import { EmptyState } from "@/components/common/empty-state";
import { CompanyFilters as Filter } from "@/modules/company";
import { CompaniesClient } from "@/modules/company/client";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<Filter>;
}) {
  const query = await searchParams;

  const data = await CompaniesClient.list(query);

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
          <>
            <CompanyTable items={data.data} />
            <AppPagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
            />
          </>
        ) : (
          <EmptyState
            title="No hay empresas"
            description="Crea tu primera empresa para comenzar."
            actionLabel="Crear empresa"
          />
        )}
      </Suspense>

      <CompanyStatusDialog />
    </div>
  );
}
