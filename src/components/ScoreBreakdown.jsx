import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { findBorderColor, getScoreColor } from "../utils";

const ScoreBreakdown = ({ selectedBreakdown, setSelectedBreakdown }) => {
  const scores = [
    {
      title: "Data Quality",
      score: 75,
      description:
        "Lorem Ipsum is simply dummy text since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      comingSoon: false,
    },
    {
      title: "Sales",
      score: 45,
      description:
        "Lorem Ipsum is simply dummy text since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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

  const pathColor = selectedScore.comingSoon
    ? "#d1d5db"
    : getScoreColor(selectedScore.score);

  return (
    <div className="p-4 bg-white rounded-lg max-w-6xl mx-auto my-4">
      <h2 className="text-start font-semibold text-lg mb-3">Score Breakdown</h2>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Left Side - Scores */}
        <div className="flex-1 flex flex-col gap-3 rounded-xl">
          {scores.map((item) => (
            <div
              key={item.title}
              onClick={() => {
                if (!item.comingSoon) {
                  setSelectedScore(item);
                  setSelectedBreakdown(item.title);
                }
              }}
              className={`relative p-4 rounded-lg text-black border ${findBorderColor(
                item.score
              )} transition duration-300 cursor-pointer w-[85%] mx-auto
                ${
                  selectedScore.title === item.title && !item.comingSoon
                    ? " bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef] font-semibold"
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

        {/* Right Side - Circular Progress Bar & Description */}
        <div className="flex-1 flex flex-col items-center py-6 rounded-xl border border-gray-200">
          <div className="w-36 h-36">
            <CircularProgressbar
              value={selectedScore.comingSoon ? 0 : selectedScore.score}
              text={`${selectedScore.comingSoon ? "?" : selectedScore.score}%`}
              strokeWidth={10}
              styles={buildStyles({
                textColor: "#374151",
                pathColor,
                trailColor: "#e5e7eb",
                strokeLinecap: "round",
                textSize: "20px",
              })}
            />
          </div>

          {/* Selected Score Title */}
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            {selectedScore.title}
          </h2>

          {/* Dynamic Description */}
          <p className="mt-3 text-gray-600 text-sm px-2 text-start">
            {selectedScore.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;
