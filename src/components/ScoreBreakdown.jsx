import React from "react";

const ScoreBreakdown = () => {
  const scores = [
    { title: "Data Quality", score: "72.75/100", highlight: true },
    { title: "Reporting", score: "2/100", comingSoon: true },
    { title: "Actions", score: "18/100", comingSoon: true },
    { title: "Performance", score: "22/100", comingSoon: true },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Score Breakdown</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {scores.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white shadow-md border border-gray-300
            hover:bg-blue-200 hover:shadow-lg cursor-pointer"
          >
            <p className="text-sm sm:text-base font-medium text-gray-600">{item.title}</p>
            <p className="text-lg sm:text-2xl font-bold text-black mt-2">{item.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
