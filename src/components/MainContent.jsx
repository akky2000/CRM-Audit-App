import React, { useState } from "react";
import AuditScore from "../components/AuditScore";
import ScoreBreakdown from "../components/ScoreBreakdown";
import DataAudit from "../components/DataAudit";

import { useUser } from "../context/UserContext";

const MainContent = () => {
  const date = new Date().toLocaleDateString();
  const [selectedBreakdown, setSelectedBreakdown] = useState("Data Quality");

  return (
    <div className="my-20 max-w-7xl mx-auto min-h-screen overflow-hidden">
      <div>
        <p className="text-end md:mr-10">Last Updated: {date}</p>
      </div>

      <AuditScore />
      <ScoreBreakdown
        selectedBreakdown={selectedBreakdown}
        setSelectedBreakdown={setSelectedBreakdown}
      />

      <DataAudit />
    </div>
  );
};

export default MainContent;
