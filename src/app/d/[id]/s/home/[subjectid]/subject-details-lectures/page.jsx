"use client";
import { Video, ArrowLeft, GraduationCap, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// Skeleton Components
const TeacherSkeleton = () => (
  <Card className="bg-white shadow-lg border-0 overflow-hidden">
    <div className="bg-zinc-600 p-6 text-white md:rounded-b-[80%] hover:shadow-[_2px_5px_15px_0.1px] transition-all duration-300 duration-initial shadow-gray-900 md:mx-2">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 overflow-hidden rounded-full bg-zinc-500 animate-pulse mb-4"></div>
        <div className="h-6 bg-zinc-500 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-zinc-500 rounded animate-pulse w-24 mx-auto mb-3"></div>
      </div>
    </div>
    <CardContent className="p-6">
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 bg-zinc-300 rounded animate-pulse"></div>
            <div className="h-4 bg-zinc-300 rounded animate-pulse flex-1"></div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const LecturesSkeleton = () => (
  <Card className="bg-white shadow-lg border-0 overflow-hidden">
    <div className="bg-zinc-600 px-4 sm:px-6 py-4 shadow-gray-500 shadow-[_-10px_6px_12px_1px] rounded-r-[500px] md:mr-6 mr-1">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-zinc-500 rounded animate-pulse w-24"></div>
        <div className="h-8 bg-zinc-500 rounded animate-pulse w-16"></div>
      </div>
    </div>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 rounded animate-pulse w-4"></div>
              </th>
              <th className="px-4 sm:px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 rounded animate-pulse w-24"></div>
              </th>
              <th className="px-4 sm:px-6 py-3 text-center">
                <div className="h-4 bg-zinc-300 rounded animate-pulse w-12 mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td className="px-4 sm:px-6 py-4">
                  <div className="h-4 bg-zinc-300 rounded animate-pulse w-4"></div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="h-4 bg-zinc-300 rounded animate-pulse w-48"></div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-center">
                  <div className="h-8 w-8 bg-zinc-300 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const subjectid = params.subjectid;

  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/student/getclass-subject/${subjectid}/subject-details-lectures`
        );

        if (response.data.success) {
          setSubjectData(response.data.subjectDetails);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch subject details");
        console.error("Error fetching subject data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (subjectid) {
      fetchSubjectData();
    }
  }, [subjectid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-600">
        {/* Page Header Skeleton */}
        <div className="bg-zinc-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="h-8 bg-zinc-500 rounded animate-pulse w-96"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <TeacherSkeleton />
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <LecturesSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-600 flex items-center justify-center">
        <Card className="bg-white p-6 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Page Header */}
      <div className="bg-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
            {subjectData?.subCode} - {subjectData?.name}
          </h1>
          <p className="text-gray-600 mt-1">{subjectData?.className}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Teacher Details */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white md:rounded-b-[80%] hover:shadow-[_2px_5px_15px_0.1px] transition-all duration-300 duration-initial shadow-gray-900 md:mx-2">
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 mb-4">
                    <img
                      src={
                        subjectData?.teacher?.studentPhoto ||
                        "/placeholder.svg?height=128&width=128"
                      }
                      alt={subjectData?.teacher?.fullName || "Teacher"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2">
                    {subjectData?.teacher?.fullName || "Teacher Name"}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 mb-3"
                  >
                    Course Instructor
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span>
                      {subjectData?.teacher?.qualification || "Qualification"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{subjectData?.teacher?.email || "Email"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <User className="h-4 w-4 text-blue-600" />
                    <span>
                      {subjectData?.teacher?.experience || "Experience"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Lectures Table */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 sm:px-6 py-4 shadow-gray-500 shadow-[_-10px_6px_12px_1px] rounded-r-[500px] md:mr-6 mr-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">
                    Lectures ({subjectData?.lectures?.length || 0})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-purple-600"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </div>
              </div>

              {/* Lectures Table */}
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lecture Name
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Video
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subjectData?.lectures?.length > 0 ? (
                        subjectData.lectures.map((lecture, index) => (
                          <tr
                            key={lecture._id}
                            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                          >
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900">
                                  {index + 1}
                                </span>
                              </div>
                            </td>
                            <Link
                              href={`subject-details-lectures/${lecture._id}/lecture`}
                            >
                              <td className="px-4 sm:px-6 py-4">
                                <div className="text-sm sm:text-base font-medium text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                                  {lecture.title}
                                </div>
                              </td>
                            </Link>
                            <td className="px-4 sm:px-6 py-4 text-center">
                              <div className="flex justify-center">
                                <Link
                                  href={`subject-details-lectures/${lecture._id}/lecture`}
                                >
                                  <div className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors cursor-pointer">
                                    <Video className="h-5 w-5 text-red-600" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-4 sm:px-6 py-8 text-center text-gray-500"
                          >
                            No lectures available for this subject
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
