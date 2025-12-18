import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

/**
 * Require platform admin role
 */
export async function requirePlatformAdmin() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const roles = session.user.roles || [];
  if (!roles.includes("PLATFORM_ADMIN")) {
    redirect("/unauthorized");
  }

  return session;
}

/**
 * Require company admin or platform admin role
 */
export async function requireCompanyAdmin() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const roles = session.user.roles || [];
  if (!roles.includes("PLATFORM_ADMIN") && !roles.includes("COMPANY_ADMIN")) {
    redirect("/unauthorized");
  }

  return session;
}

/**
 * Require any authenticated user
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

/**
 * Check if user has staff access to an event
 * (Platform Admin, Company Admin, or Event Staff)
 */
export async function requireEventAccess(eventId: string) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const roles = session.user.roles || [];
  
  // Platform and Company admins have access to all events
  if (roles.includes("PLATFORM_ADMIN") || roles.includes("COMPANY_ADMIN")) {
    return session;
  }

  // TODO: Check if user is operational staff or sponsor staff for this event
  // This would require calling the UserClient.getStaffRoles() API
  // For now, we'll allow EVENT_STAFF role
  if (roles.includes("EVENT_STAFF")) {
    return session;
  }

  redirect("/unauthorized");
}
