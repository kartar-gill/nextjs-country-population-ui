"use client";

import { useState } from "react";
import BarChart from "./ui/components/bar-chart";
import { populationData, years } from "./lib/population";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [yearIndex, setYearIndex] = useState(0);
  const year = years[yearIndex];

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-400 p-4 md:h-46">
        <Link href="/">
          <Image
            src="/united-nations.svg"
            alt="United Nations Logo"
            width={176}
            height={150}
            className="hidden md:block"
            priority
          />

          <Image
            src="/united-nations.svg"
            alt="United Nations Logo"
            width={62}
            height={54}
            className="block md:hidden"
            priority
          />
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-2">
        Countries Population By Year (1950 - 2024)
      </h1>

      {/* Year display */}
      <p className="text-5xl font-bold text-gray-400 mb-4 select-none">
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
