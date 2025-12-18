import { TicketStatus } from "./contants";

export { TicketStatus };

export enum Currency {
    PEN = "PEN",
    USD = "USD",
    EUR = "EUR",
}

export interface PricingTier {
    id?: string;
    name: string;
    price: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

export interface TicketRestrictions {
    minPerOrder: number;
    maxPerOrder: number;
    maxPerUser?: number;
    requiresApproval: boolean;
    transferable: boolean;
    refundable: boolean;
}

export interface TicketAccess {
    includesAccess?: string[];
    excludesAccess?: string[];
    perks?: string[];
}

export interface TicketType {
    id: string;
    eventId: string;
    name: string;
    description?: string;
    currency: Currency;
    price?: number;
    quantity: number;
    sold: number;
    ticketStatus: TicketStatus;
    saleStartDate?: string;
    saleEndDate?: string;
    pricingTiers?: PricingTier[];
    restrictions?: TicketRestrictions;
    access?: TicketAccess;
    createdAt: string;
    updatedAt: string;
}

export type ShortTicketType = Pick<TicketType, "id" | "name" | "price" | "currency">;
