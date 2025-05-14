"use client";
import { BadgeCheck, XCircle } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function ApplicantPage() {
  // handle get details.
  const { aid } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // handel verifiy applicant...>>>
  // Replace your current handleVerifiyApplicant function with this:
  const handleVerifiyApplicant = async () => {
    try {
      const verfiyApplicant = await axios.put(
        `/api/admin/admission-applications/admission-details/${aid}/verfiy-applicant`
      );

      // Refetch the applicant data to show updated verification status
      const res = await axios.get(
        `/api/admin/admission-applications/admission-details/${aid}`
      );

      if (res?.data?.details) {
        setApplicantData(res?.data?.details);
      }

      toast.success(verfiyApplicant?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/admin/admission-applications/admission-details/${aid}`
        );

        if (res?.data?.details) {
          setApplicantData(res?.data?.details);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to load applicant data");
      } finally {
        setIsLoading(false);
      }
    };

    // Call the fetchDetails function
    fetchDetails();
  }, []);

  // Format MongoDB date object
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  // Show loading skeleton
  if (isLoading || !applicantData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2 bg-zinc-500" />
              <Skeleton className="h-4 w-48 bg-zinc-500" />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Skeleton className="h-10 w-32 bg-zinc-500" />
            </div>
          </div>

          {/* Profile Card Skeleton */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-muted/5 border-b">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-zinc-500" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-8 w-64 bg-zinc-500" />
                  <Skeleton className="h-4 w-32 bg-zinc-500" />
                  {/* Added verification switch skeleton */}
                  <div className="flex items-center gap-2 mt-2">
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-4 w-9 rounded-full bg-zinc-500" />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              {/* Personal Information Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-48 bg-zinc-500" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full bg-zinc-500" />
                  ))}
                </div>
              </div>

              {/* Academic Information Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-48 bg-zinc-500" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full bg-zinc-500" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-zinc-500" />
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-full bg-zinc-500" />
              ))}
              {[1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="h-24 w-full md:col-span-2 bg-zinc-500"
                />
              ))}
            </CardContent>
          </Card>

          {/* Documents Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-zinc-500" />
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-6 w-32 bg-zinc-500" />
                  <Skeleton className="h-64 w-full rounded-lg bg-zinc-500" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Applicant Profile
            </h1>
            <p className="text-muted-foreground">
              Student information and documents
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  applicantData.isVerified
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {applicantData.isVerified ? (
                  <>
                    <BadgeCheck className="h-4 w-4 mr-1" />
                    Verified
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-1" />
                    Pending
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          {/* Profile Card */}
          <Card className="overflow-hidden">
            <CardHeader className=" border-b">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative group">
                  <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img
                      src={applicantData.studentPhoto || "/placeholder.svg"}
                      alt="Student"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <Input
                      value={applicantData.fullName}
                      className="text-2xl font-bold p-0 border-none shadow-none focus-visible:ring-0 w-auto min-w-[200px] max-w-full"
                    />
                    <div
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        applicantData.isVerified
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {applicantData.isVerified ? (
                        <>
                          <BadgeCheck className="h-4 w-4 mr-1" />
                          Verified
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Pending
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                      <span>Portal ID:</span>
                      <span className="font-medium">
                        {applicantData.portalId}
                      </span>
                    </div>
                  </div>

                  {/* Properly aligned verification switch */}
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="course-status">
                      {applicantData?.isVerified ? "Verified" : "unVerified"}
                    </Label>
                    <Switch
                      id="course-status"
                      checked={applicantData?.isVerified}
                      onCheckedChange={handleVerifiyApplicant}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label>Father's Name</Label>
                    <Input
                      className={"focus-visible:ring-0"}
                      value={applicantData.fatherName}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      className={"focus-visible:ring-0"}
                      value={applicantData.email}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Gender</Label>
                      <Select value={applicantData.gender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className={"bg-white"}>
                          <SelectItem
                            className={" hover:bg-zinc-100 cursor-pointer"}
                            value="male"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            className={" hover:bg-zinc-100 cursor-pointer"}
                            value="female"
                          >
                            Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        className={"focus-visible:ring-0"}
                        value={formatDate(applicantData.dateOfBirth)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Academic Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label>Admission Class</Label>
                    <Input
                      className={"focus-visible:ring-0"}
                      type="number"
                      value={applicantData.admissionClass}
                    />
                  </div>
                  <div>
                    <Label>Previous School</Label>
                    <Input
                      className={"focus-visible:ring-0"}
                      value={applicantData.previousSchool || "N/A"}
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select value={applicantData.role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className={"bg-white"}>
                        <SelectItem
                          className={"hover:bg-zinc-100 cursor-pointer"}
                          value="admin"
                        >
                          Admin
                        </SelectItem>
                        <SelectItem
                          className={"hover:bg-zinc-100 cursor-pointer"}
                          value="student"
                        >
                          Student
                        </SelectItem>
                        <SelectItem
                          className={"hover:bg-zinc-100 cursor-pointer"}
                          value="teacher"
                        >
                          Teacher
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Card */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>City</Label>
                <Input
                  className={"focus-visible:ring-0"}
                  value={applicantData.city}
                />
              </div>
              <div>
                <Label>Zip Code</Label>
                <Input
                  className={"focus-visible:ring-0"}
                  value={applicantData.zipCode}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Current Address</Label>
                <Textarea
                  value={applicantData.currentAddress}
                  className="min-h-[100px] focus-visible:ring-0"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Permanent Address</Label>
                <Textarea
                  value={applicantData.permanentAddress}
                  className="min-h-[100px] focus-visible:ring-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents Card */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base">ID Proof</Label>
                </div>
                <div className="border rounded-lg overflow-hidden bg-muted/50">
                  <img
                    src={applicantData.idProof || "/placeholder.svg"}
                    alt="ID Proof"
                    className="w-full h-auto object-contain max-h-64"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Birth Certificate</Label>
                </div>
                <div className="border rounded-lg overflow-hidden bg-muted/50">
                  <img
                    src={
                      applicantData.birthCertificate ||
                      "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?uid=R198933952&ga=GA1.1.1466808988.1746481079&semt=ais_hybrid&w=740"
                    }
                    alt="Birth Certificate"
                    className="w-full h-auto object-contain max-h-64"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
