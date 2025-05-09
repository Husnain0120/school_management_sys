"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle2, Mail, Home, Award, BookOpen } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional redirect after delay
    // setTimeout(() => router.push('/'), 10000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-white px-4 py-10 sm:px-6 md:px-8">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-6 sm:p-8 md:p-10 lg:p-12 text-center relative">
        {/* Top gradient border */}
        <div className="absolute top-2 left-0  right-0 h-1 bg-gradient-to-r from-white via-green-400 to-white  rounded-t-4xl"></div>

        {/* Success Icon */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="bg-green-100 p-3 md:p-4 rounded-full ">
            <CheckCircle2 className="h-10 w-10 md:h-14 md:w-14 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl py-3 md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 mb-3 md:mb-5">
          Congratulations!
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          Your admission form has been successfully submitted to{" "}
          <span className="font-semibold text-indigo-700">
            EduManage Academy
          </span>
          !
        </p>

        {/* Info box */}
        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 mb-6 text-left border border-blue-200">
          <div className="flex items-start mb-4">
            <Mail className="h-5 w-5 text-blue-600 mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">What's Next?</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We've sent a confirmation email. Please check your inbox (and
                spam). Our team will review your application within{" "}
                <span className="font-bold text-blue-600">
                  3-5 working days
                </span>
                .
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Award className="h-5 w-5 text-blue-600 mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">
                Prepare for Admission
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Explore our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  academic programs
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  student resources
                </a>{" "}
                while you wait.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">
              Virtual Campus Tour
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Explore our facilities online
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">
              Scholarship Info
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Check available opportunities
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <Home className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">
              Student Portal
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Login to track your status
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2.5 px-6 rounded-md transition shadow-md"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>

          <button
            onClick={() => router.push("/pages/contact")}
            className="flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2.5 px-6 rounded-md transition shadow-sm"
          >
            Contact Admissions
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-sm text-gray-500">
          Need help? Call us at{" "}
          <span className="font-semibold text-gray-700">+92 300 1234567</span>
        </p>
      </div>
    </div>
  );
}
