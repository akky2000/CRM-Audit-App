import React from "react";
import AuditScore from "../components/AuditScore";
import ScoreBreakdown from "../components/ScoreBreakdown";
import DataAudit from "../components/DataAudit";
import MissingData from "../components/MissingData";

const MainContent = () => {
  const date = new Date().toLocaleDateString();
  return (
    <div className="my-20 max-w-7xl mx-auto min-h-screen overflow-hidden">
      <p className="text-end md:mr-4">Last Updated: {date}</p>
      <AuditScore />
      <ScoreBreakdown />
      <DataAudit />
      <MissingData />
    </div>
  );
};

export default MainContent;
