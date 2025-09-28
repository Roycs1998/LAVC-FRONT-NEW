import { serverApi } from "@/lib/axios/server";
import CompanyDetailPageContent from "./ui/company-detail-page-content";
import { Company } from "@/modules/company";

interface Props {
  params: Promise<any>;
}

const CompanyDetailPage = async ({ params }: Props) => {
  const api = await serverApi();

  const { id } = await params;

  const { data } = await api.get<Company>(`/companies/${id}`, {
    params,
  });

  return <CompanyDetailPageContent company={data} />;
};

export default CompanyDetailPage;
