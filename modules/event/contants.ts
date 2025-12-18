export enum EventStatus {
  DRAFT = "draft",
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
  REJECTED = "rejected",
  PUBLISHED = "published",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  DELETED = "deleted",
}

export enum EventType {
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  SEMINAR = "seminar",
  WEBINAR = "webinar",
  MEETUP = "meetup",
  NETWORKING = "networking",
  TRAINING = "training",
  OTHER = "other",
}

export enum EventLocationType {
  PHYSICAL = "physical",
  VIRTUAL = "virtual",
  HYBRID = "hybrid",
}

export enum AgendaItemType {
  PRESENTATION = "presentation",
  BREAK = "break",
  NETWORKING = "networking",
  QA = "qa",
  OTHER = "other",
}

export const EventStatusLabels: Record<EventStatus, string> = {
  [EventStatus.DRAFT]: "Borrador",
  [EventStatus.PENDING_APPROVAL]: "Pendiente de Revisión",
  [EventStatus.APPROVED]: "Aprobado",
  [EventStatus.REJECTED]: "Rechazado",
  [EventStatus.PUBLISHED]: "Publicado",
  [EventStatus.CANCELLED]: "Cancelado",
  [EventStatus.COMPLETED]: "Completado",
  [EventStatus.DELETED]: "Eliminado",
};

export const EventTypeLabels: Record<EventType, string> = {
  [EventType.CONFERENCE]: "Conferencia",
  [EventType.WORKSHOP]: "Workshop",
  [EventType.SEMINAR]: "Seminario",
  [EventType.WEBINAR]: "Webinar",
  [EventType.MEETUP]: "Meetup",
  [EventType.NETWORKING]: "Networking",
  [EventType.TRAINING]: "Training",
  [EventType.OTHER]: "Otro",
};
