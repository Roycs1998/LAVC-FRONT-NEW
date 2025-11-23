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
