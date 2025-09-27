"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Download, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Company, CompanyType } from "@/modules/company";
import {
  canHaveEvents,
  canHaveTeam,
} from "@/modules/company/utils/capabilities";
import { EmptyState } from "@/components/common/empty-state";
import { CompanyHeaderHero } from "../ui/company-header-hero";
import { CompanyOverview } from "../ui/company-overview";
import { CompanyRecentEvents } from "../ui/company-recent-events";
import { CompanyStatusBadge } from "../ui/company-status-bagde";

type CompanyUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
  lastActive: string;
  status: "active" | "disabled";
};
type RecentEvent = {
  id: string;
  name: string;
  date: string;
  attendees: number;
  revenue: number;
  status: "active" | "completed" | "cancelled";
};

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export default function CompanyDetailPage() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [company, setCompany] = React.useState<Company | null>(null);
  const [users, setUsers] = React.useState<CompanyUser[]>([]);
  const [events, setEvents] = React.useState<RecentEvent[]>([]);

  React.useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);

        const url = new URL(window.location.href);
        const id = url.pathname.split("/").pop();

        const c = await getJSON<Company>(`/api/companies/${id}`);
        if (cancel) return;

        const [ev, us, sub] = await Promise.all([
          canHaveEvents(c) ? fakeEvents() : Promise.resolve([]),
          canHaveTeam(c) ? fakeUsers() : Promise.resolve([]),
          c.type !== CompanyType.EDUCATIONAL
            ? fakeSubscription()
            : Promise.resolve(null),
        ]);

        if (cancel) return;
        setCompany(c);
        setEvents(ev as RecentEvent[]);
        setUsers(us as CompanyUser[]);
        setError(null);
      } catch (e: any) {
        if (!cancel) setError(e?.message || "No se pudo cargar");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  if (loading) return <div className="h-40 bg-muted animate-pulse rounded" />;
  if (error || !company) {
    return (
      <EmptyState
        title="No pudimos cargar la empresa"
        description={error ?? "Intenta nuevamente."}
      />
    );
  }

  const showTeam = canHaveTeam(company);
  const showEvents = canHaveEvents(company);

  return (
    <div className="space-y-6">
      <CompanyHeaderHero company={company} />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen general</TabsTrigger>
          {showTeam && <TabsTrigger value="team">Equipo</TabsTrigger>}
          {showEvents && <TabsTrigger value="events">Eventos</TabsTrigger>}
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CompanyOverview company={company} />
          {showEvents && (
            <CompanyRecentEvents company={company} events={events} />
          )}
        </TabsContent>

        {showTeam && (
          <TabsContent value="team" className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-medium">Miembros del equipo</h3>
              </div>
            </div>

            <div className="rounded-lg border">
              {users.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Última actividad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">
                              {u.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium">{u.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {u.role.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(u.lastActive).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{u.status}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                Editar usuario
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Cambiar función
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Remove User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyState
                  title="No team members yet"
                  description="Invite your first teammate."
                  actionLabel="Invite User"
                  onAction={() =>
                    (window.location.href = `/dashboard/users/invite?company=${company.id}`)
                  }
                />
              )}
            </div>
          </TabsContent>
        )}

        {showEvents && (
          <TabsContent value="events" className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-medium">Eventos</h3>
                <p className="text-sm text-muted-foreground">
                  Todos los eventos creados por {company.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = `/dashboard/events/create?company=${company.id}`)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear evento
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-10 text-center text-muted-foreground">
              Los eventos aparecerán aquí.
            </div>
          </TabsContent>
        )}

        <TabsContent value="settings" className="space-y-6">
          <div className="rounded-lg border p-6">
            <h3 className="font-medium text-red-600 mb-2">Zona de peligro</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Acciones irreversibles para esta empresa
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Suspender empresa</h4>
                  <p className="text-sm text-muted-foreground">
                    Desactivar temporalmente el acceso de esta empresa.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-600 text-yellow-600"
                >
                  Suspender
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Delete Company</h4>
                  <p className="text-sm text-muted-foreground">
                    Eliminar definitivamente esta empresa y todos sus datos.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-600"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function fakeEvents(): Promise<RecentEvent[]> {
  return [
    {
      id: "e1",
      name: "Launch Summit",
      date: new Date().toISOString(),
      attendees: 320,
      revenue: 15400,
      status: "completed",
    },
    {
      id: "e2",
      name: "Tech Meetup",
      date: new Date(Date.now() - 864e5 * 14).toISOString(),
      attendees: 120,
      revenue: 4800,
      status: "active",
    },
  ];
}

async function fakeUsers(): Promise<CompanyUser[]> {
  return [
    {
      id: "u1",
      name: "Jane Cooper",
      email: "jane@acme.co",
      role: "OWNER",
      status: "active",
      lastActive: new Date().toISOString(),
    },
    {
      id: "u2",
      name: "Devon Lane",
      email: "devon@acme.co",
      role: "ADMIN",
      status: "active",
      lastActive: new Date(Date.now() - 864e5 * 5).toISOString(),
    },
  ];
}

async function fakeSubscription() {
  return {
    status: "active" as const,
    plan: "standard" as const,
    amount: 99,
    nextPaymentDate: new Date(Date.now() + 864e5 * 21).toISOString(),
  };
}
