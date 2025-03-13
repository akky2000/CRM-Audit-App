import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser(); // ✅ Get user & logout function from context
  const navigate = useNavigate();
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

  // ✅ Logout and redirect to login page
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#E9F9F7] text-black p-4 fixed top-0 left-0 md:left-[250px] w-full md:w-[calc(100%-250px)] z-10 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 shadow-md">
      {/* Left Section: Greeting & Hub ID */}
      <div className="flex flex-col md:flex-row items-center md:gap-4 w-full md:w-auto">
        <h2 className="text-lg font-semibold">Hi, {user} 👋</h2>
        <div className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm mt-1 md:mt-0">
          Hub ID: 234102 (hubspot-audit.analytics.io)
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:flex-row items-center md:gap-4 w-full md:w-auto justify-end">
        <div className="flex gap-2">
          <button className="bg-black text-white px-3 py-2 rounded-md text-xs md:text-sm lg:text-base hover:bg-gray-800 transition">
            Take Bulk Action ↓
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm lg:text-base hover:bg-blue-600 transition">
            Generate New Report
          </button>
        </div>

        <p className="text-gray-600 text-xs md:text-sm md:text-right w-full md:w-auto mt-1 md:mt-0">
          Last Updated: {timestamp}
        </p>

        {/* User Profile Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="w-8 h-8 md:w-10 md:h-10 text-gray-700 cursor-pointer ml-2"
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <p className="px-4 py-2 text-gray-700 text-sm">Logged in as <strong>{user}</strong></p>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
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
