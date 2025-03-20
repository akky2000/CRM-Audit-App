import React, { useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const ScoreBreakdown = () => {
  const scores = [
    {
      title: "Data Quality",
      score: 75,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      comingSoon: false,
    },
    {
      title: "Sales",
      score: 45,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      comingSoon: false,
    },
    {
      title: "Marketing",
      score: "?",
      description: "Coming soon.",
      comingSoon: true,
    },
    {
      title: "Services",
      score: "?",
      description: "Coming soon.",
      comingSoon: true,
    },
  ];

  const [selectedScore, setSelectedScore] = useState(scores[0]);

  const gaugeData = [
    { value: selectedScore.comingSoon ? 0 : selectedScore.score },
  ];

  return (
    <div className="p-4 bg-white rounded-lg max-w-6xl mx-auto my-4 shadow-sm">
      <h2 className="text-start font-semibold text-lg mb-3">Score Breakdown</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-3 py-4 rounded-xl">
          {scores.map((item) => (
            <div
              key={item.title}
              onClick={() => !item.comingSoon && setSelectedScore(item)}
              className={`relative p-4 rounded-lg text-black border transition duration-300 cursor-pointer
                ${
                  selectedScore.title === item.title && !item.comingSoon
                    ? "bg-blue-200 font-semibold"
                    : "bg-white hover:bg-gray-100"
                }
                ${item.comingSoon ? "cursor-default pointer-events-none" : ""}
              `}
            >
              <p
                className={`${
                  item.comingSoon ? "text-gray-400 blur-[1px]" : ""
                }`}
              >
                {item.title}
              </p>
              <p
                className={`text-lg font-bold ${
                  item.comingSoon ? "text-gray-400 blur-[1px]" : ""
                }`}
              >
                {item.score}/100
              </p>
              {item.comingSoon && (
                <span className="absolute top-2 right-2 text-xs font-semibold bg-gray-200 text-gray-700 py-1 px-2 rounded-full flex items-center gap-1">
                  🕒 Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Gauge & Description */}
        <div className="flex-1 flex flex-col items-center bg-gray-50 py-4 px-2 rounded-xl border border-gray-200">
          <RadialBarChart
            width={200}
            height={130}
            cx="50%"
            cy={140}
            innerRadius={50}
            outerRadius={90}
            startAngle={180}
            endAngle={0}
            data={gaugeData}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background dataKey="value" fill="url(#grad)" clockWise />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </RadialBarChart>

          {/* Score Text */}
          <div className="text-center mt-8">
            <p className="text-gray-500 font-medium text-sm">Score</p>
            <h2 className="text-2xl font-bold">
              {selectedScore.comingSoon ? "?" : selectedScore.score}%
            </h2>
          </div>

          {/* Dynamic Description */}
          <p className="mt-3 text-gray-600 text-sm text-center px-2">
            {selectedScore.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;
