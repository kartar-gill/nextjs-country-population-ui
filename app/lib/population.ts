import rawData from "./population.json";

export interface PopulationEntry {
  country: string;
  year: number;
  population: number;
}

export const populationData: PopulationEntry[] = rawData as PopulationEntry[];

// Derive the sorted list of unique years directly from the data
export const years: number[] = [...new Set(populationData.map(d => d.year))].sort((a, b) => a - b);

export function getDataForYear(year: number): PopulationEntry[] {
  return populationData
    .filter(d => d.year === year)
    .sort((a, b) => b.population - a.population);
}