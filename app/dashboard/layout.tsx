import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: "Dashboard | LAVC Platform",
  description: "Plataforma de gestión de eventos y tickets",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 w-full overflow-hidden">
          <DashboardShell>{children}</DashboardShell>
        </main>
      </div>
    </SidebarProvider>
  );
}
