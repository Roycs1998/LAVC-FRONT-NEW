import { serverApi } from "@/lib/axios/server";
import { SpeakerForm } from "../../create/ui/speaker-form";
import { Speaker } from "@/modules/speaker/types";
import { ensureRoles } from "@/lib/utils/server/auth";
import { UserRole } from "@/modules/user";
import {
  Company,
  CompanyPaginatedResponse,
  CompanyType,
} from "@/modules/company";
import { PageHeader } from "@/components/layout/page-header";

interface Props {
  params: Promise<any>;
}

export default async function EditSpeakerPage({ params }: Props) {
  const api = await serverApi();
  const { id } = await params;

  const session = await ensureRoles([
    UserRole.PLATFORM_ADMIN,
    UserRole.COMPANY_ADMIN,
  ]);
  const roles = session.user.roles;
  const isPlatformAdmin = roles.includes(UserRole.PLATFORM_ADMIN);
  const isCompanyAdmin = roles.includes(UserRole.COMPANY_ADMIN);

  let companies: Company[] = [];
  let defaultCompanyId: string | undefined = undefined;

  const { data } = await api.get<Speaker>(`/speakers/${id}`);

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
        title="Editar exponente"
        subtitle="Completa los campos y edita tu exponente."
      />

      <SpeakerForm
        mode="edit"
        id={id}
        defaultValues={data}
        companies={companies}
        defaultCompanyId={defaultCompanyId}
      />
    </div>
  );
}
