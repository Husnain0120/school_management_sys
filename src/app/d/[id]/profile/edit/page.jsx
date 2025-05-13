"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  MapPin,
  Home,
  Building,
  User,
  CheckCircle,
  Calendar,
  Shield,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import AdminVerifiedBadge from "@/components/verify-badge.jsx/Admin-verified-badge";

const ProfileEditPage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/user-profile`);
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

            <div className="h-px bg-zinc-200 my-2" />

            {/* Address Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <Skeleton className="h-9 w-9 rounded-full bg-zinc-500 mr-3" />
                <Skeleton className="h-5 w-40 bg-zinc-500" />
              </div>

              {/* Permanent Address */}
              <div className="space-y-4 pl-12 bg-zinc-50 p-6 rounded-xl">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 bg-zinc-500 mr-2" />
                  <Skeleton className="h-4 w-36 bg-zinc-500" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 bg-zinc-500" />
                    <Skeleton className="h-20 w-full bg-zinc-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div className="space-y-2" key={i}>
                        <Skeleton className="h-4 w-16 bg-zinc-500" />
                        <Skeleton className="h-10 w-full bg-zinc-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Address */}
              <div className="space-y-4 pl-12 bg-zinc-50 p-6 rounded-xl">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 bg-zinc-500 mr-2" />
                  <Skeleton className="h-4 w-32 bg-zinc-500" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 bg-zinc-500" />
                  <Skeleton className="h-20 w-full bg-zinc-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 pb-6 px-6 bg-zinc-50">
            <Skeleton className="h-10 w-24 bg-zinc-500" />
            <Skeleton className="h-10 w-32 bg-zinc-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActualProfileEditPage = ({ userData }) => {
  // Format date if needed
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                  className="hover:opacity-90 transition-opacity object-cover "
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
                <AdminVerifiedBadge size={23} className="mt-2" />
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
                  value="••••••••"
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
                />
              </div>
            </div>
          </div>

          <Separator className="my-2 hover:bg-indigo-300 transition-colors" />

          {/* Address Information */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-full mr-3 hover:bg-indigo-200 transition-colors cursor-pointer">
                <MapPin className="h-5 w-5 text-indigo-600 hover:text-indigo-700 transition-colors" />
              </div>
              <h3 className="text-lg font-medium hover:text-indigo-700 transition-colors cursor-pointer">
                Address Information
              </h3>
            </div>

            {/* Permanent Address */}
            <div className="space-y-4 pl-12 bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <Home className="h-4 w-4 text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer mr-2" />
                <h4 className="font-medium hover:text-indigo-700 transition-colors cursor-pointer">
                  Permanent Address
                </h4>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="permanentAddress"
                    className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    Address
                  </Label>
                  <Textarea
                    id="permanentAddress"
                    placeholder="Enter your permanent address"
                    className="resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                    rows={3}
                    defaultValue={userData?.permanentAddress || ""}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                      defaultValue={userData?.city || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="gender"
                      className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      Gender
                    </Label>
                    <Select defaultValue={userData?.gender || ""}>
                      <SelectTrigger
                        id="gender"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem
                          value="male"
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          Male
                        </SelectItem>
                        <SelectItem
                          value="female"
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="zipCode"
                      className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      Zip Code
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="Enter your zip code"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                      defaultValue={userData?.zipCode || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Current Address */}
            <div className="space-y-4 pl-12 bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <Building className="h-4 w-4 text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer mr-2" />
                <h4 className="font-medium hover:text-indigo-700 transition-colors cursor-pointer">
                  Current Address
                </h4>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="currentAddress"
                  className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Address
                </Label>
                <Textarea
                  id="currentAddress"
                  placeholder="Enter your current address"
                  className="resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-400 transition-colors cursor-pointer"
                  rows={3}
                  defaultValue={userData?.currentAddress || ""}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pt-2 pb-6 px-6 bg-gray-50">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors cursor-pointer"
          >
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all cursor-pointer hover:shadow-lg">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileEditPage;
