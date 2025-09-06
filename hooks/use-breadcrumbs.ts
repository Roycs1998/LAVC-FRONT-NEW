"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface Breadcrumb {
  href: string;
  label: string;
}

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/events": "Events",
  "/dashboard/events/create": "Create Event",
  "/dashboard/scanner": "QR Scanner",
  "/dashboard/people": "People",
  "/dashboard/people/create": "Create Person",
  "/dashboard/companies": "Companies",
  "/dashboard/companies/create": "Create Company",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
  "/dashboard/my-tickets": "My Tickets",
  "/dashboard/account": "Account",
  "/dashboard/account/personal-info": "Personal Info",
  "/dashboard/account/security": "Security",
};

export function useBreadcrumbs(): Breadcrumb[] {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [];

    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;

      // Skip dynamic routes for now (can be enhanced later)
      if (segment.includes("[") || segment.includes("]")) continue;

      const label =
        routeLabels[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        href: currentPath,
        label,
      });
    }

    return breadcrumbs;
  }, [pathname]);
}
