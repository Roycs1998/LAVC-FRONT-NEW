import { AlertCircle } from "lucide-react";
import {
  Invitation,
  isInvitationExpired,
  hasAvailableUses,
} from "@/modules/invitation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface InvitationWarningsProps {
  invitation: Invitation;
}

export function InvitationWarnings({ invitation }: InvitationWarningsProps) {
  const isExpired = isInvitationExpired(invitation);
  const hasUses = hasAvailableUses(invitation);

  if (invitation.isActive && !isExpired && hasUses) {
    return null;
  }

  const expiresText = invitation.expiresAt
    ? format(new Date(invitation.expiresAt), "PPP", { locale: es })
    : null;

  return (
    <div className="space-y-3">
      {!invitation.isActive && (
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">
              Invitación desactivada
            </p>
            <p className="text-sm text-destructive/80">
              Esta invitación ha sido desactivada y ya no es válida.
            </p>
          </div>
        </div>
      )}

      {isExpired && (
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">Invitación expirada</p>
            <p className="text-sm text-destructive/80">
              Esta invitación expiró{expiresText ? ` el ${expiresText}` : ""}.
            </p>
          </div>
        </div>
      )}

      {!hasUses && (
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">Sin usos disponibles</p>
            <p className="text-sm text-destructive/80">
              Esta invitación ya alcanzó su límite de usos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
