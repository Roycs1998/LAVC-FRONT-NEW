import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

export async function getTokenFromRequest(): Promise<string | null> {
  const session = await getServerSession(authOptions);

  const accessToken = (session as any)?.accessToken;
  return accessToken ?? null;
}
