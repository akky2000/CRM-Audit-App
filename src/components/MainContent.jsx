import React, { useRef } from "react";
import { useScroll } from "react-use";

import AuditScore from "../components/AuditScore";
import ScoreBreakdown from "../components/ScoreBreakdown";
import DataAudit from "../components/DataAudit";

import { useUser } from "../context/UserContext";

const MainContent = () => {
  const date = new Date().toLocaleDateString();
  const [selectedBreakdown, setSelectedBreakdown] =
    React.useState("Data Quality");

  const scrollRef = useRef(null);
  const { y: scrollY } = useScroll(scrollRef);

  React.useEffect(() => {
    console.log("Scroll Y:", scrollY);
  }, [scrollY]);

  return (
    <div
      ref={scrollRef}
      className="my-20 max-w-7xl mx-auto min-h-screen "
      style={{ maxHeight: "calc(100vh - 80px)" }} // adjust if needed
    >
      <div>
        <p className="text-end md:mr-10">Last Updated: {date}</p>
      </div>

      <AuditScore />
      <ScoreBreakdown
        selectedBreakdown={selectedBreakdown}
        setSelectedBreakdown={setSelectedBreakdown}
      />

      {selectedBreakdown === "Data Quality" ? (
        <DataAudit />
      ) : (
        <div className="p-10">
          <h1 className="text-2xl font-semibold mb-5">
            {selectedBreakdown} Breakdown
          </h1>
          <p className="text-center">Coming Soon!</p>
        </div>
      )}
    </div>
  );
};

export default MainContent;
