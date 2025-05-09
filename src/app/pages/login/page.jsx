"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  ClipboardList,
  ArrowRight,
  UserPlus2,
  SquareArrowOutDownLeft,
  File,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    studentId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard/admin");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md rounded-xl  p-8 sm:p-10 transition-all duration-200 ">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-indigo-100 rounded-lg mb-4">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edu Manage <span className="text-indigo-600">LMS</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Student ID
              </Label>
              <Input
                name="studentId"
                value={credentials.studentId}
                onChange={handleChange}
                className="w-full border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter student ID"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link
                  href="/pages/forgot-password"
                  className="text-xs text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick Links */}
          <div className="mt-6 space-y-2">
            <Link
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
              href={"/pages/admission"}
            >
              <UserPlus2 className="h-4 w-4 text-red-600" />
              <span className="animate-pulse text-md text-red-600">
                admission open{" "}
              </span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded-md transition-colors  ">
              <File className="h-4 w-4 text-indigo-600" />
              <span className=" text-md text-indigo-600">
                New Registered Students{" "}
                <span className="bg-red-500 p-1 rounded-full text-[10px] text-white">
                  1.5k
                </span>
              </span>
            </div>
            {/* Quick Links */}

            {/* Disabled Links */}
            {[
              {
                icon: <CalendarDays className="h-4 w-4" />,
                text: "Check Your Datesheet",
              },
              {
                icon: <ClipboardList className="h-4 w-4" />,
                text: "Notice Board",
              },
              {
                icon: <BookOpen className="h-4 w-4" />,
                text: "Student Handbook",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-400  p-2 rounded-md select-none opacity-80 pointer-events-none"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-gray-700 lg:hidden  text-xs mt-4 border-t pt-2">
              Stay updated and connected —{" "}
              <Link
                href={"/"}
                className="inline-flex items-center text-blue-600 underline px-1"
              >
                visit our website
                <SquareArrowOutDownLeft className="w-3 h-3 ml-1" />
              </Link>
              for the latest news and resources.
            </p>
          </div>
        </div>
      </div>

      {/* Right SVG Section - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-white items-center justify-center p-12 relative">
        {/* SVG Graphic */}
        <div className="w-full max-w-md">
          <div className="mt-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
            <p className="text-gray-100">
              Access your courses and academic resources
            </p>
            <p className="text-gray-700 text-xs mt-4">
              Stay updated and connected —{" "}
              <Link
                href={"/"}
                className="inline-flex items-center text-blue-600 underline px-1"
              >
                visit our website
                <SquareArrowOutDownLeft className="w-3 h-3 ml-1" />
              </Link>
              for the latest news and resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
