"use client";

import {
  GraduationCap,
  User,
  Home,
  FileText,
  Camera,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Info,
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
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function AdmissionForm() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    zipCode: "",
    admissionClass: "",
    previousSchool: "",
  });

  const [studentPhoto, setStudentPhoto] = useState("");
  const [idProof, setIdProof] = useState("");
  const [birthCertificate, setBirthCertificate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  // State for classes from API
  const [classes, setClasses] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [apiError, setApiError] = useState(null);

  const router = useRouter();

  // Refs for file inputs
  const studentPhotoRef = useRef(null);
  const idProofRef = useRef(null);
  const birthCertRef = useRef(null);

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoadingClasses(true);
      setApiError(null);
      try {
        const response = await axios.get(
          "/api/admin/classes-mange/create-class"
        );
        if (response.data.classes) {
          setClasses(response.data.classes);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        setApiError(
          "Failed to load class options. Please refresh the page or try again later."
        );
        toast.error("Failed to load class options");
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Check form validity whenever required fields change
  useEffect(() => {
    const requiredFields = [
      formData.fullName,
      formData.fatherName,
      formData.email,
      formData.gender,
      formData.dateOfBirth,
      formData.currentAddress,
      formData.permanentAddress,
      formData.city,
      formData.zipCode,
      formData.admissionClass,
      studentPhoto,
      idProof,
      birthCertificate,
    ];

    setIsFormValid(requiredFields.every((field) => Boolean(field)));
  }, [formData, studentPhoto, idProof, birthCertificate]);

  const handleClose = () => {
    router.push("/");
  };

  const handleImagePreview = (e, setImage, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Please upload a valid image file",
      }));
      toast.error("Please upload a valid image file");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "File size should be less than 10MB",
      }));
      toast.error("File size should be less than 10MB (Cloudinary limit)");
      return;
    }

    // Clear error if previously set
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }

    // Read and set image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's name is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.currentAddress.trim())
      newErrors.currentAddress = "Current address is required";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.admissionClass)
      newErrors.admissionClass = "Admission class is required";

    // Document validation
    if (!studentPhoto) newErrors.studentPhoto = "Student photo is required";
    if (!idProof) newErrors.idProof = "ID proof is required";
    if (!birthCertificate)
      newErrors.birthCertificate = "Birth certificate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      document
        .getElementsByName(firstErrorField)?.[0]
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Convert base64 images to Blob for proper file upload
      if (studentPhoto) {
        const blob = await fetch(studentPhoto).then((r) => r.blob());
        formDataToSend.append("studentPhoto", blob, "student-photo.jpg");
      }

      if (idProof) {
        const blob = await fetch(idProof).then((r) => r.blob());
        formDataToSend.append("idProof", blob, "id-proof.jpg");
      }

      if (birthCertificate) {
        const blob = await fetch(birthCertificate).then((r) => r.blob());
        formDataToSend.append(
          "birthCertificate",
          blob,
          "birth-certificate.jpg"
        );
      }

      const res = await axios.post(`/api/admission`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success(
          res.data.message || "Admission form submitted successfully!"
        );
        router.push("/pages/succes");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle specific error cases
      if (
        error.response?.status === 400 &&
        error.response.data?.message?.includes("Email already registered")
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "Email already registered. Please use another email.",
        }));
        document
          .getElementsByName("email")[0]
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (error.response?.data?.message?.includes("File size")) {
        toast.error(
          "File size exceeds the maximum limit of 10MB. Please upload smaller files."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to submit form. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 md:py-8">
      <div className="max-w-4xl mx-auto bg-white md:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-8 py-6 relative">
          <button
            onClick={handleClose}
            className="absolute right-8 top-6 hover:bg-white/20 p-1 rounded-full transition-all duration-200"
            aria-label="Close form"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">EDU MANAGE</h1>
              <p className="text-indigo-100 mt-1">
                School Admission Application
              </p>
            </div>
          </div>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="px-8 pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="px-8 py-8 space-y-8">
          {/* Personal Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <User className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className={`text-gray-700 font-medium ${
                    errors.fullName ? "text-red-500" : ""
                  }`}
                >
                  Student's Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  className={`border-gray-300 rounded-lg ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Father's Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="fatherName"
                  className={`text-gray-700 font-medium ${
                    errors.fatherName ? "text-red-500" : ""
                  }`}
                >
                  Father's Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  className={`border-gray-300 rounded-lg ${
                    errors.fatherName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.fatherName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`text-gray-700 font-medium ${
                    errors.email ? "text-red-500" : ""
                  }`}
                >
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className={`border-gray-300 rounded-lg ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label
                  className={`text-gray-700 font-medium ${
                    errors.gender ? "text-red-500" : ""
                  }`}
                >
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="gender"
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  value={formData.gender}
                >
                  <SelectTrigger
                    className={`border-gray-300 bg-white rounded-lg ${
                      errors.gender ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem
                      className="hover:bg-indigo-50 cursor-pointer transition-all"
                      value="male"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-indigo-50 cursor-pointer transition-all"
                      value="female"
                    >
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.gender}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirth"
                  className={`text-gray-700 font-medium ${
                    errors.dateOfBirth ? "text-red-500" : ""
                  }`}
                >
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className={`border-gray-300 rounded-lg ${
                    errors.dateOfBirth
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.dateOfBirth}
                  </p>
                )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="currentAddress"
                  className={`text-gray-700 font-medium ${
                    errors.currentAddress ? "text-red-500" : ""
                  }`}
                >
                  Current Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="currentAddress"
                  name="currentAddress"
                  className={`border-gray-300 rounded-lg ${
                    errors.currentAddress
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                />
                {errors.currentAddress && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.currentAddress}
                  </p>
                )}
              </div>

              {/* Permanent Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="permanentAddress"
                  className={`text-gray-700 font-medium ${
                    errors.permanentAddress ? "text-red-500" : ""
                  }`}
                >
                  Permanent Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="permanentAddress"
                  name="permanentAddress"
                  className={`border-gray-300 rounded-lg ${
                    errors.permanentAddress
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                />
                {errors.permanentAddress && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.permanentAddress}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className={`text-gray-700 font-medium ${
                    errors.city ? "text-red-500" : ""
                  }`}
                >
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  className={`border-gray-300 rounded-lg ${
                    errors.city
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>

              {/* Zip Code */}
              <div className="space-y-2">
                <Label
                  htmlFor="zipCode"
                  className={`text-gray-700 font-medium ${
                    errors.zipCode ? "text-red-500" : ""
                  }`}
                >
                  Zip Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  className={`border-gray-300 rounded-lg ${
                    errors.zipCode
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.zipCode}
                  </p>
                )}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Student Photo */}
              <div className="space-y-2">
                <Label
                  className={`text-gray-700 font-medium ${
                    errors.studentPhoto ? "text-red-500" : ""
                  }`}
                >
                  Student Photo <span className="text-red-500">*</span>
                </Label>
                <input
                  type="file"
                  ref={studentPhotoRef}
                  onChange={(e) =>
                    handleImagePreview(e, setStudentPhoto, "studentPhoto")
                  }
                  className="hidden"
                  accept="image/*"
                />
                <div
                  className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.studentPhoto
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => studentPhotoRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {studentPhoto ? (
                      <div className="relative w-full">
                        <img
                          src={studentPhoto || "/placeholder.svg"}
                          alt="student preview"
                          className="h-40 w-40 object-cover rounded-full mx-auto border-4 border-indigo-100 shadow-md"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-indigo-50 p-3 rounded-full">
                          <Upload className="h-8 w-8 text-indigo-500" />
                        </div>
                        <p className="text-gray-500 text-sm">
                          Click to upload photo (JPEG/PNG, Max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {errors.studentPhoto && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.studentPhoto}
                  </p>
                )}
              </div>

              {/* ID Proof */}
              <div className="space-y-2">
                <Label
                  className={`text-gray-700 font-medium ${
                    errors.idProof ? "text-red-500" : ""
                  }`}
                >
                  ID Proof <span className="text-red-500">*</span>
                </Label>
                <input
                  type="file"
                  ref={idProofRef}
                  onChange={(e) => handleImagePreview(e, setIdProof, "idProof")}
                  className="hidden"
                  accept="image/*"
                />
                <div
                  className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.idProof
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => idProofRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {idProof ? (
                      <div className="relative w-full">
                        <img
                          src={idProof || "/placeholder.svg"}
                          alt="ID Proof"
                          className="h-40 w-full object-contain rounded-md border border-indigo-100 shadow-sm"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-indigo-50 p-3 rounded-full">
                          <Upload className="h-8 w-8 text-indigo-500" />
                        </div>
                        <p className="text-gray-500 text-sm">
                          Click to upload ID proof (JPEG/PNG, Max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {errors.idProof && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.idProof}
                  </p>
                )}
              </div>

              {/* Birth Certificate */}
              <div className="space-y-2">
                <Label
                  className={`text-gray-700 font-medium ${
                    errors.birthCertificate ? "text-red-500" : ""
                  }`}
                >
                  Birth Certificate <span className="text-red-500">*</span>
                </Label>
                <input
                  type="file"
                  ref={birthCertRef}
                  onChange={(e) =>
                    handleImagePreview(
                      e,
                      setBirthCertificate,
                      "birthCertificate"
                    )
                  }
                  className="hidden"
                  accept="image/*"
                />
                <div
                  className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.birthCertificate
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => birthCertRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {birthCertificate ? (
                      <div className="relative w-full">
                        <img
                          src={birthCertificate || "/placeholder.svg"}
                          alt="Birth Certificate"
                          className="h-40 w-full object-contain rounded-md border border-indigo-100 shadow-sm"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-indigo-50 p-3 rounded-full">
                          <Upload className="h-8 w-8 text-indigo-500" />
                        </div>
                        <p className="text-gray-500 text-sm">
                          Click to upload birth certificate (JPEG/PNG, Max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {errors.birthCertificate && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.birthCertificate}
                  </p>
                )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Admission Class */}
              <div className="space-y-2">
                <Label
                  className={`text-gray-700 font-medium ${
                    errors.admissionClass ? "text-red-500" : ""
                  }`}
                >
                  Admission Class <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="admissionClass"
                  onValueChange={(value) =>
                    handleSelectChange("admissionClass", value)
                  }
                  value={formData.admissionClass}
                  disabled={isLoadingClasses || apiError}
                >
                  <SelectTrigger
                    className={`border-gray-300 bg-white rounded-lg ${
                      errors.admissionClass ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue
                      placeholder={
                        isLoadingClasses ? "Loading classes..." : "Select Class"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {isLoadingClasses ? (
                      <div className="flex items-center justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Loading classes...</span>
                      </div>
                    ) : classes.length > 0 ? (
                      classes.map((classItem) => (
                        <SelectItem
                          className="hover:bg-indigo-50 cursor-pointer transition-all"
                          key={classItem._id}
                          value={classItem.name}
                        >
                          {classItem.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-500">
                        No classes available
                      </div>
                    )}
                  </SelectContent>
                </Select>
                {errors.admissionClass && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.admissionClass}
                  </p>
                )}
              </div>

              {/* Previous School */}
              <div className="space-y-2">
                <Label
                  htmlFor="previousSchool"
                  className="text-gray-700 font-medium"
                >
                  Previous School Name
                </Label>
                <Input
                  id="previousSchool"
                  name="previousSchool"
                  className="border-gray-300 rounded-lg focus:ring-indigo-500"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  placeholder="Leave blank if not applicable"
                />
              </div>
            </div>
          </div>

          {/* File Size Warning */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-amber-800 text-sm">
                <p className="font-semibold mb-1">IMPORTANT INFORMATION:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All fields marked with * are mandatory</li>
                  <li>Original documents must be submitted for verification</li>
                  <li>False information may lead to admission cancellation</li>
                  <li>Default password will be provided upon approval</li>
                  <li className="font-medium">
                    All uploaded files must be less than 10MB due to Cloudinary
                    limitations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isFormValid && !isSubmitting
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white py-6 text-lg rounded-lg shadow-md transition-all duration-300`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Submitting Application...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  <span>Submit Admission Application</span>
                </div>
              )}
            </Button>
          </div>

          <div>
            <p className="text-sm text-center text-gray-500 border-t border-gray-100 pt-4">
              Already registered?{" "}
              <Link
                href="/pages/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
              >
                Login with your Portal ID
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
