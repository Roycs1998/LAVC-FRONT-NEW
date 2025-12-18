import { InvitationParticipantType } from "../invitation/types";

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface InvitationFilters {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    sponsorId?: string;
    participantType?: InvitationParticipantType;
    usageType?: "single" | "multiple";
    isActive?: boolean;
    isExpired?: boolean;
    hasAvailableUses?: boolean;
}

export interface SponsorInvitation {
    id: string;
    eventSponsorId: string | null;
    eventId: string;
    code: string;
    participantType: InvitationParticipantType;
    ticketTypeId: string;
    usageType: "single" | "multiple";
    maxUses: number | null;
    currentUses: number;
    expiresAt: string | null;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    ticketType: {
        id: string;
        name: string;
        description?: string;
        price: number;
        currency: string;
    };
    eventSponsor?: {
        id: string;
        eventId: string;
        companyId: string;
        staffQuota: number;
        guestQuota: number;
        scholarshipQuota: number;
        staffUsed: number;
        guestUsed: number;
        scholarshipUsed: number;
        isActive: boolean;
        company: {
            id: string;
            name: string;
            ruc: string;
            email: string;
            phone: string;
            address: string;
            logoUrl: string | null;
            isActive: boolean;
        };
    };
    remainingUses?: number;
}

// Paginated response
export interface PaginatedInvitations {
    data: SponsorInvitation[];
    meta: PaginationMeta;
}
