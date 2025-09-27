export function toQueryString(params: Record<string, unknown> = {}): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;

    if (Array.isArray(v)) {
      for (const item of v) sp.append(k, String(item));
      continue;
    }
    if (typeof v === "boolean") {
      sp.set(k, v ? "true" : "false");
      continue;
    }
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}
