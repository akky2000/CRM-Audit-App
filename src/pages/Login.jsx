import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import Context Hook
import boundarylogo from "../assets/boundary.png";
import image1 from "../images/image1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const { login } = useUser(); // ✅ Use login function from context
  const navigate = useNavigate();

  const handleGenerateOtp = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.includes(email)) {
      alert("User not found! Please sign up first.");
      navigate("/signup");
      return;
    }

    if (email) {
      alert(`OTP Sent to ${email}`);
      setIsOtpGenerated(true);
    } else {
      alert("Enter your email first!");
    }
  };

  const handleLogin = () => {
    if (isOtpGenerated && otp === "1234") {
      login(email); // ✅ Updates user in Context API
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        
        <div className="flex justify-center items-center gap-4 mb-2">
          <img src={image1} alt="Image 1" className="w-8 h-12" />
          <img src={boundarylogo} alt="Boundary Logo" className="w-" />
        </div>

        <h2 className="text-xl font-semibold text-gray-700">Audit App | Sign In</h2>

        <div className="mt-6 text-left">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {isOtpGenerated && (
          <div className="mt-4 text-left">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-purple-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {!isOtpGenerated ? (
          <button
            className="mt-6 bg-purple-100 text-purple-500 py-2 px-6 rounded-lg font-medium hover:bg-purple-200 transition"
            onClick={handleGenerateOtp}
          >
            Generate OTP
          </button>
        ) : (
          <button
            className="mt-6 bg-purple-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-purple-600 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        )}

        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <span className="text-purple-500 cursor-pointer" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
