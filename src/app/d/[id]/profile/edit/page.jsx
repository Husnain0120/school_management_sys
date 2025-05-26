"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  CheckCircle,
  Calendar,
  Shield,
  BookOpen,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import AdminVerifiedBadge from "@/components/verify-badge/Admin-verified-badge";
import TeacherVerifiedBadge from "@/components/verify-badge/Teacher-verified-badge";

const ProfileEditPage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/user-profile");
        if (res?.data?.data) {
          setUserData(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !userData) {
    return <SkeletonLoading />;
  }

  return <ActualProfileEditPage userData={userData} />;
};

const SkeletonLoading = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Header Skeleton */}
      <div className="mb-8 bg-zinc-100 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Skeleton className="h-24 w-24 rounded-full bg-zinc-500" />
            </div>
            <div className="text-center md:text-left space-y-3 flex-1">
              <Skeleton className="h-8 w-64 bg-zinc-500 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-48 bg-zinc-500 mx-auto md:mx-0" />
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Skeleton className="h-6 w-20 bg-zinc-500" />
                <Skeleton className="h-6 w-16 bg-zinc-500" />
                <Skeleton className="h-6 w-24 bg-zinc-500" />
              </div>
            </div>
            <div className="md:ml-auto">
              <Skeleton className="h-16 w-32 bg-zinc-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Skeleton */}
      <div className="shadow-2xl border-0 overflow-hidden">
        <div className="bg-zinc-500 h-2" />
        <div className="p-6">
          <div className="pb-4">
            <Skeleton className="h-6 w-48 bg-zinc-500" />
            <Skeleton className="h-4 w-64 bg-zinc-500 mt-2" />
          </div>

          <div className="space-y-8">
            {/* Security Section */}
            <div className="space-y-4 bg-zinc-50 p-6 rounded-xl">
              <div className="flex items-center">
                <Skeleton className="h-9 w-9 rounded-full bg-zinc-500 mr-3" />
                <Skeleton className="h-5 w-32 bg-zinc-500" />
              </div>
              <div className="space-y-4 pl-12">
                {[...Array(3)].map((_, i) => (
                  <div className="space-y-2" key={i}>
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-10 w-full max-w-md bg-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActualProfileEditPage = ({ userData }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Format date if needed
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle password updating
  const handleUpdatingPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        setMessage({
          text: "New password and confirm password don't match",
          type: "error",
        });
        return;
      }

      const res = await axios.put("/api/auth/new-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        setMessage({ text: "Password updated successfully!", type: "success" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({
          text: res.data.message || "Failed to update password",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Password update error:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to update password",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Header with user info */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-white/10 backdrop-blur-sm p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <AvatarImage
                  src={userData?.studentPhoto || "/placeholder.svg"}
                  alt={userData?.fullName || "User"}
                  className="hover:opacity-90 transition-opacity object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl">
                  {userData?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 right-0 bg-green-500 border-2 border-white cursor-pointer hover:bg-green-600 transition-colors">
                <CheckCircle className="h-3 w-3 mr-1" /> Verified
              </Badge>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                {userData?.fullName}
                {userData.role === "admin" ? (
                  <AdminVerifiedBadge size={23} className="mt-2" />
                ) : (
                  userData.role === "teacher" && (
                    <TeacherVerifiedBadge size={25} className="mt-2" />
                  )
                )}
              </h1>
              <p className="text-white/80 hover:text-white transition-colors cursor-pointer">
                {userData?.email || "N/A"}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                {userData?.role === "admin" || userData?.role === "teacher" ? (
                  <></>
                ) : (
                  <>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
                    >
                      <BookOpen className="h-3 w-3 mr-1" /> Class:{" "}
                      {userData?.admissionClass || "N/A"}
                    </Badge>
                  </>
                )}
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <Shield className="h-3 w-3 mr-1" /> {userData?.role || "N/A"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <Calendar className="h-3 w-3 mr-1" /> Since{" "}
                  {formatDate(userData?.createdAt)}
                </Badge>
              </div>
            </div>
            <div className="md:ml-auto flex items-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-colors cursor-pointer">
                <p className="text-sm font-medium">
                  {userData?.role === "student" ? "Student ID" : "User ID"}
                </p>
                <p className="text-lg font-bold">
                  {userData?.portalId || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-2" />
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl">
            <User className="mr-2 h-5 w-5 text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer" />
            <span className="hover:text-indigo-700 transition-colors cursor-pointer">
              Profile Settings
            </span>
          </CardTitle>
          <CardDescription className="hover:text-gray-600 transition-colors cursor-pointer">
            Update your account information and preferences
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Password Section */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-full mr-3 hover:bg-indigo-200 transition-colors cursor-pointer">
                <Lock className="h-5 w-5 text-indigo-600 hover:text-indigo-700 transition-colors" />
              </div>
              <h3 className="text-lg font-medium hover:text-indigo-700 transition-colors cursor-pointer">
                Security Settings
              </h3>
            </div>
            <div className="space-y-4 pl-12">
              {message.text && (
                <div
                  className={`p-3 rounded-md ${
                    message.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                  className="max-w-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                >
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  className="max-w-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  className="max-w-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleUpdatingPassword} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEditPage;
