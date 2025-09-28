import { serverApi } from "@/lib/axios/server";
import { CompanyForm } from "../../ui/company-form";
import { Company } from "@/modules/company";

interface Props {
  params: Promise<any>;
}

export default async function EditCompany({ params }: Props) {
  const api = await serverApi();
  const { id } = await params;

  const { data } = await api.get<Company>(`/companies/${id}`, {
    params,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Editar empresa</h1>
      <CompanyForm mode="edit" id={id} defaultValues={data} />
    </div>
  );
}
