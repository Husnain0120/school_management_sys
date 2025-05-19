"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  BookOpen,
  School,
  CheckCircle,
  ArrowLeft,
  Download,
  Hash,
  AtSign,
  Home,
  Map,
  GraduationCap,
  Shield,
  CalendarClock,
  VenusAndMars,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/fetch-students/${params.studentid}/student-details`
        );
        const result = await response.json();

        if (result.success) {
          setStudent(result.data);
        } else {
          setError(result.message || "Failed to load student details");
        }
      } catch (err) {
        console.error("Error fetching student details:", err);
        setError("An error occurred while fetching student details");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.studentid) {
      fetchStudentDetails();
    }
  }, [params.studentid]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-red-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Error Loading Data
              </h3>
              <p className="text-gray-600">{error}</p>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100"
                >
                  Go Back
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-2 group px-0 hover:bg-transparent"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 mr-2 text-gray-600 transition-transform group-hover:-translate-x-1" />
          <span className="text-gray-700 font-medium">Back to Students</span>
        </Button>

        {isLoading ? (
          <StudentDetailsSkeleton />
        ) : (
          <>
            {/* Header Card */}
            <Card className="border-0 shadow-sm">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500"></div>

              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Student Photo Section */}
                  <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center md:border-r border-gray-200 bg-white">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                      <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img
                          src={
                            student.studentPhoto ||
                            "/placeholder.svg?height=160&width=160"
                          }
                          alt={student.fullName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
                      {student.fullName}
                    </h2>

                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-50">
                        {student.role}
                      </Badge>
                      {student.isVerified && (
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-50">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="mt-6 w-full space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
                        <div className="bg-emerald-50 p-2 rounded-full border border-emerald-100">
                          <AtSign className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
                        <div className="bg-blue-50 p-2 rounded-full border border-blue-100">
                          <Hash className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Portal ID</p>
                          <p className="text-sm font-medium text-gray-900">
                            {student.portalId}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
                        <div className="bg-purple-50 p-2 rounded-full border border-purple-100">
                          <GraduationCap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Class</p>
                          <p className="text-sm font-medium text-gray-900">
                            {student.admissionClass}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Details Section */}
                  <div className="w-full md:w-2/3 p-6 md:p-8 bg-white">
                    <Tabs
                      defaultValue="profile"
                      className="w-full"
                      onValueChange={setActiveTab}
                    >
                      <TabsList className="mb-6 bg-gray-50 border border-gray-200">
                        <TabsTrigger
                          value="profile"
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200"
                        >
                          Profile
                        </TabsTrigger>
                        <TabsTrigger
                          value="documents"
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200"
                        >
                          Documents
                        </TabsTrigger>
                        <TabsTrigger
                          value="academic"
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200"
                        >
                          Academic
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="profile" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InfoCard
                            icon={<User className="h-5 w-5 text-emerald-600" />}
                            label="Father's Name"
                            value={student.fatherName}
                            bgColor="bg-emerald-50"
                            borderColor="border-emerald-100"
                          />

                          <InfoCard
                            icon={
                              <Calendar className="h-5 w-5 text-blue-600" />
                            }
                            label="Date of Birth"
                            value={formatDate(student.dateOfBirth)}
                            bgColor="bg-blue-50"
                            borderColor="border-blue-100"
                          />

                          <InfoCard
                            icon={
                              <VenusAndMars className="h-5 w-5 text-purple-600" />
                            }
                            label="Gender"
                            value={
                              student.gender === "male"
                                ? "Male"
                                : student.gender === "female"
                                ? "Female"
                                : student.gender
                            }
                            bgColor="bg-purple-50"
                            borderColor="border-purple-100"
                          />

                          <InfoCard
                            icon={<MapPin className="h-5 w-5 text-red-600" />}
                            label="City"
                            value={student.city}
                            bgColor="bg-red-50"
                            borderColor="border-red-100"
                          />

                          <InfoCard
                            icon={<Hash className="h-5 w-5 text-amber-600" />}
                            label="Zip Code"
                            value={student.zipCode}
                            bgColor="bg-amber-50"
                            borderColor="border-amber-100"
                          />

                          <InfoCard
                            icon={
                              <CalendarClock className="h-5 w-5 text-indigo-600" />
                            }
                            label="Registered On"
                            value={formatDate(student.createdAt)}
                            bgColor="bg-indigo-50"
                            borderColor="border-indigo-100"
                          />
                        </div>

                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Address Information
                          </h3>

                          <div className="space-y-3">
                            <div className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-xs transition-shadow">
                              <div className="flex items-center gap-2 mb-2">
                                <Home className="h-4 w-4 text-gray-500" />
                                <h4 className="font-medium text-gray-700">
                                  Current Address
                                </h4>
                              </div>
                              <p className="text-gray-600 pl-6">
                                {student.currentAddress}
                              </p>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-xs transition-shadow">
                              <div className="flex items-center gap-2 mb-2">
                                <Map className="h-4 w-4 text-gray-500" />
                                <h4 className="font-medium text-gray-700">
                                  Permanent Address
                                </h4>
                              </div>
                              <p className="text-gray-600 pl-6">
                                {student.permanentAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="documents" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <DocumentCard
                            title="Student Photo"
                            imageUrl={student.studentPhoto}
                            altText={`${student.fullName}'s photo`}
                          />

                          <DocumentCard
                            title="ID Proof"
                            imageUrl={student.idProof}
                            altText={`${student.fullName}'s ID proof`}
                          />

                          <DocumentCard
                            title="Birth Certificate"
                            imageUrl={student.birthCertificate}
                            altText={`${student.fullName}'s birth certificate`}
                            className="md:col-span-2"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="academic" className="mt-0">
                        <div className="space-y-4">
                          <InfoCard
                            icon={
                              <BookOpen className="h-5 w-5 text-emerald-600" />
                            }
                            label="Admission Class"
                            value={student.admissionClass}
                            bgColor="bg-emerald-50"
                            borderColor="border-emerald-100"
                          />

                          {student.previousSchool && (
                            <InfoCard
                              icon={
                                <School className="h-5 w-5 text-blue-600" />
                              }
                              label="Previous School"
                              value={student.previousSchool || "N/A"}
                              bgColor="bg-blue-50"
                              borderColor="border-blue-100"
                            />
                          )}

                          <div className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-xs transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                              Account Status
                            </h3>

                            <div className="flex items-center gap-4">
                              <div
                                className={`p-3 rounded-full ${
                                  student.userAccess
                                    ? "bg-emerald-50 border border-emerald-100"
                                    : "bg-red-50 border border-red-100"
                                }`}
                              >
                                {student.userAccess ? (
                                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                                ) : (
                                  <svg
                                    className="h-6 w-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                )}
                              </div>

                              <div>
                                <p className="font-medium text-gray-900">
                                  {student.userAccess
                                    ? "Active Account"
                                    : "Inactive Account"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {student.userAccess
                                    ? "Student has access to the portal"
                                    : "Student does not have access to the portal"}
                                </p>
                              </div>

                              <div className="ml-auto">
                                <Button
                                  variant={
                                    student.userAccess ? "outline" : "default"
                                  }
                                  className={
                                    student.userAccess
                                      ? "border-gray-300 hover:bg-gray-50"
                                      : "bg-blue-600 hover:bg-blue-700"
                                  }
                                >
                                  {student.userAccess
                                    ? "Deactivate"
                                    : "Activate"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 group"
              >
                <Download className="h-4 w-4 mr-2 text-gray-600 group-hover:animate-bounce" />
                <span className="text-gray-700">Download Profile</span>
              </Button>

              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 group"
              >
                <Mail className="h-4 w-4 mr-2 text-gray-600 group-hover:translate-x-1 transition-transform" />
                <span className="text-gray-700">Send Message</span>
              </Button>

              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                Edit Profile
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Helper Components
const InfoCard = ({
  icon,
  label,
  value,
  bgColor = "bg-gray-50",
  borderColor = "border-gray-100",
}) => (
  <div
    className={`p-4 rounded-lg border ${borderColor} ${bgColor} hover:shadow-xs transition-all duration-200`}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-full border border-gray-200 shadow-xs">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value || "N/A"}</p>
      </div>
    </div>
  </div>
);

const DocumentCard = ({ title, imageUrl, altText, className = "" }) => (
  <div
    className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-xs transition-shadow ${className}`}
  >
    <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
      <h3 className="font-medium text-gray-700">{title}</h3>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 text-gray-600 hover:bg-gray-100"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </Button>
    </div>
    <div className="p-4 bg-white">
      <div className="aspect-video relative overflow-hidden rounded-md bg-gray-100 border border-gray-200">
        <img
          src={imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={altText}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </div>
);

const StudentDetailsSkeleton = () => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-0">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center md:border-r border-gray-200 bg-white">
          <Skeleton className="h-40 w-40 rounded-full" />
          <Skeleton className="h-7 w-48 mt-6" />
          <Skeleton className="h-5 w-32 mt-3" />

          <div className="mt-6 w-full space-y-3">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 md:p-8 bg-white">
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>

          <Skeleton className="h-6 w-48 mt-6 mb-4" />
          <Skeleton className="h-24 w-full rounded-lg mb-3" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </CardContent>
  </Card>
);
