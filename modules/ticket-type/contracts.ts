import { TicketType, PricingTier, TicketRestrictions, TicketAccess, Currency, TicketStatus } from "./types";

export type CreateTicketTypeRequest = {
    name: string;
    description?: string;
    currency: Currency;
    quantity: number;
    ticketStatus?: TicketStatus;
    saleStartDate?: string;
    saleEndDate?: string;
    price?: number;
    pricingTiers?: Omit<PricingTier, "id">[];
    restrictions?: TicketRestrictions;
    access?: TicketAccess;
};

export type UpdateTicketTypeRequest = Partial<CreateTicketTypeRequest>;

export type TicketTypeListResponse = TicketType[];
