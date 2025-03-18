import React from "react";
import AuditScore from "../components/AuditScore";
import ScoreBreakdown from "../components/ScoreBreakdown";
import DataAudit from "../components/DataAudit";
import MissingData from "../components/MissingData";

const MainContent = () => {
  return (
    <div className="p-10 space-y-6 bg-[#E9F9F7] max-w-7xl mx-auto px-6 min-h-screen overflow-hidden">
      <AuditScore />
      <h2 className="text-lg font-semibold"></h2>
      <ScoreBreakdown />
      <h2 className="text-lg font-semibold"></h2>
      <DataAudit />
      
      <MissingData />
    </div>
  );
};

export default MainContent;