import React, { useState } from "react";
import { FiMenu, FiPlus, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import boundaryLogo from "../images/boundary.png";
import Logo1 from "../images/image1.png";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state
  const [selected, setSelected] = useState(""); // Selected menu item

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-[#6fb1da] text-black p-2 rounded md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Wrapper (Fixed Sidebar Issue) */}
      <div
        className={`fixed inset-y-0 left-0 bg-[#E9F9F7] z-40 shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:w-64 w-64`}
      >
        <aside className="h-screen flex flex-col relative">
          {/* Close Button (Right Aligned) */}
          <button
            className="absolute top-4 right-4 text-black md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={24} />
          </button>

          {/* Sidebar Header */}
          <div className="flex items-center justify-start space-x-2 p-4 mt-6 md:mt-0">
            <img src={Logo1} alt="New Logo" className="h-8 w-8 object-contain" />
            <img src={boundaryLogo} alt="Boundary Logo" className="h-8 w-auto object-contain" />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              to="/dashboard"
              className={`px-4 py-3 rounded-md transition ${
                selected === "report" || location.pathname === "/dashboard"
                  ? "bg-[#D0F0EC] text-black font-bold"
                  : "hover:bg-[#D0F0EC] hover:text-black"
              }`}
              onClick={() => {
                setSelected("report");
                setIsOpen(false);
              }}
            >
              Your Report
            </Link>

            <Link
              to="/past-reports"
              className={`px-4 py-3 rounded-md transition ${
                selected === "past" || location.pathname === "/past-reports"
                  ? "bg-[#D0F0EC] text-black font-bold"
                  : "hover:bg-[#D0F0EC] hover:text-black"
              }`}
              onClick={() => {
                setSelected("past");
                setIsOpen(false);
              }}
            >
              Past Reports
            </Link>
          </nav>

          {/* Credits Section */}
          <div className="mt-auto p-4 bg-[#E9F9F7] text-center rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-700">Available Credits</p>
            <p className="text-lg font-bold text-red-600 tracking-wide">-80 / 100</p>
            <button
              className="mt-3 px-4 py-2 rounded-lg flex items-center justify-center mx-auto bg-green-500 text-white hover:bg-green-400 transition-all duration-200 shadow-md"
              onClick={() => alert("Credits Added!")}
            >
              <FiPlus className="mr-2" size={18} /> Add Credits
            </button>
          </div>
        </aside>
      </div>

      {/* Fix for Overlapping Content: Shift Main Content on Larger Screens */}
      <div className={`transition-all duration-300 ${isOpen ? "ml-0" : "ml-0"} md:ml-64`}>
        {/* Overlay (Click Outside to Close Sidebar on Mobile) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
