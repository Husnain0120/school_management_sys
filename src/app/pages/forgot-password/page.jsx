"use client";
import { useState } from "react";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = () => {
    if (email) setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) setStep(3);
  };

  const handleResetPassword = () => {
    if (password === confirmPassword && password.length >= 6) {
      alert("Password reset successfully!");
    } else {
      alert("Passwords do not match or are too short.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            We’ll help you recover access
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white text-sm py-3 rounded-xl hover:bg-blue-700 transition duration-200"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white text-sm py-3 rounded-xl hover:bg-green-700 transition duration-200"
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-purple-600 text-white text-sm py-3 rounded-xl hover:bg-purple-700 transition duration-200"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
