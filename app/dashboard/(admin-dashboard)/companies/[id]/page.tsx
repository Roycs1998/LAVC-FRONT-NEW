import { serverApi } from "@/lib/axios/server";
import CompanyDetailPageContent from "./ui/company-detail-page-content";
import { Company } from "@/modules/company";

interface Props {
  params: Promise<{ id: string }>;
}

const CompanyDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const api = await serverApi();

  const { data } = await api.get<Company>(`/companies/${id}`);

  return <CompanyDetailPageContent company={data} />;
};

export default CompanyDetailPage;
