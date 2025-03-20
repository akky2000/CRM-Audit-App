import React from "react";
import AuditScore from "../components/AuditScore";
import ScoreBreakdown from "../components/ScoreBreakdown";
import DataAudit from "../components/DataAudit";
import MissingData from "../components/MissingData";


const MainContent = () => {
  return (
    <div className="p-10 space-y-6 max-w-7xl mx-auto px-6 min-h-screen overflow-hidden">
      <AuditScore />
      <ScoreBreakdown />
      <DataAudit />
      <MissingData />
      
    </div>
  );
};

export default MainContent;
