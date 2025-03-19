import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const ScoreBreakdown = () => {
  const scores = [
    { title: "Data Quality", score: "72.75/100" },
    { title: "Sales", score: "2/100" },
    { title: "Marketing", score: "18/100" },
    { title: "Services", score: "22/100" },
  ];

  const gaugeData = [{ value: 55 }];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto mt-6">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center md:text-left">
        Score Breakdown
      </h2>

      {/* Responsive Layout (Dynamically Adjusts for Tablets) */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch">
        {/* Left Section: Score Categories */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {scores.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white shadow-md border border-gray-300 text-center 
               hover:bg-blue-200 hover:shadow-xl  duration-300 transform hover:scale-105 cursor-pointer"
            >
              <p className="text-lg font-medium text-gray-600">{item.title}</p>
              <p className="text-xl font-bold text-black mt-2">{item.score}</p>
            </div>
          ))}
        </div>

        {/* Right Section: Auto-Adjusting Gauge Chart */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 w-full min-h-[250px] md:min-h-[350px] ">
          {/* Gauge Chart */}
          <div className="relative w-full flex justify-center my-12 mt-1">
            <RadialBarChart
              width={250} // Scales better on tablets
              height={130} // Keeps the semi-circle shape
              cx="50%"
              cy={150}
              innerRadius={60}
              outerRadius={100}
              startAngle={180}
              endAngle={0}
              data={gaugeData}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
                fill="url(#grad)"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="red" />
                  <stop offset="50%" stopColor="yellow" />
                  <stop offset="100%" stopColor="green" />
                </linearGradient>
              </defs>
            </RadialBarChart>

            {/* Score Text Inside the Gauge */}
            <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-lg font-semibold text-gray-600 mt-24 ">Score</p>
              <h2 className="text-xl font-bold text-black ">
                {gaugeData[0].value}%
              </h2>
            </div>
          </div>

          
          <p className="text-gray-600 text-sm mt-4 px-4 text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste obcaecati eius neque
            expedita dolor et ipsum ad architecto repellendus autem saepe, eligendi laboriosam
            ex atque, doloribus velit cumque molestias recusandae!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;
