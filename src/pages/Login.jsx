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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-purple-100 w-[100vw] ">
      <div className="bg-white shadow-lg w-96 p-6 text-center ">
        <div className="flex justify-center items-center gap-4 mb-10">
          <img src={image1} alt="Image 1" className="w-7 h-9 mb-2" />
          <img src={boundarylogo} alt="Boundary Logo" className="w-22 h-9 mb-2 "  />
        </div>

        <h2 className="text-xl font-semibold  text-black mb-16">Audit App | Sign In</h2>

        <div className="mt-6 text-left ">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b border-[rgba(218,174,227,255)] p-2 focus:outline-none focus:border-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isOtpGenerated}
          />
        </div>

        <div className="mt-4 text-left mb-10 ">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border-b border-[rgba(218,174,227,255)] p-2 focus:outline-none focus:border-purple-300"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!isOtpGenerated}
          />
        </div>

        <button
          onClick={isOtpGenerated ? handleLogin : handleGenerateOtp}
          className="mb-6 w- bg-white text-purple-500 border border-purple-500 py-2 hover:bg-gray-100 transition"
        >
          {isOtpGenerated ? "Submit" : "Generate OTP"}
        </button>

        {isOtpGenerated && (
          <p className="mt-3 text-md text-black-600 cursor-pointer underline mr-52" onClick={handleGenerateOtp}>
            Resend OTP
          </p>
        )}

        <p className="mt-4 text-gray-500 text-sm">
          Don’t have an account?{" "}
          <span className="text-gray-500 cursor-pointer underline" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>

        {otpSent && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 text-sm rounded-md text-center">
            OTP sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
