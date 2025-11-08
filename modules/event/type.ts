import { ShortCompany } from "@/modules/company";
import { Person } from "@/modules/person";
import { Address } from "@/modules/address";
import { AgendaItemType, EventLocationType, EventStatus } from "./contants";
import { EventType } from "next-auth";
import { ShortSpeaker } from "@/modules/speaker";

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
  description?: string;
  shortDescription?: string;
  type: EventType;
  eventStatus: EventStatus;
  startDate: string;
  endDate: string;
  timezone?: string;
  isAllDay: boolean;
  location: EventLocation;
  speakers?: ShortSpeaker[];
  agenda?: EventAgendaItem[];
  registration: EventRegistration;
  featuredImage?: string;
  images?: string[];
  videoUrl?: string;
  tags?: string[];
  categories?: string[];
  slug?: string;
  settings?: EventSettings;
  createdAt: string;
  company?: ShortCompany;
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
