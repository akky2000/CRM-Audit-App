import React from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useUser } from "../context/UserContext"; // Import Context Hook

const Dashboard = () => {
  const { user, logout } = useUser(); // ✅ Get user and logout function from Context

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-[#E9F9F7] p-6 pt-16 overflow-auto h-screen">
        <Header user={user} />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4"
          onClick={logout} // ✅ Logout user
        >
          Logout
        </button>
        <MainContent />
      </main>
    </div>
  );
};

export default Dashboard;
