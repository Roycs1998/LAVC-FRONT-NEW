import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export function RejectionAlert({ reason }: { reason?: string }) {
  if (!reason) return null;

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          Evento Rechazado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-destructive/90">{reason}</p>
      </CardContent>
    </Card>
  );
}
