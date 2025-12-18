export enum TicketStatus {
  ACTIVE = "active",
  USED = "used",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  TRANSFERRED = "transferred",
}

export enum TicketSourceType {
  ORDER = "order",
  INVITATION = "invitation",
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.ACTIVE]: "Activo",
  [TicketStatus.USED]: "Usado",
  [TicketStatus.CANCELLED]: "Cancelado",
  [TicketStatus.REFUNDED]: "Reembolsado",
  [TicketStatus.TRANSFERRED]: "Transferido",
};

export const TICKET_SOURCE_TYPE_LABELS: Record<TicketSourceType, string> = {
  [TicketSourceType.ORDER]: "Orden",
  [TicketSourceType.INVITATION]: "Invitación",
};
