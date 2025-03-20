import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import boundarylogo from "../assets/boundary.png";
import image1 from "../images/image1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleGenerateOtp = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.includes(email)) {
      alert("User not found! Please sign up first.");
      navigate("/signup");
      return;
    }

    if (email) {
      setIsOtpGenerated(true);
      setOtpSent(true);
      setTimeout(() => setOtpSent(false), 3000);
    } else {
      alert("Enter your email first!");
    }
  };

  const handleLogin = () => {
    if (otp === "1234") {
      login(email);
      navigate("/dashboard");
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-purple-100 w-[100vw]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
          <img src={image1} alt="Image 1" className="w-8 h-12" />
          <img src={boundarylogo} alt="Boundary Logo" className="w-20" />
        </div>

        <h2 className="text-xl font-semibold text-gray-700">
          Audit App | Sign In
        </h2>

        <div className="mt-6 text-left">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isOtpGenerated}
          />
        </div>

        <div className="mt-4 text-left">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-purple-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!isOtpGenerated}
          />
        </div>

        <button
          onClick={isOtpGenerated ? handleLogin : handleGenerateOtp}
          className="mt-6 w-full bg-pink-200 text-white py-2 rounded-lg hover:bg-purple-400 transition"
        >
          {isOtpGenerated ? "Submit" : "Generate OTP"}
        </button>

        {isOtpGenerated && (
          <p
            className="mt-3 text-sm text-purple-600 cursor-pointer"
            onClick={handleGenerateOtp}
          >
            Resend OTP
          </p>
        )}

        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-purple-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

        {otpSent && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-lg text-sm">
            OTP sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
