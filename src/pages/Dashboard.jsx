import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import PastReports from "./PastReports"; 
import { useUser } from "../context/UserContext"; 

const Dashboard = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  
  const isPastReportsPage = location.pathname === "/past-reports";

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto h-screen">
        <Header user={user} /> 
        {isPastReportsPage ? <PastReports /> : <MainContent />}
      </main>
    </div>
  );
};

export default Dashboard;
