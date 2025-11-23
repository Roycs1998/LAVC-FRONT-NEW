import { UserRole } from "@/modules/user";
import { SpeakerForm } from "./ui/speaker-form";
import { ensureRoles } from "@/lib/utils/server/auth";
import { serverApi } from "@/lib/axios/server";
import {
  Company,
  CompanyPaginatedResponse,
  CompanyType,
} from "@/modules/company";
import { PageHeader } from "@/components/layout/page-header";

export default async function NewSpeakerPage() {
  const api = await serverApi();

  const session = await ensureRoles([
    UserRole.PLATFORM_ADMIN,
    UserRole.COMPANY_ADMIN,
  ]);

  const roles = session.user.roles;
  const isPlatformAdmin = roles.includes(UserRole.PLATFORM_ADMIN);
  const isCompanyAdmin = roles.includes(UserRole.COMPANY_ADMIN);

  let companies: Company[] = [];
  let defaultCompanyId: string | undefined = undefined;

  if (isPlatformAdmin) {
    const { data } = await api.get<CompanyPaginatedResponse>("/companies", {
      params: {
        type: CompanyType.EVENT_ORGANIZER,
        limit: 10,
        page: 1,
      },
    });

    companies = data.data || [];
  }

  if (isCompanyAdmin) {
    defaultCompanyId = session.user.company?.id;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuevo exponente"
        subtitle="Completa los campos y crea tu exponente."
      />

      <SpeakerForm
        mode="create"
        companies={companies}
        defaultCompanyId={defaultCompanyId}
      />
    </div>
  );
}
