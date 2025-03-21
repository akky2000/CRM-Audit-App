import React from "react";
import MissingData from "../components/MissingData";

const DataAudit = () => {
  const [selectedItem, setSelectedItem] = React.useState("Contacts");
  const auditData = [
    { title: "Contacts", score: "60/100" },
    { title: "Companies", score: "60/100" },
    { title: "Deals", score: "60/100" },
    { title: "Tickets", score: "60/100" },
  ];

  console.log(selectedItem);

  return (
    <div className="mb-6">
      <div className="flex gap-4">
        {auditData.map((item, index) => (
          <div
            key={index}
            className="px-4 py-3 rounded-t-lg border border-gray-300 border-b-0 text-center cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedItem(item.title)}
          >
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="text-lg font-bold">{item.score}</p>
          </div>
        ))}
      </div>
      <MissingData selectedItem={selectedItem} />
    </div>
  );
};

export default DataAudit;
