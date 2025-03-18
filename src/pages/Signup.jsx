import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import boundarylogo from "../assets/boundary.png";
import image1 from "../images/image1.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (email) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.includes(email)) {
        alert("User already exists! Please log in.");
        navigate("/");
        return;
      }

      users.push(email);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful! Please log in.");
      navigate("/");
    } else {
      alert("Enter a valid email!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">

        {/* ✅ Fixed: Both Logos in One Line */}
        <div className="flex justify-center items-center gap-4 mb-2">
          <img src={image1} alt="Image 1" className="w-12 h-12" />
          <img src={boundarylogo} alt="Boundary Logo" className="w-32" />
        </div>

        <h2 className="text-xl font-semibold text-gray-700">Sign Up</h2>

        <div className="mt-6 text-left">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <span className="text-purple-500 cursor-pointer" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
