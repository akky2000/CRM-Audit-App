import React from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { user, logout } = useUser();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto h-screen">
        <Header user={user} />
        <MainContent />
      </main>
    </div>
  );
};

export default Dashboard;
