"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  ArrowRight,
  UserPlus2,
  SquareArrowOutDownLeft,
  File,
  EyeIcon as EyeClosed,
  EyeIcon,
  PhoneCall,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    portalId: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [seePassword, setSeePassword] = useState(true);

  // Check if we're in the process of authentication or redirection
  const isLoading = isSubmitting || isRedirecting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Login and get the token in the cookie
      const res = await axios.post(`/api/auth/login`, credentials);

      if (res.status === 200) {
        toast.success("Login successful", {
          description: res.data.message,
        });

        // Set redirecting state to true before fetching profile
        setIsRedirecting(true);

        // Step 2: Fetch user profile to get role and id
        const profileRes = await axios.get("/api/auth/user-profile");

        const { role, _id } = profileRes.data?.data || {};

        // Step 3: Redirect user based on role
        if (role === "admin") {
          router.push(`/d/${_id}/a/home`);
        } else if (role === "teacher") {
          router.push(`/d/${_id}/t/subjects`);
        } else if (role === "student") {
          router.push(`/d/${_id}/s/home`);
        } else {
          toast.error("Unauthorized user role");
          setIsRedirecting(false);
        }
      }
    } catch (error) {
      console.log("Login failed:", error);
      const backendMessage = error?.response?.data?.message;
      toast.error("Login failed", {
        description:
          backendMessage || "Something went wrong. Please try again later.",
      });
      setIsSubmitting(false);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Overlay when loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-700 font-medium">
              {isRedirecting
                ? "Redirecting to your dashboard..."
                : "Authenticating..."}
            </p>
          </div>
        </div>
      )}

      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md rounded-xl p-8 sm:p-10 transition-all duration-200 ">
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
                Portal ID
              </Label>
              <Input
                name="portalId"
                value={credentials.portalId.toLocaleLowerCase()}
                onChange={handleChange}
                className="w-full border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter Portal ID"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link
                  href="/pages/forgot-password"
                  className={`text-xs text-indigo-600 hover:text-indigo-500 hover:underline ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                  }`}
                  tabIndex={isLoading ? -1 : 0}
                  aria-disabled={isLoading}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={seePassword ? "password" : "text"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setSeePassword((prev) => !prev)}
                  className={`absolute right-3 top-3 text-gray-500 hover:text-gray-700 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {seePassword ? (
                    <EyeClosed size={17} />
                  ) : (
                    <EyeIcon size={17} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isRedirecting ? "Redirecting..." : "Signing in..."}
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Links */}
          <div className="mt-6 space-y-2">
            <Link
              className={`flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded-md transition-colors ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              href={"/pages/admission"}
              tabIndex={isLoading ? -1 : 0}
              aria-disabled={isLoading}
            >
              <UserPlus2 className="h-4 w-4 text-red-600" />
              <span className="animate-pulse text-md text-red-600">
                admission open
              </span>
            </Link>
            <div
              className={`flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded-md transition-colors ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              <File className="h-4 w-4 text-indigo-600" />
              <span className="text-md text-indigo-600">
                New Registered Students{" "}
                <span className="bg-red-500 p-1 rounded-full text-[10px] text-white">
                  1.5k
                </span>
              </span>
            </div>

            {/* Disabled Links - static structure */}
            {/* Optional: replace {...map()} with static items if needed */}
            <Link
              className={`flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded-md transition-colors ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              href={"/pages/contact"}
              tabIndex={isLoading ? -1 : 0}
              aria-disabled={isLoading}
            >
              <PhoneCall className="h-4 w-4 text-zinc-600" />
              <span className="text-md text-zinc-600 hover:underline cursor-pointer">
                Contact support
              </span>
            </Link>
          </div>

          <div>
            <p className="text-gray-700 lg:hidden text-xs mt-4 border-t pt-2">
              Stay updated and connected —{" "}
              <Link
                href={"/"}
                className={`inline-flex items-center text-blue-600 underline px-1 ${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
                tabIndex={isLoading ? -1 : 0}
                aria-disabled={isLoading}
              >
                visit our website
                <SquareArrowOutDownLeft className="w-3 h-3 ml-1" />
              </Link>
              for the latest news and resources.
            </p>
          </div>
        </div>
      </div>

      {/* Right SVG Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-white items-center justify-center p-12 relative">
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
                className={`inline-flex items-center text-blue-600 underline px-1 ${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
                tabIndex={isLoading ? -1 : 0}
                aria-disabled={isLoading}
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
