import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Hide header on the Past Reports page
  if (location.pathname === "/past-reports") return null;

  return (
    <header className="text-black p-5 bg-[#f8fafd] fixed top-0 left-0 w-full lg:left-72 lg:w-[calc(100%-18rem)] z-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-6">
      {/* Left Section: Hi, User & Hub ID (Now in Same Row on Tablets) */}
      <div className="flex sm:flex-row items-center sm:gap-4 w-full sm:w-auto">
        <h2 className="text-2xl text-center sm:text-left">Hi, {user}</h2>
        <div className="bg-gray-400 text-white px-2 py-1 rounded-md text-xs sm:text-sm mt-1 sm:mt-0">
          Hub ID: 234102 (hubspot-audit.analytics.io)
        </div>
      </div>

      {/* Right Section (Stacked on Tablets) */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
        {/* Buttons (Same Row on Tablets) */}
        <div className="flex md:flex-row gap-2 w-full sm:w-auto">
          <button>Take Bulk Action ↓</button>
          <button>Generate New Report</button>
        </div>

        <div className="relative">
          <FaUserCircle
            className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
