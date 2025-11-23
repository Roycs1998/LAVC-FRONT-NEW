import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config";

export async function getTokenFromRequest(): Promise<string | null> {
  const session = await getServerSession(authConfig);

  const accessToken = (session as any)?.accessToken;
  return accessToken ?? null;
}
