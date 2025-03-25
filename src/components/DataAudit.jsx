import React from "react";
import MissingData from "../components/MissingData";

const DataAudit = () => {
  const [selectedItem, setSelectedItem] = React.useState("Contacts");
  const auditData = [
    { title: "Contacts", score: "60/100", issue: true },
    { title: "Companies", score: "60/100", issue: true },
    { title: "Deals", score: "60/100", issue: true },
    { title: "Tickets", score: "60/100", issue: false },
  ];

  const handleClick = (itemTitle) => {
    setSelectedItem(itemTitle);
  };

  return (
    <div className="mb-6 px-4 md:px-10">
      {/* Audit Score Section */}
      <div className="w-full flex flex-wrap justify-center md:justify-start gap-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {auditData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-48 h-24 md:w-56 md:h-28 text-center cursor-pointer border rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105
              ${selectedItem === item.title ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef] border-blue-300" :
                item.issue ? "bg-white border-red-400" : "bg-white border-green-400"}
            `}
            onClick={() => handleClick(item.title)}
          >
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
            <p className="text-md font-semibold text-gray-600">{item.score}</p>
          </div>
        ))}
      </div>

      {/* Missing Data Section */}
      <div className="mt-6 w-full bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <MissingData selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default DataAudit;