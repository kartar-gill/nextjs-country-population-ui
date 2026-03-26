const PALETTE = [
  "#e63946", "#457b9d", "#2a9d8f", "#e9c46a", "#f4a261",
  "#264653", "#a8dadc", "#6a4c93", "#1982c4", "#8ac926",
  "#ff595e", "#ffca3a", "#6a994e", "#bc4749", "#52b788"
];

const cache = new Map<string, string>();

export function getCountryColor(country: string): string {
  if (cache.has(country)) return cache.get(country)!;
  
  const idx = [...country].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % PALETTE.length;
  const colour = PALETTE[idx];
  cache.set(country, colour);
  
  return colour;
}