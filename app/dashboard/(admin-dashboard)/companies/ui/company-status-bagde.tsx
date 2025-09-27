"use client";

import { Badge } from "@/components/ui/badge";
import { EntityStatus } from "@/modules/common/types";

type Props = { status: EntityStatus };

export function CompanyStatusBadge({ status }: Props) {
  const map: Record<Props["status"], string> = {
    active: "default",
    inactive: "secondary",
    pending: "outline",
    deleted: "destructive",
  };
  const label: Record<Props["status"], string> = {
    active: "Activa",
    inactive: "Inactiva",
    pending: "Pendiente",
    deleted: "Eliminada",
  };

  return <Badge variant={map[status] as any}>{label[status]}</Badge>;
}
