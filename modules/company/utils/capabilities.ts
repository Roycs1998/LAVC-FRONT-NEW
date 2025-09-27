import { CompanyType, type Company } from "../types";

export function canHaveSubscription(c: Company) {
  return c.type !== CompanyType.EVENT_ORGANIZER;
}

export function canHaveTeam(c: Company) {
  return !!c.settings?.canCreateEvents;
}

export function canHaveEvents(c: Company) {
  return (
    c.type === CompanyType.EVENT_ORGANIZER && !!c.settings?.canCreateEvents
  );
}

export function hasAddress(c: Company) {
  const a = c.address;
  return !!(a?.street || a?.city || a?.state || a?.country || a?.zipCode);
}

export function formatAddress(c: Company) {
  const a = c.address ?? {};
  return [a.street, a.city, a.state, a.country, a.zipCode]
    .filter(Boolean)
    .join(", ");
}
