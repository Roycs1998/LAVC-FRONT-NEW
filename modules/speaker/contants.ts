import { EntityStatus } from "@/modules/common/types";

export const SPEAKER_STATUS_LABELS: Record<EntityStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  pending: "Pendiente",
  deleted: "Eliminado",
};
