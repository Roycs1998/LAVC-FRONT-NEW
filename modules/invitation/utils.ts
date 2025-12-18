import { Invitation, InvitationUsageType } from "./types";
import { USAGE_TYPE_LABELS } from "./constants";

export function isInvitationExpired(invitation: Invitation): boolean {
    if (!invitation.expiresAt) return false;
    return new Date(invitation.expiresAt) < new Date();
}

export function hasAvailableUses(invitation: Invitation): boolean {
    const usageType = invitation.usageType;

    if (usageType === "single") {
        return invitation.currentUses === 0;
    }

    if (usageType === "multiple") {
        return (invitation.remainingUses ?? 0) > 0;
    }

    // unlimited or other types
    return true;
}

export function isInvitationAvailable(invitation: Invitation): boolean {
    return (
        invitation.isActive &&
        !isInvitationExpired(invitation) &&
        hasAvailableUses(invitation)
    );
}

export function getUsageText(invitation: Invitation): string {
    const usageType = invitation.usageType;

    if (usageType === "single") {
        return USAGE_TYPE_LABELS.single;
    }

    if (usageType === "multiple") {
        const remaining = invitation.remainingUses ?? 0;
        return `${remaining} ${remaining === 1 ? "uso restante" : "usos restantes"}`;
    }

    return USAGE_TYPE_LABELS.unlimited;
}

export function getLocationText(location: any): string {
    if (!location) return "Por confirmar";
    if (typeof location === "string") return location;

    // Try to map typical fields
    const name = location.name || location.title || location.venue;
    const address =
        location.address?.street ||
        location.formattedAddress ||
        location.fullAddress ||
        location.direction;

    const city = location.address?.city || location.city;
    const country = location.address?.country || location.country;

    const parts = [name, address, city, country].filter(Boolean);
    return parts.length ? parts.join(" · ") : "Por confirmar";
}
