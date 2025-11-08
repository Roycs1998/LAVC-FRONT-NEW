import { Currency } from "@/modules/common";
import { TicketStatus } from "./contants";

export type PricingTier = {
  id?: string;
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type TicketRestrictions = {
  minPerOrder: number;
  maxPerOrder: number;
  maxPerUser?: number;
  requiresApproval: boolean;
  transferable: boolean;
  refundable: boolean;
};

export type TicketAccess = {
  includesAccess?: string[];
  excludesAccess?: string[];
  perks?: string[];
};

export type TicketType = {
  id: string;
  name: string;
  description?: string;
  currency: Currency;
  quantity: number;
  sold: number;
  price?: number;
  pricingTiers?: PricingTier[];
  restrictions: TicketRestrictions;
  access: TicketAccess;
  ticketStatus: TicketStatus;
};
