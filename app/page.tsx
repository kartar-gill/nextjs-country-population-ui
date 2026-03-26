"use client";

import { useState } from "react";
import BarChart from "./ui/components/bar-chart";
import { populationData, years } from "./lib/population";

export default function Home() {
  const [yearIndex, setYearIndex] = useState(0);
  const year = years[yearIndex];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">
        World Population by Country and Year
      </h1>

      {/* Year display */}
      <p className="text-6xl font-bold text-gray-200 mb-4 select-none">
        {year}
      </p>

      {/* Chart */}
      <BarChart data={populationData} year={year} topN={10} />

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setYearIndex((i) => Math.max(0, i - 1))}
          disabled={yearIndex === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-30"
        >
          ← Previous
        </button>
        <span className="text-gray-500 text-sm">
          {yearIndex + 1} / {years.length}
        </span>
        <button
          onClick={() => setYearIndex((i) => Math.min(years.length - 1, i + 1))}
          disabled={yearIndex === years.length - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
