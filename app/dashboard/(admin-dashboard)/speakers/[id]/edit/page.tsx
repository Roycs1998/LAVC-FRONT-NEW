import { serverApi } from "@/lib/axios/server";
import { SpeakerForm } from "../../ui/speaker-form";
import { Speaker } from "@/modules/speaker/types";

interface Props {
  params: Promise<any>;
}

export default async function EditSpeakerPage({ params }: Props) {
  const api = await serverApi();
  const { id } = await params;

  const { data } = await api.get<Speaker>(`/speakers/${id}`);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Editar exponente</h1>
      <SpeakerForm mode="edit" id={id} defaultValues={data} />
    </div>
  );
}
