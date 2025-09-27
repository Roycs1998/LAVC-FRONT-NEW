"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/modules/company";
import { canHaveEvents } from "@/modules/company/utils/capabilities";
import { EmptyState } from "@/components/common/empty-state";

type RecentEvent = {
  id: string;
  name: string;
  date: string;
  attendees: number;
  revenue: number;
  status: "active" | "completed" | "cancelled";
};

interface Props {
  company: Company;
  events: RecentEvent[];
}

export function CompanyRecentEvents({ company, events }: Props) {
  if (!canHaveEvents(company)) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Eventos recientes</CardTitle>
            <CardDescription>Últimos eventos de esta empresa</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/events?company=${company.id}`}>
              Ver todos los eventos
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {events?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Asistentes</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{new Date(e.date).toLocaleDateString()}</TableCell>
                  <TableCell>{e.attendees}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        e.status === "active"
                          ? "default"
                          : e.status === "completed"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {e.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="No hay eventos recientes."
            description="Cree o asigne eventos a esta empresa."
            actionLabel="Ver todos los eventos"
            onAction={() =>
              (window.location.href = `/dashboard/events?company=${company.id}`)
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
