"use client";

import { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  Plus,
  User,
  Pencil,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function SubjectsPage() {
  // Get class ID from URL params
  const params = useParams();
  const classId = params.classid;

  // Form state
  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Data loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classInfo, setClassInfo] = useState(null);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [teacherError, setTeacherError] = useState(null);
  const [subjectsError, setSubjectsError] = useState(null);

  // Fetch subjects and teachers when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchSubjects(), fetchTeachers()]);
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  // Fetch subjects for the current class
  const fetchSubjects = async () => {
    setIsLoadingSubjects(true);
    setSubjectsError(null);

    try {
      const response = await axios.get(
        `/api/admin/classes-mange/create-class/${classId}/create-subject`
      );
      console.log("Subjects data:", response.data.subjects);
      if (response.data.success) {
        // Process subjects data
        const subjectsData = response.data.subjects?.subjects || [];
        const processedSubjects = subjectsData.map((item) => {
          // Check if teacher exists and is an object
          const teacher = item.teacher;
          const isTeacherObject = teacher && typeof teacher === "object";

          return {
            _id: item._id,
            name: item.name,
            subCode: item.subCode,
            teacher: {
              id: isTeacherObject ? teacher._id : teacher,
              fullName: isTeacherObject ? teacher.fullName : "Unknown Teacher",
              portalId: isTeacherObject ? teacher.portalId : "N/A",
            },
          };
        });

        setSubjects(processedSubjects);
        setClassInfo(response.data.subjects);
      } else {
        throw new Error(response.data.message || "Failed to load subjects");
      }
    } catch (error) {
      console.error("Subjects fetch error:", error);
      setSubjectsError(error.message);
      toast.error("Failed to load subjects");
    } finally {
      setIsLoadingSubjects(false);
    }
  };

  // Fetch all available teachers
  const fetchTeachers = async () => {
    setIsLoadingTeachers(true);
    setTeacherError(null);

    try {
      const response = await axios.get("/api/admin/fetch-teachers");

      if (response.data.teachers) {
        setTeachers(response.data.teachers);
        updateTeacherNamesInSubjects(response.data.teachers);
      } else {
        throw new Error("No teachers data found");
      }
    } catch (error) {
      console.error("Teachers fetch error:", error);
      setTeacherError(error.message);
      toast.error("Failed to load teachers");
    } finally {
      setIsLoadingTeachers(false);
    }
  };

  // Update teacher names in subjects after teachers are loaded
  const updateTeacherNamesInSubjects = (teachersList) => {
    if (subjects.length === 0) return;

    const teacherMap = {};
    teachersList.forEach((teacher) => {
      teacherMap[teacher._id] = {
        fullName: teacher.fullName?.trim() || "Unknown Teacher",
        portalId: teacher.portalId || "N/A",
      };
    });

    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) => ({
        ...subject,
        teacher: {
          ...subject.teacher,
          fullName:
            teacherMap[subject.teacher.id]?.fullName || "Unknown Teacher",
          portalId: teacherMap[subject.teacher.id]?.portalId || "N/A",
        },
      }))
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!subjectName.trim()) {
      toast.error("Subject name is required");
      return;
    }

    if (!selectedTeacher) {
      toast.error("Please select a teacher");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `/api/admin/classes-mange/create-class/${classId}/create-subject`,
        {
          name: subjectName,
          teacher: selectedTeacher,
        }
      );

      if (response.data.success) {
        toast.success("Subject added successfully");

        // Add new subject to state
        const newSubject = response.data.subject;
        const teacher = teachers.find((t) => t._id === selectedTeacher);

        setSubjects((prev) => [
          ...prev,
          {
            _id: newSubject._id,
            name: newSubject.name,
            subCode: newSubject.subCode,
            teacher: {
              id: newSubject.teacher,
              fullName: teacher?.fullName || "Unknown Teacher",
              portalId: teacher?.portalId || "N/A",
            },
          },
        ]);

        // Reset form
        setSubjectName("");
        setSelectedTeacher("");
      } else {
        throw new Error(response.data.message || "Failed to add subject");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <>
      {/* Form Card Skeleton */}
      <Card className="mb-8 border-border shadow-sm">
        <CardHeader className="bg-muted/50 border-b">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72 mt-1" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List Card Skeleton */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/50 border-b">
          <div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            {/* Table Header Skeleton */}
            <div className="border-b">
              <div className="flex py-3">
                <Skeleton className="h-5 w-10 mr-4" />
                <Skeleton className="h-5 w-40 mr-4" />
                <Skeleton className="h-5 w-40 mr-4" />
                <Skeleton className="h-5 w-32 mr-4" />
                <Skeleton className="h-5 w-24 ml-auto" />
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center py-4 border-b">
                <Skeleton className="h-5 w-6 mr-4" />
                <div className="w-40 mr-4">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full mr-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
                <div className="w-40 mr-4">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full mr-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
                <Skeleton className="h-5 w-32 mr-4" />
                <div className="ml-auto flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  // Main component render
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Subject Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage subjects for {classInfo?.name || "your class"}
          </p>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Add Subject Form Card */}
            <Card className="mb-8 border-border shadow-sm">
              <CardHeader className="bg-muted/50 border-b">
                <CardTitle className="text-xl font-semibold">
                  Add New Subject
                </CardTitle>
                <CardDescription>
                  Create a new subject and assign a teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Subject Name Input */}
                    <div className="space-y-2">
                      <Label htmlFor="subjectName" className="font-medium">
                        Subject Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="subjectName"
                        placeholder="e.g. Mathematics, Physics"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Teacher Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="teacher" className="font-medium">
                        Assign Teacher{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      {teacherError && (
                        <div className="flex items-center text-destructive text-sm mb-2">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>{teacherError}</span>
                        </div>
                      )}

                      <Select
                        onValueChange={setSelectedTeacher}
                        value={selectedTeacher}
                        disabled={isLoadingTeachers || teacherError}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoadingTeachers
                                ? "Loading teachers..."
                                : teacherError
                                ? "Error loading teachers"
                                : "Select a teacher"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {isLoadingTeachers ? (
                            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Loading teachers...</span>
                            </div>
                          ) : teacherError ? (
                            <div className="p-4 text-sm text-destructive">
                              <p>Failed to load teachers</p>
                              <p>Please try again later</p>
                            </div>
                          ) : teachers.length > 0 ? (
                            teachers.map((teacher) => (
                              <SelectItem
                                key={teacher._id}
                                value={teacher._id}
                                className="cursor-pointer"
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {teacher.fullName}
                                  </span>
                                  <span className="text-muted-foreground text-xs mt-0.5">
                                    ID: {teacher.portalId || "N/A"}
                                  </span>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-4 text-sm text-muted-foreground text-center">
                              <p>No teachers available</p>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={
                        !subjectName ||
                        !selectedTeacher ||
                        isLoadingTeachers ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Subject
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Subjects List Card */}
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/50 border-b">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    Subjects
                  </CardTitle>
                  <CardDescription>
                    {subjects.length} subject{subjects.length !== 1 ? "s" : ""}{" "}
                    in this class
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingSubjects ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading subjects...</p>
                  </div>
                ) : subjectsError ? (
                  <div className="p-8 text-center text-destructive">
                    <AlertCircle className="h-8 w-8 mx-auto mb-4" />
                    <p>{subjectsError}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSubjectsError(null);
                        fetchSubjects();
                      }}
                    >
                      Retry
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="w-[50px]">#</TableHead>
                          <TableHead>Subject Name</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Subject Code</TableHead>
                          <TableHead>Portal ID</TableHead>
                          <TableHead className="w-[100px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects.length > 0 ? (
                          subjects.map((subject, index) => (
                            <TableRow
                              key={subject._id}
                              className="border-border"
                            >
                              <TableCell className="font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="font-medium">
                                    {subject.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    {subject.teacher?.fullName || "Unknown"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {subject.subCode || "N/A"}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {subject.teacher?.portalId || "N/A"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    title="Edit subject"
                                    onClick={() =>
                                      toast.info(
                                        "Edit functionality coming soon"
                                      )
                                    }
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                                    title="Delete subject"
                                    onClick={() =>
                                      toast.info(
                                        "Delete functionality coming soon"
                                      )
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <BookOpen className="h-8 w-8 mb-2" />
                                <p>No subjects have been added yet</p>
                                <Button
                                  variant="ghost"
                                  className="mt-1"
                                  onClick={() => window.scrollTo(0, 0)}
                                >
                                  Add your first subject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
