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
      <main className="flex-1 p-6 pt-16 overflow-auto h-screen">
        <Header user={user} />
        
       
        {!isPastReportsPage && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4"
            onClick={logout}
          >
            Logout
          </button>
        )}

        
        {isPastReportsPage ? <PastReports /> : <MainContent />}
      </main>
    </div>
  );
};

export default Dashboard;
