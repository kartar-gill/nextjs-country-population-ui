"use client";

import ReactECharts from "echarts-for-react";
import { PopulationEntry } from "@/app/lib/population";
import { getCountryColor } from "../countryColours";

interface Props {
  data: PopulationEntry[];
  year: number;
  topN?: number; // 10 default, 15 for vertical animation
}

export default function BarChart({ data, year, topN = 10 }: Props) {
  // Filter to the selected year and sort descending, take top N
  const yearData = data
    .filter((d) => d.year === year)
    .sort((a, b) => b.population - a.population)
    .slice(0, topN);

  const countries = yearData.map((d) => d.country);
  const populations = yearData.map((d) => d.population);
  const colors = countries.map(getCountryColor);

  const option = {
    grid: { left: "20%", right: "5%", top: "5%", bottom: "5%" },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (v: number) => `${(v / 1_000_000).toFixed(0)}M`,
      },
    },
    yAxis: {
      type: "category",
      data: countries, // highest is at bottom by default in ECharts
      inverse: true, // flip so highest is at top
      animationDuration: 300,
      animationDurationUpdate: 800,
    },
    series: [
      {
        type: "bar",
        data: populations.map((pop, i) => ({
          value: pop,
          itemStyle: { color: colors[i] },
        })),
        label: {
          show: true,
          position: "right",
          formatter: (p: { value: number }) =>
            `${(p.value / 1_000_000).toFixed(1)}M`,
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 800,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: topN === 15 ? "600px" : "420px", width: "100%" }}
      notMerge={false} // merge updates → triggers the smooth reorder animation
    />
  );
}
