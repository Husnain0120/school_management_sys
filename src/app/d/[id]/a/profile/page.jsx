"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  MapPin,
  School,
  User,
  Smartphone,
  Home,
  Hash,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Static profile data
const profileData = {
  fullName: "Muhammad Husnain Rashid",
  fatherName: "Husnain",
  email: "muhammadhusnainrashid12345.bs@gmail.com",
  gender: "male",
  dateOfBirth: "2002-04-05",
  currentAddress: "District Rawalpindi City Kahuta Village Sai",
  permanentAddress: "District Rawalpindi City Kahuta Village Sai",
  city: "KAHUTA",
  zipCode: "47330",
  studentPhoto:
    "https://res.cloudinary.com/husnain0120/image/upload/v1746807225/admission/studentPhoto/agajab0vhzgwrkewav15.png",
  idProof:
    "https://res.cloudinary.com/husnain0120/image/upload/v1746807230/admission/idProof/kvpcf5sixakm8ddzqyjg.png",
  birthCertificate:
    "https://res.cloudinary.com/husnain0120/image/upload/v1746807234/admission/birthCertificate/oyhf9b97cavdg8qpxqrw.png",
  admissionClass: 8,
  previousSchool: "",
  role: "admin",
  isVerified: true,
  portalId: "edu259001653",
  createdAt: "2025-05-09",
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Skeleton */}
          <div className="flex flex-col items-center mb-8 text-center">
            <Skeleton className="h-32 w-32 bg-zinc-500 rounded-full mb-4" />
            <Skeleton className="h-8 w-64 mb-2 bg-zinc-500" />
            <Skeleton className="h-4 w-48 bg-zinc-500" />
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Personal Information Card Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-full bg-zinc-500" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-6 w-full bg-zinc-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Address Information Card Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-zinc-500" />
              <div className="space-y-4 p-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-6 w-full bg-zinc-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section Skeleton */}
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-10 w-full bg-zinc-500" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-w-3 bg-zinc-500 aspect-h-4 w-full h-48" />
                    <Skeleton className="h-4 w-24 bg-zinc-500 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Account Information Skeleton */}
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-10 w-full bg-zinc-500" />
              <div className="grid grid-cols-1 bg-zinc-500 md:grid-cols-3 gap-6 p-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-6 w-full bg-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 bg-zinc-500" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-4">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={profileData.studentPhoto} />
              <AvatarFallback>{profileData.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            {profileData.isVerified && (
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                Verified
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {profileData.fullName}
          </h1>
          <div className="flex items-center mt-2 text-gray-600">
            <span className="flex items-center">
              <School className="h-4 w-4 mr-1" />
              {profileData.role.charAt(0).toUpperCase() +
                profileData.role.slice(1)}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Hash className="h-4 w-4 mr-1" />
              {profileData.portalId}
            </span>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Personal Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1 text-sm">{profileData.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Father's Name
                    </h3>
                    <p className="mt-1 text-sm">{profileData.fatherName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Gender
                    </h3>
                    <p className="mt-1 text-sm capitalize">
                      {profileData.gender}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </h3>
                    <p className="mt-1 text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(profileData.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {profileData.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Admission Class
                    </h3>
                    <p className="mt-1 text-sm">
                      Class {profileData.admissionClass}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Current Address
                  </h3>
                  <p className="mt-1 text-sm flex items-start gap-2">
                    <Home className="h-4 w-4 text-gray-400 mt-0.5" />
                    {profileData.currentAddress}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Permanent Address
                  </h3>
                  <p className="mt-1 text-sm flex items-start gap-2">
                    <Home className="h-4 w-4 text-gray-400 mt-0.5" />
                    {profileData.permanentAddress}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">City</h3>
                    <p className="mt-1 text-sm">{profileData.city}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Zip Code
                    </h3>
                    <p className="mt-1 text-sm">{profileData.zipCode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 mb-3">
                    <img
                      src={profileData.studentPhoto}
                      alt="Student Photo"
                      className="object-cover rounded-lg w-full h-48"
                    />
                  </div>
                  <h3 className="font-medium text-center">Student Photo</h3>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 mb-3">
                    <img
                      src={profileData.idProof}
                      alt="ID Proof"
                      className="object-cover rounded-lg w-full h-48"
                    />
                  </div>
                  <h3 className="font-medium text-center">ID Proof</h3>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 mb-3">
                    <img
                      src={profileData.birthCertificate}
                      alt="Birth Certificate"
                      className="object-cover rounded-lg w-full h-48"
                    />
                  </div>
                  <h3 className="font-medium text-center">Birth Certificate</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Account Created
                  </h3>
                  <p className="mt-1 text-sm">
                    {new Date(profileData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Account Status
                  </h3>
                  <div className="mt-1">
                    <Badge
                      variant={profileData.isVerified ? "default" : "secondary"}
                    >
                      {profileData.isVerified ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    User Role
                  </h3>
                  <div className="mt-1">
                    <Badge variant="outline" className="capitalize">
                      {profileData.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="px-6">
            Edit Profile
          </Button>
          <Button variant="outline" className="px-6">
            Download Documents
          </Button>
          <Button className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Print Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
