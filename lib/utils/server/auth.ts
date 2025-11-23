"use server";

import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { auth } from "@/lib/auth/config";
import { UserRole } from "@/modules/user";

export async function ensureAuth(): Promise<Session> {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  return session;
}

export async function ensureRoles(roles: UserRole[]): Promise<Session> {
  const session = await ensureAuth();
  if (!session.user.roles.some((role) => roles.includes(role as UserRole)))
    redirect("/");
  return session;
}
