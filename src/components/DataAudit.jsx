import React from "react";

const DataAudit = () => {
  const auditData = [
    { title: "Contacts", score: "68/100", warning: true },
    { title: "Companies", score: "64/100", warning: true },
    { title: "Deals", score: "83/100", success: true },
    { title: "Tickets", score: "80/100", highlight: true },
  ];

  return (
    <div className="bg-white p-6 rounded-md max-w-6xl mx-auto my-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Data Audit</h2>

      {/* Responsive Grid for Mobile, Tablet & Laptop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {auditData.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl bg-white border text-center 
            transition-transform duration-300 transform hover:scale-110 hover:shadow-lg 
            hover:border-blue-400 hover:bg-blue-50 cursor-pointer 
            ${item.warning ? "border-yellow-500" : "border-green-300"}`}
          >
            <p className="text-sm sm:text-base font-medium text-gray-600">
              {item.title}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-black mt-2">
              {item.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAudit;
