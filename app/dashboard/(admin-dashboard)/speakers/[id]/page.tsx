import { serverApi } from "@/lib/axios/server";
import { Speaker } from "@/modules/speaker/types";
import SpeakerDetailPageContent from "./ui/speaker-detail-page-content";

interface Props {
  params: Promise<any>;
}

export default async function SpeakerDetailPage({ params }: Props) {
  const api = await serverApi();
  const { id } = await params;

  const { data } = await api.get<Speaker>(`/speakers/${id}`);

  return <SpeakerDetailPageContent speaker={data} />;
}
