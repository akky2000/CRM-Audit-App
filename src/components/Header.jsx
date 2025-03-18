import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#E9F9F7] text-black p-4 fixed top-0 left-0 w-full md:left-[250px] md:w-[calc(100%-250px)] z-10 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6 shadow-md lg:flex-row lg:items-center lg:justify-between">
      
      {/* Left Section: Greeting & Hub ID */}
      <div className="flex flex-col md:flex-row items-center md:gap-4 w-full md:w-auto lg:flex-row lg:items-center">
        <h2 className="text-lg font-semibold text-center md:text-left">
        Hi, {user?.slice(0, 5)}

        </h2>
        <div className="bg-gray-400 text-white px-2 py-1 rounded-md text-xs md:text-sm mt-1 md:mt-0 lg:px-3">
          Hub ID: 234102 (hubspot-audit.analytics.io)
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto justify-end lg:flex-row lg:items-center">
        
        {/* Buttons: Stacked on Mobile, Row on Tablet/Laptop */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto lg:flex-row">
          <button className="bg-gray-500 text-white px-3 py-2 rounded-md text-xs md:text-sm hover:bg-black transition w-full sm:w-auto lg:px-4">
            Take Bulk Action ↓
          </button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition w-full sm:w-auto lg:px-4">
            Generate New Report
          </button>
        </div>

        {/* Timestamp - Adjusts Responsively */}
        <p className="text-gray-600 text-xs md:text-sm text-center md:text-right w-full md:w-auto lg:text-base">
          Last Updated: {timestamp}
        </p>

        {/* User Profile Icon */}
        <div className="relative">
          <FaUserCircle
            className="w-7 h-7 md:w-8 md:h-8 text-gray-700 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <p className="px-4 py-2 text-gray-700 text-sm">
                Logged in as <strong>{user}</strong>
              </p>
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
