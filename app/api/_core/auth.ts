import { auth } from "@/lib/auth/config";

export async function getTokenFromRequest(): Promise<string | null> {
  const session = await auth();

  const accessToken = (session as any)?.accessToken;
  return accessToken ?? null;
}
