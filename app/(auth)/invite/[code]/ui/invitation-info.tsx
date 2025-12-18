import { Ticket, User } from "lucide-react";
import {
  Invitation,
  PARTICIPANT_TYPE_LABELS,
  PARTICIPANT_TYPE_DESCRIPTIONS,
} from "@/modules/invitation";
import { ShortCompany } from "@/modules/company";

interface InvitationInfoProps {
  invitation: Invitation;
}

export function InvitationInfo({ invitation }: InvitationInfoProps) {
  const participantLabel =
    PARTICIPANT_TYPE_LABELS[invitation.participantType] ??
    invitation.participantType;

  const participantDesc =
    PARTICIPANT_TYPE_DESCRIPTIONS[invitation.participantType] ?? "";

  const sponsor: ShortCompany | undefined = invitation.eventSponsor?.company;

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Ticket className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium">Tipo de Ticket</p>
          <p className="text-sm text-muted-foreground">
            {invitation.ticketType?.name ?? "—"}
          </p>
          {invitation.ticketType?.price != null && (
            <p className="text-sm font-semibold text-primary mt-1">
              S/ {invitation.ticketType.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium">Tipo de Participación</p>
          <p className="text-sm font-medium text-primary">{participantLabel}</p>
          {participantDesc && (
            <p className="text-sm text-muted-foreground">{participantDesc}</p>
          )}
        </div>
      </div>

      {sponsor && (
        <div className="flex items-start gap-3">
          <div>
            <p className="font-medium">Sponsor</p>
            <p className="text-sm text-muted-foreground">
              {sponsor.name ?? "—"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
