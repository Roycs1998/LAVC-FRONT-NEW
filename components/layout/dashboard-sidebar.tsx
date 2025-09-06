"use client";

import { ComponentType, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import {
  Home,
  Calendar,
  ScanLine,
  Users,
  Building2,
  BarChart3,
  Settings,
  Ticket,
  ChevronRight,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/modules/user";
import { useSession } from "next-auth/react";

interface DashboardSidebarProps {
  user: User;
}

export interface NavigationSubItem {
  title: string;
  url: string;
}

export interface NavigationItem {
  title: string;
  url: string;
  icon: ComponentType<any>;
  badge: string | null;
  highlight?: boolean;
  items?: NavigationSubItem[];
}

const getNavigationConfig = (role: UserRole): NavigationItem[] => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      badge: null,
    },
  ];

  switch (role) {
    case "user":
      return [
        ...baseItems,
        {
          title: "My Tickets",
          url: "/dashboard/my-tickets",
          icon: Ticket,
          badge: "3",
        },
        {
          title: "Browse Events",
          url: "/dashboard/events",
          icon: Calendar,
          badge: null,
        },
        {
          title: "Account",
          url: "/dashboard/account",
          icon: Settings,
          badge: null,
          items: [
            {
              title: "Personal Info",
              url: "/dashboard/account/personal-info",
            },
            {
              title: "Security",
              url: "/dashboard/account/security",
            },
          ],
        },
      ];

    case "staff":
      return [
        ...baseItems,
        {
          title: "QR Scanner",
          url: "/dashboard/scanner",
          icon: ScanLine,
          badge: "HOT",
          highlight: true,
        },
        {
          title: "Assigned Events",
          url: "/dashboard/events",
          icon: Calendar,
          badge: "2",
        },
        {
          title: "Participants",
          url: "/dashboard/people",
          icon: Users,
          badge: null,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
          badge: null,
        },
      ];

    case "company_admin":
      return [
        ...baseItems,
        {
          title: "QR Scanner",
          url: "/dashboard/scanner",
          icon: ScanLine,
          badge: null,
          highlight: true,
        },
        {
          title: "Events",
          url: "/dashboard/events",
          icon: Calendar,
          badge: null,
          items: [
            {
              title: "All Events",
              url: "/dashboard/events",
            },
            {
              title: "Create Event",
              url: "/dashboard/events/create",
            },
          ],
        },
        {
          title: "People",
          url: "/dashboard/people",
          icon: Users,
          badge: null,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: BarChart3,
          badge: null,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
          badge: null,
        },
      ];

    case "platform_admin":
      return [
        ...baseItems,
        {
          title: "QR Scanner",
          url: "/dashboard/scanner",
          icon: ScanLine,
          badge: null,
          highlight: true,
        },
        {
          title: "Events",
          url: "/dashboard/events",
          icon: Calendar,
          badge: null,
          items: [
            {
              title: "All Events",
              url: "/dashboard/events",
            },
            {
              title: "Create Event",
              url: "/dashboard/events/create",
            },
          ],
        },
        {
          title: "People",
          url: "/dashboard/people",
          icon: Users,
          badge: null,
        },
        {
          title: "Companies",
          url: "/dashboard/companies",
          icon: Building2,
          badge: null,
          items: [
            {
              title: "All Companies",
              url: "/dashboard/companies",
            },
            {
              title: "Create Company",
              url: "/dashboard/companies/create",
            },
          ],
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: BarChart3,
          badge: null,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
          badge: null,
        },
      ];

    default:
      return baseItems;
  }
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);

  const { data } = useSession();

  const userRole = (data?.user.role as UserRole) || UserRole.USER;
  const navigationItems = getNavigationConfig(userRole);

  const handleCommandSelect = (url: string) => {
    window.location.href = url;
    setCommandOpen(false);
  };

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <div>
              <h2 className="text-lg font-semibold">LAVC Platform</h2>
              <p className="text-sm text-muted-foreground">{userRole}</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground mt-4"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Search...
            <kbd className="ml-auto bg-muted px-2 py-0.5 rounded text-xs">
              ⌘K
            </kbd>
          </Button>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(`${item.url}/`);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "w-full",
                      item.highlight &&
                        "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 dark:from-blue-950 dark:to-purple-950 dark:border-blue-800"
                    )}
                  >
                    <Link href={item.url} className="flex items-center">
                      <item.icon
                        className={cn(
                          "h-4 w-4 mr-3",
                          item.highlight && "text-blue-600"
                        )}
                      />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={
                            item.badge === "HOT" ? "destructive" : "secondary"
                          }
                          className="ml-2 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </Link>
                  </SidebarMenuButton>

                  {/* Sub-items */}
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                          >
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start h-12 px-3"
              >
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={data?.user.image || ""} />
                  <AvatarFallback>
                    {data?.user.name?.slice(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{data?.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {data?.user.email}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search for pages, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {navigationItems
              .flatMap((item) => [
                {
                  title: item.title,
                  url: item.url,
                  icon: item.icon,
                },
                ...(item.items || []),
              ])
              .map((item) => (
                <CommandItem
                  key={item.url}
                  value={item.title}
                  onSelect={() => handleCommandSelect(item.url)}
                >
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
