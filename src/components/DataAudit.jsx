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

  const handleClick = (itemTitle) => {
    setSelectedItem(itemTitle);
  };

  return (
    <div className="mb-6 p-10">
      <div className=" z-50 flex bg-white">
        {auditData.map((item, index) => (
          <div
            key={index}
            className={`px-20 pb-3 text-center cursor-pointer border-gray-300 bg-white hover:bg-gray-100 ${
              selectedItem === item.title
                ? "transform pt-2 border rounded-b-2xl -mb-6 text-xl  bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                : ""
            }`}
            onClick={() => handleClick(item.title)}
          >
            <p
              className={`text-lg font-semibold ${
                selectedItem === item.title ? "text-xl" : ""
              }`}
            >
              {item.title}
            </p>
            <p
              className={`text-lg font-semibold ${
                selectedItem === item.title ? "text-xl" : ""
              }`}
            >
              {item.score}
            </p>
          </div>
        ))}
      </div>

      <MissingData selectedItem={selectedItem} />
    </div>
  );
};

export default DataAudit;
