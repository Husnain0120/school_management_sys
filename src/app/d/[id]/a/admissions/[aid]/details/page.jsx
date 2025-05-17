"use client";
import {
  BadgeCheck,
  XCircle,
  ArrowLeft,
  Download,
  Printer,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ApplicantPage() {
  const router = useRouter();
  const { aid } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVerifyApplicant = async () => {
    try {
      setIsDisabled(true);
      const verifyResponse = await axios.put(
        `/api/admin/admission-applications/admission-details/${aid}/verfiy-applicant`
      );
      const res = await axios.get(
        `/api/admin/admission-applications/admission-details/${aid}`
      );
      if (res?.data?.details) {
        setApplicantData(res?.data?.details);
      }
      toast.success(
        verifyResponse?.data?.message ||
          "Verification status updated successfully"
      );
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to update verification status");
    } finally {
      setIsDisabled(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/admin/admission-applications/admission-details/${aid}`
        );
        // console.log(res?.data?.details);
        if (res?.data?.details) {
          setApplicantData(res?.data?.details);
        } else {
          setError("No applicant data found");
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setError("Failed to load applicant data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [aid]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString.$date || dateString);
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  if (isLoading || !applicantData) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6 print:bg-white print:p-0">
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:flex print:justify-between print:items-start print:py-4 print:border-b print:mb-4">
        {/* Square student image for print view */}
        <div className="print:block print:w-24 print:h-24 print:border print:border-gray-200 print:mr-4 print:flex-shrink-0 print:bg-gray-50 print:overflow-hidden">
          <img
            src={applicantData.studentPhoto || "/placeholder.svg"}
            alt={applicantData.fullName || "Student"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold">Applicant Details</h1>
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {applicantData.fullName}
              </p>
              <p>
                <span className="font-medium">Father:</span>{" "}
                {applicantData.fatherName}
              </p>
              <p>
                <span className="font-medium">DOB:</span>{" "}
                {formatDate(applicantData.dateOfBirth)}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Portal ID:</span>{" "}
                {applicantData.portalId}
              </p>
              <p>
                <span className="font-medium">Class:</span>{" "}
                {applicantData.admissionClass}
              </p>
              <p
                className={`${
                  applicantData.isVerified ? "text-green-600" : "text-amber-600"
                }`}
              >
                <span className="font-medium">Status:</span>{" "}
                {applicantData.isVerified ? "Verified" : "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global print styles to hide navigation and sidebar */}
      <style jsx global>{`
        @media print {
          /* Hide all navigation and sidebar elements */
          nav,
          aside,
          .sidebar,
          .navbar,
          header,
          footer {
            display: none !important;
          }

          /* Reset page margins and padding */
          body,
          html,
          #__next {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            font-size: 14px !important;
          }

          /* Remove shadows and decorative elements */
          .shadow-sm,
          .shadow-md,
          .shadow-lg,
          .shadow-xl {
            box-shadow: none !important;
          }

          /* Prevent page breaks inside important sections */
          .print-break-avoid {
            page-break-inside: avoid;
          }

          /* Ensure links are visible in print */
          a {
            color: inherit !important;
            text-decoration: none !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6 print:max-w-full print:space-y-4 print:mx-0 print:mt-4">
        {/* Regular Header - Hidden when printing */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Applicant Profile
              </h1>
              <p className="text-muted-foreground">
                Student information and documents
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Print details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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

        {/* Profile Card */}
        <Card className="overflow-hidden print:shadow-none print:border-0 print-break-avoid">
          <CardHeader className="border-b bg-white print:py-2 print:px-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 print:hidden">
              <div className="relative">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                  <img
                    src={
                      applicantData.studentPhoto ||
                      "/placeholder.svg?height=128&width=128"
                    }
                    alt={applicantData.fullName || "Student"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {applicantData.fullName}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <span>Portal ID:</span>
                    <span className="font-medium">
                      {applicantData.portalId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 h-6">
                  <div className="w-20 text-sm font-medium text-muted-foreground">
                    {applicantData.isVerified ? "Verified:" : "Unverified:"}
                  </div>
                  <Switch
                    id="verification-switch"
                    disabled={isDisabled}
                    checked={applicantData.isVerified || false}
                    onCheckedChange={handleVerifyApplicant}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-2 gap-6 print:grid-cols-2 print:p-0 print:gap-4 print:mt-2">
            <div className="space-y-4 print:space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 print:text-base print:font-medium">
                <span className="h-5 w-1 bg-primary rounded-full print:hidden"></span>
                Personal Information
              </h3>
              <div className="space-y-3 print:space-y-2 print:text-sm">
                <div>
                  <Label className="print:font-medium print:text-black">
                    Father's Name
                  </Label>
                  <Input
                    className="focus-visible:ring-0 bg-gray-50 print:hidden"
                    value={applicantData.fatherName || ""}
                    readOnly
                  />
                  <div className="hidden print:block print:py-1 print:border-b">
                    {applicantData.fatherName || ""}
                  </div>
                </div>
                <div>
                  <Label className="print:font-medium print:text-black">
                    Email
                  </Label>
                  <Input
                    className="focus-visible:ring-0 bg-gray-50 print:hidden"
                    value={applicantData.email || ""}
                    readOnly
                  />
                  <div className="hidden print:block print:py-1 print:border-b">
                    {applicantData.email || ""}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
                  <div>
                    <Label className="print:font-medium print:text-black">
                      Gender
                    </Label>
                    <Input
                      className="focus-visible:ring-0 bg-gray-50 print:hidden"
                      value={applicantData.gender || ""}
                      readOnly
                    />
                    <div className="hidden print:block print:py-1 print:border-b">
                      {applicantData.gender || ""}
                    </div>
                  </div>
                  <div>
                    <Label className="print:font-medium print:text-black">
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      className="focus-visible:ring-0 bg-gray-50 print:hidden"
                      value={formatDate(applicantData.dateOfBirth)}
                      readOnly
                    />
                    <div className="hidden print:block print:py-1 print:border-b">
                      {formatDate(applicantData.dateOfBirth)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 print:space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 print:text-base print:font-medium">
                <span className="h-5 w-1 bg-primary rounded-full print:hidden"></span>
                Academic Information
              </h3>
              <div className="space-y-3 print:space-y-2 print:text-sm">
                <div>
                  <Label className="print:font-medium print:text-black">
                    Admission Class
                  </Label>
                  <Input
                    className="focus-visible:ring-0 bg-gray-50 print:hidden"
                    type="text"
                    value={applicantData.admissionClass || ""}
                    readOnly
                  />
                  <div className="hidden print:block print:py-1 print:border-b">
                    {applicantData.admissionClass || ""}
                  </div>
                </div>
                <div>
                  <Label className="print:font-medium print:text-black">
                    Previous School
                  </Label>
                  <Input
                    className="focus-visible:ring-0 bg-gray-50 print:hidden"
                    value={applicantData.previousSchool || "N/A"}
                    readOnly
                  />
                  <div className="hidden print:block print:py-1 print:border-b">
                    {applicantData.previousSchool || "N/A"}
                  </div>
                </div>
                <div>
                  <Label className="print:font-medium print:text-black">
                    Role
                  </Label>
                  <Input
                    className="focus-visible:ring-0 bg-gray-50 print:hidden"
                    value={applicantData.role || ""}
                    readOnly
                  />
                  <div className="hidden print:block print:py-1 print:border-b">
                    {applicantData.role || ""}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="print:shadow-none print:border-0 print:mt-2 print-break-avoid">
          <CardHeader className="border-b print:py-2 print:px-0 print:border-b">
            <CardTitle className="flex items-center gap-2 print:text-base print:font-medium">
              <span className="h-5 w-1 bg-primary rounded-full print:hidden"></span>
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6 print:grid-cols-2 print:p-0 print:gap-4 print:mt-2">
            <div className="print:text-sm">
              <Label className="print:font-medium print:text-black">City</Label>
              <Input
                className="focus-visible:ring-0 bg-gray-50 print:hidden"
                value={applicantData.city || ""}
                readOnly
              />
              <div className="hidden print:block print:py-1 print:border-b">
                {applicantData.city || ""}
              </div>
            </div>
            <div className="print:text-sm">
              <Label className="print:font-medium print:text-black">
                Zip Code
              </Label>
              <Input
                className="focus-visible:ring-0 bg-gray-50 print:hidden"
                value={applicantData.zipCode || ""}
                readOnly
              />
              <div className="hidden print:block print:py-1 print:border-b">
                {applicantData.zipCode || ""}
              </div>
            </div>
            <div className="md:col-span-2 print:text-sm">
              <Label className="print:font-medium print:text-black">
                Current Address
              </Label>
              <Textarea
                value={applicantData.currentAddress || ""}
                className="min-h-[100px] focus-visible:ring-0 bg-gray-50 print:hidden"
                readOnly
              />
              <div className="hidden print:block print:py-1 print:border-b print:min-h-[50px]">
                {applicantData.currentAddress || ""}
              </div>
            </div>
            <div className="md:col-span-2 print:text-sm">
              <Label className="print:font-medium print:text-black">
                Permanent Address
              </Label>
              <Textarea
                value={applicantData.permanentAddress || ""}
                className="min-h-[100px] focus-visible:ring-0 bg-gray-50 print:hidden"
                readOnly
              />
              <div className="hidden print:block print:py-1 print:border-b print:min-h-[50px]">
                {applicantData.permanentAddress || ""}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Card - Hidden when printing */}
        <Card className="print:hidden">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <span className="h-5 w-1 bg-primary rounded-full"></span>
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base">ID Proof</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() =>
                          window.open(applicantData.idProof, "_blank")
                        }
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="text-xs">View Full</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open document in new tab</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                <img
                  src={
                    applicantData.idProof ||
                    "/placeholder.svg?height=300&width=400"
                  }
                  alt="ID Proof"
                  className="w-full h-auto object-contain max-h-64"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base">Birth Certificate</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() =>
                          window.open(applicantData.birthCertificate, "_blank")
                        }
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="text-xs">View Full</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open document in new tab</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                <img
                  src={
                    applicantData.birthCertificate ||
                    "/placeholder.svg?height=300&width=400"
                  }
                  alt="Birth Certificate"
                  className="w-full h-auto object-contain max-h-64"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t p-4">
            <div className="flex justify-end w-full gap-3">
              <Button variant="outline" onClick={() => router.back()}>
                Back to List
              </Button>
              <Button onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block print:mt-6 print:pt-4 print:border-t print:text-xs print:text-center">
        <p>Printed on: {new Date().toLocaleString()}</p>
        <p className="mt-1">
          Official document - For institutional records only
        </p>
      </div>
    </div>
  );
}

// ... (keep LoadingSkeleton and ErrorState components the same)
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-full bg-zinc-500" />
            <div>
              <Skeleton className="h-8 w-64 mb-2 bg-zinc-500" />
              <Skeleton className="h-4 w-48 bg-zinc-500" />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Skeleton className="h-9 w-9 rounded-full bg-zinc-500" />
            <Skeleton className="h-8 w-24 rounded-full bg-zinc-500" />
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-zinc-500" />
              <div className="space-y-3 flex-1">
                <Skeleton className="h-8 w-64 bg-zinc-500" />
                <Skeleton className="h-4 w-32 bg-zinc-500" />
                <div className="flex items-center gap-3 h-6">
                  <Skeleton className="h-4 w-20 bg-zinc-500" />
                  <Skeleton className="h-5 w-10 rounded-full bg-zinc-500" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-1 rounded-full bg-zinc-500" />
                <Skeleton className="h-6 w-48 bg-zinc-500" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-10 w-full bg-zinc-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-1 rounded-full bg-zinc-500" />
                <Skeleton className="h-6 w-48 bg-zinc-500" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-4 w-24 bg-zinc-500" />
                    <Skeleton className="h-10 w-full bg-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-1 rounded-full bg-zinc-500" />
              <Skeleton className="h-6 w-48 bg-zinc-500" />
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-24 bg-zinc-500" />
                <Skeleton className="h-10 w-full bg-zinc-500" />
              </div>
            ))}
            {[1, 2].map((i) => (
              <div key={i} className="space-y-1 md:col-span-2">
                <Skeleton className="h-4 w-32 bg-zinc-500" />
                <Skeleton className="h-24 w-full bg-zinc-500" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-1 rounded-full bg-zinc-500" />
              <Skeleton className="h-6 w-32 bg-zinc-500" />
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-24 bg-zinc-500" />
                  <Skeleton className="h-8 w-24 bg-zinc-500" />
                </div>
                <Skeleton className="h-64 w-full rounded-lg bg-zinc-500" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="bg-gray-50 border-t p-4">
            <div className="flex justify-end w-full gap-3">
              <Skeleton className="h-10 w-28 bg-zinc-500" />
              <Skeleton className="h-10 w-36 bg-zinc-500" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{error}</p>
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
