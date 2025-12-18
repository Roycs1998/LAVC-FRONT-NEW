import { redirect } from "next/navigation";
import { serverApi } from "@/lib/axios/server";
import { InvitationValidationResponse } from "@/modules/invitation";
import { InviteAcceptPage } from "./ui/invite-accept-page";

interface InvitePageProps {
  params: Promise<{ code: string }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params;

  // Validate invitation code
  try {
    const api = await serverApi();
    const { data } = await api.get<InvitationValidationResponse>(
      `/invitations/${code}/validate`
    );

    if (!data.valid) {
      redirect("/?error=invalid-invitation");
    }

    return (
      <InviteAcceptPage
        invitation={data.invitation}
        code={code}
        errors={data.errors}
      />
    );
  } catch (error) {
    console.error("Error validating invitation:", error);
    redirect("/?error=invalid-invitation");
  }
}
