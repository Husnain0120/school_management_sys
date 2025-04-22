"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  ArrowLeft,
  User,
  Phone,
  FileText,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function AdmissionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Custom hook for form validation
  const useFormValidation = (initialState) => {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validateField = (name, value) => {
      let error = "";

      if (!value) {
        error = "This field is required";
      } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Please enter a valid email";
      } else if (name === "phoneNumber" && !/^\d{10}$/.test(value)) {
        error = "Please enter a valid 10-digit phone number";
      }

      return error;
    };

    const validateForm = (data) => {
      const newErrors = {};
      let valid = true;

      Object.keys(data).forEach((key) => {
        const error = validateField(key, data[key]);
        if (error) {
          newErrors[key] = error;
          valid = false;
        }
      });

      setErrors(newErrors);
      setIsValid(valid);
      return valid;
    };

    return { errors, isValid, validateField, validateForm };
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    idCardNumber: "",
    birthCertificateNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    guardianEmail: "",
    previousSchool: "",
    previousGrade: "",
    applyingForGrade: "",
  });

  const { errors, validateForm } = useFormValidation(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      alert(
        "Application submitted successfully! You will be contacted for further steps including document submission."
      );
      router.push("/");
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">EduManage</h1>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-gray-700 hover:text-indigo-600"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Card className="mx-auto max-w-4xl border border-gray-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Student Admission Application
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please fill out all the required information to apply for
              admission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={`step-${step}`} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="step-1"
                  disabled={step !== 1}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 rounded-md py-2"
                >
                  <User className="mr-2 h-4 w-4" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="step-2"
                  disabled={step !== 2}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 rounded-md py-2"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Details
                </TabsTrigger>
                <TabsTrigger
                  value="step-3"
                  disabled={step !== 3}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 rounded-md py-2"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1" className="mt-6">
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-gray-700">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-gray-700">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                      >
                        <SelectTrigger
                          id="gender"
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                          <SelectItem
                            value="male"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            value="female"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Female
                          </SelectItem>
                          <SelectItem
                            value="other"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="idCardNumber" className="text-gray-700">
                        ID Card Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="idCardNumber"
                        name="idCardNumber"
                        value={formData.idCardNumber}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="birthCertificateNumber"
                        className="text-gray-700"
                      >
                        Birth Certificate Number{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="birthCertificateNumber"
                        name="birthCertificateNumber"
                        value={formData.birthCertificateNumber}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="previousSchool" className="text-gray-700">
                        Previous School (if any)
                      </Label>
                      <Input
                        id="previousSchool"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="previousGrade" className="text-gray-700">
                        Previous Grade (if any)
                      </Label>
                      <Input
                        id="previousGrade"
                        name="previousGrade"
                        value={formData.previousGrade}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applyingForGrade" className="text-gray-700">
                      Applying for Grade <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.applyingForGrade}
                      onValueChange={(value) =>
                        handleSelectChange("applyingForGrade", value)
                      }
                    >
                      <SelectTrigger
                        id="applyingForGrade"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (grade) => (
                            <SelectItem
                              key={grade}
                              value={grade.toString()}
                              className="hover:bg-gray-100 focus:bg-gray-100"
                            >
                              Grade {grade}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="step-2" className="mt-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-700">
                        State/Province <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-gray-700">
                        Zip/Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-medium text-gray-900">
                    Guardian Information
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName" className="text-gray-700">
                        Guardian Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="guardianName"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="guardianRelation"
                        className="text-gray-700"
                      >
                        Relation to Student{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.guardianRelation}
                        onValueChange={(value) =>
                          handleSelectChange("guardianRelation", value)
                        }
                      >
                        <SelectTrigger
                          id="guardianRelation"
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                          <SelectItem
                            value="father"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Father
                          </SelectItem>
                          <SelectItem
                            value="mother"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Mother
                          </SelectItem>
                          <SelectItem
                            value="guardian"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Legal Guardian
                          </SelectItem>
                          <SelectItem
                            value="other"
                            className="hover:bg-gray-100 focus:bg-gray-100"
                          >
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone" className="text-gray-700">
                        Guardian Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="guardianPhone"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianEmail" className="text-gray-700">
                        Guardian Email
                      </Label>
                      <Input
                        id="guardianEmail"
                        name="guardianEmail"
                        type="email"
                        value={formData.guardianEmail}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="step-3" className="mt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Required Documents
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please upload the following documents in JPG, PNG, or PDF
                      format. Each file should not exceed 5MB.
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="idCardImage" className="text-gray-700">
                          ID Card Image <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="idCardImage"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="birthCertificateImage"
                          className="text-gray-700"
                        >
                          Birth Certificate Image{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="birthCertificateImage"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentPhoto" className="text-gray-700">
                          Student Photo <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="studentPhoto"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Please upload a recent passport-sized photo with a
                          plain background.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="previousSchoolRecords"
                          className="text-gray-700"
                        >
                          Previous School Records (if applicable)
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="previousSchoolRecords"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-indigo-50 p-4 border-indigo-100">
                    <h4 className="mb-2 font-medium text-indigo-800">
                      Important Note
                    </h4>
                    <p className="text-sm text-indigo-700">
                      By submitting this application, you confirm that all
                      information provided is accurate and complete. The school
                      administration will review your application and contact
                      you for further steps. Incomplete applications may delay
                      the admission process.
                    </p>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex-col space-y-2 text-center text-sm text-gray-600">
            <p>
              Need help with your application? Contact our admission office at{" "}
              <a
                href="mailto:admissions@edumanage.com"
                className="text-indigo-600 hover:underline"
              >
                admissions@edumanage.com
              </a>{" "}
              or call (123) 456-7890.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
