import React from "react";
import { Bar } from "recharts";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";

const MissingData = () => {
  const missingData = [
    { title: "Deals without Name", percentage: "0%", count: "0 / 84", status: "critical" },
    { title: "Deals without Owner", percentage: "4.48%", count: "10 / 223", status: "critical" },
    { title: "Deals without Associated Contact", percentage: "96.4%", count: "215 / 223", status: "ok" },
    { title: "Deals without Associated Company", percentage: "9.54%", count: "20 / 223", status: "warning" },
  ];

  const mustHaveData = [
    { title: "Deals without Close Date", percentage: "0%", count: "0 / 223", status: "ok" },
    { title: "Deals without Amount", percentage: "0.07%", count: "1 / 223", status: "warning" },
    { title: "Lost Deals without Last Reason", percentage: "4.77%", count: "11 / 223", status: "ok" },
    { title: "Deals without Deal Type", percentage: "0%", count: "0 / 223", status: "ok" },
  ];

  const chartData = [
    { name: "Closed Deals", value: 150 },
    { name: "Lost Deals", value: 40 },
    { name: "Deals without Owner", value: 10 },
    { name: "Deals without Contact", value: 215 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Missing Data - Deals</h2>
      
      {/* Section 1: Are You Kidding Me! */}
      <h3 className="text-lg font-semibold mb-3">Are you kidding me!</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {missingData.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md border border-gray-300 text-center transition transform  hover:bg-blue-200 hover:scale-105 cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-700">{item.title}</p>
            <p className="text-lg font-bold text-blue-500">{item.percentage}</p>
            <p className="text-xs text-gray-600">{item.count}</p>
            {item.status === "ok" ? (
              <FaCheckCircle className="text-green-500 text-lg mx-auto mt-2" />
            ) : (
              <FaExclamationTriangle className="text-red-500 text-lg mx-auto mt-2" />
            )}
          </div>
        ))}
      </div>

      {/* Data Visualization */}
      <h4 className="text-center font-semibold mt-6">By Source</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>

      {/* Section 2: Must-Have */}
      <h3 className="text-lg font-semibold mt-6 mb-3">Must-Have</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {mustHaveData.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md border border-gray-300 text-center transition transform hover:scale-105 hover:bg-blue-200 cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-700">{item.title}</p>
            <p className="text-lg font-bold text-blue-500">{item.percentage}</p>
            <p className="text-xs text-gray-600">{item.count}</p>
            {item.status === "ok" ? (
              <FaCheckCircle className="text-green-500 text-lg mx-auto mt-2" />
            ) : (
              <FaExclamationTriangle className="text-red-500 text-lg mx-auto mt-2" />
            )}
          </div>
        ))}
      </div>

      {/* Second Data Visualization */}
      <h4 className="text-center font-semibold mt-6">By Source</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MissingData;
