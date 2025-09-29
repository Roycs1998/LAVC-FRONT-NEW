// utils/clean.ts
type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSONValue[]
  | { [k: string]: JSONValue };

function isEmptyString(v: unknown) {
  return typeof v === "string" && v.trim() === "";
}

function isEmptyArray(v: unknown) {
  return Array.isArray(v) && v.every((x) => x == null || isEmptyString(x));
}

function isPlainObject(v: unknown) {
  return v != null && typeof v === "object" && !Array.isArray(v);
}

export function deepClean<T extends JSONValue>(obj: T): any {
  if (obj == null) return obj;

  // Strings
  if (typeof obj === "string") {
    const trimmed = obj.trim();
    return trimmed === "" ? undefined : trimmed;
  }

  // Números enviados como string vacía
  if (typeof obj === "number") return obj;

  // Arrays
  if (Array.isArray(obj)) {
    const cleaned = obj
      .map((x) => deepClean(x as any))
      .filter(
        (x) =>
          x !== undefined &&
          x !== null &&
          !(typeof x === "string" && x.trim() === "")
      );
    return cleaned.length ? cleaned : undefined;
  }

  // Objetos
  if (isPlainObject(obj)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      const cleaned = deepClean(v as any);

      // Si es número en string y está vacío -> undefined
      if (typeof cleaned === "string" && cleaned.trim() === "") continue;

      // Si audienceSize.min/max vienen como string, conviértelos a number si procede
      if (
        (k === "min" ||
          k === "max" ||
          k === "hourlyRate" ||
          k === "yearsExperience") &&
        typeof cleaned === "string"
      ) {
        const n = Number(cleaned);
        if (!Number.isFinite(n)) continue; // ignora no numéricos
        out[k] = n;
        continue;
      }

      if (
        cleaned !== undefined &&
        cleaned !== null &&
        !(isPlainObject(cleaned) && Object.keys(cleaned).length === 0)
      ) {
        out[k] = cleaned;
      }
    }
    return Object.keys(out).length ? out : undefined;
  }

  return obj;
}

export function deepDiff(base: any, changed: any): any {
  if (base === changed) return undefined;
  if (
    typeof base !== "object" ||
    typeof changed !== "object" ||
    !base ||
    !changed
  )
    return changed;

  const keys = new Set([...Object.keys(base), ...Object.keys(changed)]);
  const out: Record<string, any> = {};
  for (const k of keys) {
    const d = deepDiff(base?.[k], changed?.[k]);
    if (d !== undefined) out[k] = d;
  }
  return Object.keys(out).length ? out : undefined;
}
