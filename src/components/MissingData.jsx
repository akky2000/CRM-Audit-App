import React from "react";

const MissingData = () => {
  const missingData = [
    { title: "Deals without Name", percentage: "0%", count: "0 / 84" },
    { title: "Deals without Owner", percentage: "12.05%", count: "10 / 84" },
    { title: "Deals without Associated Contact", percentage: "0%", count: "0 / 84" },
    { title: "Deals without Associated Company", percentage: "46.99%", count: "39 / 84" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4  ">Missing Data-Deals</h2>
      <h3>Are you kidding me!</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {missingData.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-md bg-white text-center border border-gray-200
          hover:bg-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <p className="text-sm md:text-base font-medium text-gray-700">{item.title}</p>
            <p className="text-lg md:text-xl font-bold text-blue-500">{item.percentage}</p>
            <p className="text-xs md:text-sm text-gray-600">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissingData;
