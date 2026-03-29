"use client";

import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { PopulationEntry } from "@/app/lib/population";
import { getCountryColor } from "../countryColours";

interface Props {
  data: PopulationEntry[];
  year: number;
  topN?: number;
}

type Orientation = "horizontal" | "vertical";

export default function BarChart({ data, year, topN = 10 }: Props) {
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [numberOfResults, setNumberOfResults] = useState<number>(topN);
  const [isHorizontal, setIsHorizontal] = useState<boolean>(true);

  // Handle button click to update multiple states
  const handleClick = (
    orientationSelection: Orientation,
    noOfResults: number,
  ) => {
    setOrientation(orientationSelection);
    setNumberOfResults(noOfResults);
    setIsHorizontal(orientationSelection === "horizontal");
  };

  // Filter to the selected year and sort descending, take top N
  const yearData = data
    .filter((d) => d.year === year)
    .sort((a, b) => b.population - a.population)
    .slice(0, numberOfResults);

  const countries = yearData.map((d) => d.country);
  const populations = yearData.map((d) => d.population);
  const colours = countries.map(getCountryColor);

  const option = {
    grid: isHorizontal
      ? { left: "20%", right: "8%", top: "5%", bottom: "5%" }
      : { left: "5%", right: "5%", top: "20%", bottom: "8%" },
    xAxis: isHorizontal
      ? {
          type: "value",
          axisLabel: {
            formatter: (v: number) => `${(v / 1_000).toFixed(0)}M`,
          },
        }
      : {
          type: "category",
          data: countries,
          axisLabel: { rotate: 45, fontSize: 11 },
        },

    yAxis: isHorizontal
      ? {
          type: "category",
          data: countries,
          inverse: true,
        }
      : {
          type: "value",
          axisLabel: {
            formatter: (v: number) => `${(v / 1_000).toFixed(0)}M`,
          },
        },

    series: [
      {
        type: "bar",
        data: populations.map((pop, i) => ({
          value: pop,
          itemStyle: { color: colours[i] },
        })),
        label: {
          show: true,
          position: isHorizontal ? "right" : "top",
          formatter: (p: { value: number }) =>
            `${(p.value / 1_000_000).toFixed(2)}B`,
          fontSize: isHorizontal ? 10 : 6,
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 800,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };

  return (
    <div style={{ position: "relative" }}>
      <p className="flex items-center justify-center text-1xl font-semibold mb-1">
        Top {numberOfResults} Results
      </p>

      {/* Orientation toggle — top right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          gap: 4,
          zIndex: 10,
        }}
      >
        {(["horizontal", "vertical"] as Orientation[]).map((o) => (
          <button
            key={o}
            onClick={() => handleClick(o, o === "horizontal" ? 10 : 15)}
            title={o === "vertical" ? "Vertical bars" : "Horizontal bars"}
            style={{
              width: 32,
              height: 32,
              border: `1px solid ${orientation === o ? "#555" : "#ddd"}`,
              borderRadius: 6,
              background: orientation === o ? "#111" : "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            {/* SVG icon representing each orientation */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {o === "vertical" ? (
                // Three vertical bars of different heights
                <>
                  <rect
                    x="1"
                    y="6"
                    width="3"
                    height="9"
                    rx="0.5"
                    fill={orientation === o ? "#fff" : "#888"}
                  />
                  <rect
                    x="6"
                    y="3"
                    width="3"
                    height="12"
                    rx="0.5"
                    fill={orientation === o ? "#fff" : "#888"}
                  />
                  <rect
                    x="11"
                    y="8"
                    width="3"
                    height="7"
                    rx="0.5"
                    fill={orientation === o ? "#fff" : "#888"}
                  />
                </>
              ) : (
                // Three horizontal bars of different widths
                <>
                  <rect
                    x="1"
                    y="2"
                    width="13"
                    height="3"
                    rx="0.5"
                    fill={orientation === o ? "#fff" : "#888"}
                  />
                  <rect
                    x="1"
                    y="7"
                    width="9"
                    height="3"
                    rx="0.5"
                    fill={orientation === o ? "#fff" : "#888"}
                  />
                  <rect
                    x="1"
                    y="12"
                    width="6"
                    height="3"
                    rx="0.5"
                    fill={orientation === o ? "#fff" : "#888"}
                  />
                </>
              )}
            </svg>
          </button>
        ))}
      </div>
      <ReactECharts
        option={option}
        style={{ height: topN === 15 ? "600px" : "420px", width: "100%" }}
        notMerge={false}
      />
    </div>
  );
}
