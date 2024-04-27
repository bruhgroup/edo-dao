"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface BarGraphProps {
  labels: string[];
  data: number[];
}

const BarGraph: React.FC<BarGraphProps> = ({ labels, data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Votes",
                data: data,
                backgroundColor: [
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(255,51,51,0.2)",
                ], // Customize colors here
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255,51,51,1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [labels, data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarGraph;
