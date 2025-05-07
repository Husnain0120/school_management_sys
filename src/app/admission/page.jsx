"use client";

import {
  GraduationCap,
  User,
  Phone,
  Home,
  FileText,
  Camera,
  Upload,
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
import { useRef, useState } from "react";
import Image from "next/image";

export default function AdmissionForm() {
  const [studentPhoto, setStudentPhoto] = useState("");
  const [idProof, setIdProof] = useState("");
  const [birthCertificate, setBirthCertficate] = useState("");

  const router = useRouter();
  const handelX = () => {
    router.push("/");
  };

  const studentPhotoRef = useRef(null);
  const idProofRef = useRef(null);
  const birthCertRef = useRef(null);

  const handelImagePerv = (e, setimage) => {
    const file = e.target.files[0];
    console.log(e.target.files, "cheack");
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setimage("");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 md:py-8">
      <div className="max-w-4xl mx-auto bg-white md:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-indigo-600 to-white text-white px-8 py-6 relative">
          <X
            className="absolute right-8 top-1/4 hover:opacity-50 -translate-y-1/2 h-6 w-6 cursor-pointer text-white"
            onClick={handelX}
          />
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

        <div className="px-8 py-8 space-y-8">
          {/* Personal Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <User className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Inputs */}
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
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input className="border-gray-300 rounded-lg" type="email" />
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

          {/* Address Section */}
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

          {/* Document Upload with useRef added */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Camera className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Document Upload
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Student Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Student Photo <span className="text-red-500">*</span>
                </Label>
                <input
                  type="file"
                  ref={studentPhotoRef}
                  onChange={(e) => handelImagePerv(e, setStudentPhoto)}
                  className="hidden"
                />
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                  onClick={() => studentPhotoRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {studentPhoto ? (
                      <>
                        <img
                          src={studentPhoto}
                          alt="student preview"
                          className="h-[20%] w-[50%] object-contain rounded-md  "
                        />
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500 text-sm">
                          JPEG/PNG, Max 2MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ID Proof */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  ID Proof <span className="text-red-500">*</span>
                </Label>
                <input
                  type="file"
                  ref={idProofRef}
                  onChange={(e) => handelImagePerv(e, setIdProof)}
                  className="hidden"
                />
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                  onClick={() => idProofRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {idProof ? (
                      <>
                        <img
                          src={idProof}
                          alt="idProof"
                          className="h-[20%] w-[50%] object-contain"
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500 text-sm">JPEG/PNG</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Birth Certificate */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Birth Certificate <span className="text-red-500">*</span>
                </Label>
                <input
                  type="file"
                  ref={birthCertRef}
                  onChange={(e) => handelImagePerv(e, setBirthCertficate)}
                  className="hidden"
                />
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                  onClick={() => birthCertRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {birthCertificate ? (
                      <>
                        <img
                          src={birthCertificate}
                          alt="birthCertificate"
                          className="h-[20%] w-[50%] object-contain"
                        />
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500 text-sm">JPEG/PNG</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Section */}
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
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        Class {i + 1}
                      </SelectItem>
                    ))}
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

          {/* Caution Note */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start space-x-2">
              <div className="text-red-600 pt-1 font-bold">NOTE:</div>
              <div className="text-red-700 text-sm">
                <p>1. All fields marked with * are mandatory</p>
                <p>2. Original documents must be submitted for verification</p>
                <p>3. False information may lead to admission cancellation</p>
              </div>
            </div>
          </div>

          {/* Submit */}
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
                className="hover:underline cursor-pointer text-blue-400 font-bold"
              >
                Login with ID
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
