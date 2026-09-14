const cache = new Map<string, string | null>();

/** Ermittelt den Ortsnamen zu einer deutschen 5-stelligen PLZ (Zippopotam.us, kostenlos, ohne Key). */
export async function lookupPlzCity(plz: string): Promise<string | null> {
  const clean = plz.replace(/\D/g, "");
  if (clean.length !== 5) return null;
  if (cache.has(clean)) return cache.get(clean) ?? null;

  try {
    const res = await fetch(`https://api.zippopotam.us/de/${clean}`);
    if (!res.ok) {
      cache.set(clean, null);
      return null;
    }
    const data = (await res.json()) as { places?: Array<{ "place name"?: string }> };
    const city = data.places?.[0]?.["place name"] ?? null;
    cache.set(clean, city);
    return city;
  } catch {
    return null;
  }
}
