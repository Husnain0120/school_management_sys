"use client";

import {
  GraduationCap,
  User,
  Phone,
  Home,
  FileText,
  Camera,
  Upload,
  Cross,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdmissionForm() {
  const router = useRouter();
  const handelX = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 md:py-8">
      <div className="max-w-4xl mx-auto bg-white md:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-indigo-600 to-white text-white px-8 py-6 relative">
          {/* Close icon positioned absolutely on the right */}
          <X
            className="absolute right-8 top-1/4 hover:opacity-50 -translate-y-1/2 h-6 w-6 cursor-pointer text-white  "
            onClick={handelX}
          />

          {/* Centered logo and text */}
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">EDU MANAGE</h1>
              <p className="text-zinc-500 mt-1">
                School Management System (Class 1-10)
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <User className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Student's Full Name <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Father's Name <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>
              {/* //email */}
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" type={"email"} />
              </div>
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="border-gray-300 bg-white rounded-lg">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input type="date" className="border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Home className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Address Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Current Address <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Permanent Address <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Zip Code <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Camera className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Document Upload
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Student Photo <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500 text-sm">JPEG/PNG, Max 2MB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  ID Proof <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500 text-sm">PDF/JPEG/PNG</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Birth Certificate <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500 text-sm">PDF/JPEG/PNG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <FileText className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Academic Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Admission Class <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="border-gray-300 bg-white rounded-lg">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                    <SelectItem value="3">Class 3</SelectItem>
                    <SelectItem value="4">Class 4</SelectItem>
                    <SelectItem value="5">Class 5</SelectItem>
                    <SelectItem value="6">Class 6</SelectItem>
                    <SelectItem value="7">Class 7</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Previous School Name
                </Label>
                <Input className="border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Caution Section */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start space-x-2">
              <div className="text-red-600 pt-1">
                <span className="font-bold">NOTE:</span>
              </div>
              <div className="text-red-700 text-sm">
                <p>1. All fields marked with * are mandatory</p>
                <p>2. Original documents must be submitted for verification</p>
                <p>3. False information may lead to admission cancellation</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg rounded-lg shadow-md transition-colors">
              Submit Admission Form
            </Button>
          </div>
          <div>
            <p className=" text-sm font-extralight text-center text-zinc-500">
              if already Registered{" "}
              <Link
                href={"/login"}
                className="hover:underline  cursor-pointer text-blue-400 font-bold"
              >
                Login with ID
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
