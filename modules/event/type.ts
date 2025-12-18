import { ShortCompany } from "@/modules/company";
import { Person } from "@/modules/person";
import { Address } from "@/modules/address";
import {
  AgendaItemType,
  EventLocationType,
  EventStatus,
  EventType,
} from "./contants";

export interface EventVirtualDetails {
  platform?: string;
  meetingUrl?: string;
  meetingId?: string;
  passcode?: string;
}

export interface EventLocation {
  type: EventLocationType;
  venue?: string;
  address?: Address;
  virtualDetails?: EventVirtualDetails;
  capacity?: number;
}

export interface EventAgendaItem {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  speakerId?: string;
  type: AgendaItemType;
}

export interface EventRegistration {
  isOpen: boolean;
  opensAt?: string;
  closesAt?: string;
  requiresApproval: boolean;
  maxAttendeesPerRegistration: number;
  waitlistEnabled: boolean;
}

export interface EventSettings {
  isPrivate: boolean;
  requiresInvitation: boolean;
  ageRestriction?: number;
  dresscode?: string;
  specialInstructions?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  type: EventType;
  eventStatus: EventStatus;
  startDate: string;
  endDate: string;
  timezone: string;
  isAllDay: boolean;
  location: EventLocation;
  capacity?: number;
  imageUrl?: string;
  bannerUrl?: string;
  company?: ShortCompany;
  organizer?: {
    id: string;
    person: Person;
  };
  registration: EventRegistration;
  settings: EventSettings;
  agenda?: EventAgendaItem[];
  ticketTypes?: Array<{
    id: string;
    name: string;
    price?: number;
    currency: string;
    quantity: number;
    sold: number;
  }>;
  tags?: string[];
  categories?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  cancelledAt?: string;
  rejectionReason?: string;
}

export type CompanyEventStats = {
  eventsByStatus: Partial<Record<keyof typeof EventStatus, number>> &
  Record<string, number>;
  totalEvents: number;
  totalRevenue: number;
  totalTicketsSold: number;
};

export type EventStats = {
  event: {
    title: string;
    status: EventStatus;
    startDate: string;
    endDate: string;
  };
  tickets: {
    totalCapacity: number;
    totalSold: number;
    totalRevenue: number;
    availableTickets: number;
    soldPercentage: string | number;
  };
};
