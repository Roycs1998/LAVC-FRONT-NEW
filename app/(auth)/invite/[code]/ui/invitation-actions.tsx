import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { InvitationAcceptResponse } from "@/modules/invitation";

interface InvitationActionsProps {
  code: string;
  isAuthenticated: boolean;
  canAccept: boolean;
}

export function InvitationActions({
  code,
  isAuthenticated,
  canAccept,
}: InvitationActionsProps) {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAcceptInvitation = async () => {
    setIsAccepting(true);
    try {
      const { data } = await axios.post<InvitationAcceptResponse>(
        `/api/invitations/${code}/accept`
      );

      toast.success(data.message || "¡Invitación aceptada exitosamente!");

      // Redirect to ticket or dashboard
      if (data.ticket?.id) {
        router.push(`/dashboard/tickets/${data.ticket.id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Error al aceptar la invitación. Intenta nuevamente.";
      toast.error(errorMessage);
    } finally {
      setIsAccepting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <p className="text-sm text-muted-foreground text-center">
          Para aceptar esta invitación, necesitas tener una cuenta
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/register?code=${code}`}>Crear cuenta</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href={`/login?redirect=/invite/${code}`}>Iniciar sesión</Link>
          </Button>
        </div>
      </>
    );
  }

  if (!canAccept) {
    return (
      <Button disabled className="w-full" size="lg">
        Invitación no disponible
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAcceptInvitation}
      disabled={isAccepting}
      className="w-full"
      size="lg"
    >
      {isAccepting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Aceptando...
        </>
      ) : (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          Aceptar Invitación
        </>
      )}
    </Button>
  );
}
