import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PastReports from "./pages/PastReports";
import NotFound from "./pages/NotFound";
import PastReportDetail from "./pages/PastReportDetails";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/past-reports" element={<PastReports />} />
          <Route
            path="/past-reports/:reportID"
            element={<PastReportDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
