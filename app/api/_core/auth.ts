import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth/config";

export async function getTokenFromRequest(
  _req: NextRequest
): Promise<string | null> {
  const session = await getServerSession(authOptions);

  const accessToken = (session as any)?.accessToken;
  return accessToken ?? null;
}
