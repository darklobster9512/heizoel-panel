import { CITIES } from "./cities";
import type { City, StateSlug } from "./regions";

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

const grouped = new Map<StateSlug, City[]>();
for (const c of CITIES) {
  const list = grouped.get(c.state) ?? [];
  list.push(c);
  grouped.set(c.state, list);
}

/** Städte eines Bundeslands, absteigend nach Einwohnerzahl */
export function citiesOfState(state: StateSlug): City[] {
  return grouped.get(state) ?? [];
}

/** Städte eines Bundeslands, alphabetisch */
export function citiesOfStateAlpha(state: StateSlug): City[] {
  return [...citiesOfState(state)].sort((a, b) => a.name.localeCompare(b.name, "de"));
}

/** Nachbarorte: nächstliegende PLZ-Bereiche im gleichen Bundesland */
export function nearbyCities(city: City, count = 10): City[] {
  const others = citiesOfState(city.state).filter((c) => c.slug !== city.slug);
  const base = Number(city.plz);
  return others
    .map((c) => ({ c, d: Math.abs(Number(c.plz) - base) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((e) => e.c);
}

export { CITIES };
