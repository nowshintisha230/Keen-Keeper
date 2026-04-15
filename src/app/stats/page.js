"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const STORAGE_KEY = "timeline";
export default function AnalyticsPage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [counts, setCounts] = useState({ text: 0, call: 0, video: 0 });
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const text = stored.filter((e) => e.type === "text").length;
    const call = stored.filter((e) => e.type === "call").length;
    const video = stored.filter((e) => e.type === "video").length;

    setCounts({ text, call, video });

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const total = text + call + video;

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Text", "Call", "Video"],
        datasets: [
          {
            data: total === 0 ? [1, 1, 1] : [text, call, video],
            backgroundColor: ["#7F77DD", "#1D3830", "#1D9E75"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "60%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                total === 0
                  ? " No data yet"
                  : ` ${ctx.label}: ${ctx.parsed}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Friendship Analytics</h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <p className="text-sm text-gray-500 mb-6">By interaction type</p>

        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-48 relative">
            <canvas ref={chartRef} />
          </div>

          <div className="flex gap-5 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7F77DD] inline-block" />
              Text
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1D3830] inline-block" />
              Call
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1D9E75] inline-block" />
              Video
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}