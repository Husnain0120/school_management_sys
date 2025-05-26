"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  School,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className=" w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-5xl w-full h-full max-h-[700px] flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left side - SVG and illustration */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-purple-200 opacity-40 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-blue-200 opacity-40 animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-indigo-200 opacity-40 animate-pulse"></div>
          </div>

          {/* Main SVG illustration */}
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Books stack */}
            <rect
              x="120"
              y="180"
              width="160"
              height="30"
              rx="4"
              fill="#6366f1"
            />
            <rect
              x="130"
              y="150"
              width="140"
              height="30"
              rx="4"
              fill="#818cf8"
            />
            <rect
              x="140"
              y="120"
              width="120"
              height="30"
              rx="4"
              fill="#a5b4fc"
            />

            {/* Graduation cap */}
            <rect x="170" y="90" width="60" height="10" rx="2" fill="#4f46e5" />
            <polygon points="200,60 170,80 230,80" fill="#4f46e5" />
            <circle cx="200" cy="60" r="5" fill="#4f46e5" />
            <line
              x1="200"
              y1="80"
              x2="200"
              y2="90"
              stroke="#4f46e5"
              strokeWidth="2"
            />

            {/* 404 text */}
            <text
              x="200"
              y="240"
              fontSize="40"
              fontWeight="bold"
              fill="#4338ca"
              textAnchor="middle"
              className="animate-pulse"
            >
              404
            </text>

            {/* Decorative elements */}
            <circle
              cx="100"
              cy="100"
              r="8"
              fill="#c7d2fe"
              className="animate-ping opacity-75"
            />
            <circle
              cx="300"
              cy="150"
              r="6"
              fill="#c7d2fe"
              className="animate-ping opacity-75"
            />
            <path
              d="M50,150 Q100,100 150,150"
              stroke="#818cf8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M250,100 Q300,150 350,100"
              stroke="#818cf8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <School className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-indigo-900 font-medium text-sm">
                Edu-LMS System
              </h2>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The learning resource you're looking for isn't available. It may
              have been moved or is no longer part of the curriculum.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <h3 className="text-blue-900 font-medium text-sm">
                    Course Library
                  </h3>
                </div>
                <p className="text-blue-700 text-xs">
                  Browse our course catalog
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <h3 className="text-purple-900 font-medium text-sm">
                    Learning Path
                  </h3>
                </div>
                <p className="text-purple-700 text-xs">
                  Return to your dashboard
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => router.back()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 group transition-all"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                Dashboard
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-xs">
              Need help? Try searching for learning resources
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
