import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [timestamp, setTimestamp] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      setTimestamp(
        now.toLocaleString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Hide header on the Past Reports page
  if (location.pathname === "/past-reports") return null;

  return (
    <header className="bg-[#E9F9F7] text-black p-4 fixed top-0 left-0 w-full lg:left-72 lg:w-[calc(100%-18rem)] z-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-6 shadow-md">
      
      {/* Left Section: Hi, User & Hub ID (Now in Same Row on Tablets) */}
      <div className="flex flex-col sm:flex-row items-center sm:gap-4 w-full sm:w-auto">
        <h2 className="text-lg font-semibold text-center sm:text-left">
          Hi, {user?.slice(0, 5)}
        </h2>
        <div className="bg-gray-400 text-white px-2 py-1 rounded-md text-xs sm:text-sm mt-1 sm:mt-0">
          Hub ID: 234102 (hubspot-audit.analytics.io)
        </div>
      </div>

      {/* Right Section (Stacked on Tablets) */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
        
        {/* Buttons (Same Row on Tablets) */}
        <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
          <button className="bg-gray-500 text-white px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-black transition">
            Take Bulk Action ↓
          </button>
          <button className="bg-gray-500 text-white px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-black transition">
            Generate New Report
          </button>
        </div>

        {/* Timestamp (Centered on Tablets) */}
        <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-right w-full sm:w-auto">
          Last Updated: {timestamp}
        </p>

        <div className="relative">
          <FaUserCircle
            className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
              <p className="px-4 py-2 text-gray-700 text-sm">
                Logged in as <strong>{user}</strong>
              </p>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-500 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
