"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle2, Mail, Home, Award, BookOpen } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally redirect after few seconds if needed
    // setTimeout(() => router.push('/'), 10000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 max-w-4xl w-full text-center overflow-hidden relative">
        {/* Confetti effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400"></div>

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-bounce">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 mb-6">
          Congratulations! 🎉
        </h1>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Your admission form has been successfully submitted to{" "}
          <span className="font-semibold text-indigo-600">
            EduManage Academy
          </span>
          !
        </p>

        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left border border-blue-100">
          <div className="flex items-start mb-4">
            <Mail className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-blue-800 mb-1">
                What's Next?
              </h3>
              <p className="text-gray-700">
                We've sent a confirmation to your email. Check your inbox (and
                spam folder) for updates. Our team will review your application
                within{" "}
                <span className="font-bold text-blue-600">
                  3-5 working days
                </span>
                .
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Award className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-blue-800 mb-1">
                Prepare for Admission
              </h3>
              <p className="text-gray-700">
                While you wait, explore our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  academic programs
                </a>{" "}
                and
                <a href="#" className="text-blue-600 hover:underline ml-2">
                  student resources
                </a>{" "}
                to get a head start!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800">Virtual Campus Tour</h4>
            <p className="text-sm text-gray-600 mt-1">
              Explore our facilities online
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800">Scholarship Info</h4>
            <p className="text-sm text-gray-600 mt-1">
              Check available opportunities
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <Home className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800">Student Portal</h4>
            <p className="text-sm text-gray-600 mt-1">
              Login to track your status
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Contact Admissions
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Need immediate assistance? Call our helpline:{" "}
          <span className="font-semibold">+92 300 1234567</span>
        </p>
      </div>
    </div>
  );
}
