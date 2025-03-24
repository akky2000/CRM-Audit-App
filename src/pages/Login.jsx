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
    <div className="flex justify-center items-center  h-screen bg-gradient-to-r from-gray-100 to-purple-100 w-[100vw] ">
      <div className="bg-white  shadow-lg w-96 p-7 text-center">
        <div className="flex justify-center items-center gap-4   ">
          <img src={image1} alt="Image 1" className="w-7 h-9 mb-14" />
          <img src={boundarylogo} alt="Boundary Logo" className="w-26 h-9 mb-14" />
        </div>

        <h2 className="text-xl font-semibold text-black p-42 ml-3  ">
            Audit App | Sign In
        </h2>

        <div className="mt-11 text-left ">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b border-purple-200 p-2 focus:outline-none focus:border-purple-500 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isOtpGenerated}
          />
        </div>

        <div className="mt-4 text-left">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border-b border-purple-200 p-2 focus:outline-none focus:border-purple-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!isOtpGenerated}
          />
        </div>

        <button
          onClick={isOtpGenerated ? handleLogin : handleGenerateOtp}
          className="mt-9 w-31 h-12 bg-white text-purple-500 border border-purple-500  py-2  hover:bg-white transition"
        >
          {isOtpGenerated ? "Submit" : "Generate OTP"}
        </button>

      
        {isOtpGenerated && (
          <p className="mt-3  mr-56 text-semibold text-black-200  cursor-pointer underline" onClick={handleGenerateOtp}>
            Resend OTP
          </p>
        )}

        <p className="mt-4 text-gray-600 text-sm mt-7">
          Don’t have an account?{" "}
          <span className="text-gray  cursor-pointer underline" onClick={() => navigate("")}>
            Sign Up
          </span>
        </p>

        {otpSent && (
          <div className="p-2 bg-green-100 text-green-700 text-sm rounded-md text-center">
          OTP sent successfully!
        </div>
      )}
    </div>
      </div>
      
      
  );
};

export default Login;
