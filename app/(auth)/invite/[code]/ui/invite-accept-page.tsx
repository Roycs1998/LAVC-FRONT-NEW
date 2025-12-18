"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Invitation, isInvitationAvailable } from "@/modules/invitation";
import { EventInfo } from "./event-info";
import { InvitationInfo } from "./invitation-info";
import { InvitationWarnings } from "./invitation-warnings";
import { InvitationActions } from "./invitation-actions";

interface InviteAcceptPageProps {
  invitation: Invitation;
  code: string;
  errors?: string[];
}

export function InviteAcceptPage({
  invitation,
  code,
  errors,
}: InviteAcceptPageProps) {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const isAvailable = isInvitationAvailable(invitation);
  const canAccept = isAvailable && isAuthenticated;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{invitation.event.title}</CardTitle>

            {isAvailable ? (
              <Badge className="bg-green-600">Válida</Badge>
            ) : (
              <Badge variant="destructive">No disponible</Badge>
            )}
          </div>

          <CardDescription>
            Has sido invitado a participar en este evento
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Event Information */}
          <EventInfo event={invitation.event} />

          {/* Invitation Information */}
          <div className="border-t pt-4">
            <InvitationInfo invitation={invitation} />
          </div>

          {/* Warnings */}
          <InvitationWarnings invitation={invitation} />

          {/* Debug errors if any */}
          {errors && errors.length > 0 && (
            <div className="text-xs text-muted-foreground border-t pt-4">
              <p className="font-medium mb-1">Advertencias:</p>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t">
            <InvitationActions
              code={code}
              isAuthenticated={isAuthenticated}
              canAccept={canAccept}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
