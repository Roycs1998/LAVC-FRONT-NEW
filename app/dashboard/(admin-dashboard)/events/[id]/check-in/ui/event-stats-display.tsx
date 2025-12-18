"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStats } from "@/modules/qr";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface EventStatsDisplayProps {
  stats: EventStats | null;
}

export function EventStatsDisplay({ stats }: EventStatsDisplayProps) {
  if (!stats) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay estadísticas disponibles
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-in</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.checkedIn}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.checkInRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* By Ticket Type */}
      <Card>
        <CardHeader>
          <CardTitle>Check-in por Tipo de Ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.byTicketType.map((type) => (
            <div key={type.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{type.name}</span>
                <span className="text-muted-foreground">
                  {type.checkedIn} / {type.total}
                </span>
              </div>
              <Progress
                value={(type.checkedIn / type.total) * 100}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* By Hour */}
      {stats.byHour.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Check-in por Hora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.byHour.map((hour) => (
                <div
                  key={hour.hour}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium">{hour.hour}</span>
                  <span className="text-muted-foreground">{hour.count} personas</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
