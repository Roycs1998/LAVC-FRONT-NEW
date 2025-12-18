"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Keyboard } from "lucide-react";
import { QRScanner } from "./ui/qr-scanner";
import { EventStatsDisplay } from "./ui/event-stats-display";
import { QRClient, EventStats } from "@/modules/qr";

interface CheckInPageProps {
  params: Promise<{ id: string }>;
}

export default function CheckInPage({ params }: CheckInPageProps) {
  const [eventId, setEventId] = useState<string>("");
  const [manualCode, setManualCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [lastResult, setLastResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [stats, setStats] = useState<EventStats | null>(null);

  useEffect(() => {
    params.then((p) => setEventId(p.id));
  }, [params]);

  const loadStats = async () => {
    if (!eventId) return;

    try {
      const data = await QRClient.getEventStats(eventId);
      setStats(data);
    } catch (error: any) {
      console.error("Error loading stats:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      loadStats();
      // Refresh stats every 30 seconds
      const interval = setInterval(loadStats, 30000);
      return () => clearInterval(interval);
    }
  }, [eventId]);

  const validateQR = async (qrCode: string) => {
    if (!eventId) return;

    setIsValidating(true);
    setLastResult(null);

    try {
      const result = await QRClient.validateQR({ qrCode, eventId });

      if (result.success) {
        toast.success(result.message);
        setLastResult({ success: true, message: result.message });
        // Refresh stats after successful check-in
        loadStats();
      } else {
        toast.error(result.message);
        setLastResult({ success: false, message: result.message });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error al validar QR";
      toast.error(message);
      setLastResult({ success: false, message });
    } finally {
      setIsValidating(false);
      setManualCode("");
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      validateQR(manualCode.trim());
    }
  };

  if (!eventId) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Check-in del Evento</h2>
        <p className="text-muted-foreground">
          Escanea códigos QR o ingresa manualmente para validar tickets
        </p>
      </div>

      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scanner">Escáner QR</TabsTrigger>
          <TabsTrigger value="manual">Ingreso Manual</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escáner de Códigos QR</CardTitle>
              <CardDescription>
                Apunta la cámara al código QR del ticket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QRScanner
                onScan={(code) => validateQR(code)}
                onError={(error) => toast.error(error)}
              />
            </CardContent>
          </Card>

          {lastResult && (
            <Alert variant={lastResult.success ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {lastResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <AlertDescription>{lastResult.message}</AlertDescription>
              </div>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingreso Manual</CardTitle>
              <CardDescription>
                Ingresa el código del ticket manualmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Código del ticket (ej: TKT-2025-001234)"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    disabled={isValidating}
                  />
                  <Button type="submit" disabled={isValidating || !manualCode.trim()}>
                    <Keyboard className="mr-2 h-4 w-4" />
                    {isValidating ? "Validando..." : "Validar"}
                  </Button>
                </div>
              </form>

              {lastResult && (
                <Alert
                  variant={lastResult.success ? "default" : "destructive"}
                  className="mt-4"
                >
                  <div className="flex items-center gap-2">
                    {lastResult.success ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <AlertDescription>{lastResult.message}</AlertDescription>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <EventStatsDisplay stats={stats} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
