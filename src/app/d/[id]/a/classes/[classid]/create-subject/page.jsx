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
import { BookOpen, Plus, Search, User, Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubjectsPage() {
  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for teachers (static for now)
  const teachers = [
    { _id: "1", fullName: "John Smith", portalId: "edu23456789" },
    { _id: "2", fullName: "Sarah Johnson", portalId: "edu23987654" },
    { _id: "3", fullName: "Michael Brown", portalId: "edu23123456" },
    { _id: "4", fullName: "Emily Davis", portalId: "edu23654321" },
    { _id: "5", fullName: "Robert Wilson", portalId: "edu23111222" },
    { _id: "6", fullName: "Jennifer Taylor", portalId: "edu23222333" },
    { _id: "7", fullName: "David Martinez", portalId: "edu23333444" },
    { _id: "8", fullName: "Lisa Anderson", portalId: "edu23444555" },
  ];

  // Mock data for subjects (static for now)
  const subjects = [
    { _id: "1", name: "Mathematics", teacher: teachers[0] },
    { _id: "2", name: "Science", teacher: teachers[1] },
    { _id: "3", name: "English", teacher: teachers[2] },
    { _id: "4", name: "History", teacher: teachers[3] },
    { _id: "5", name: "Computer Science", teacher: teachers[4] },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.teacher.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subject.teacher.portalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would normally submit to an API
    alert(`Subject: ${subjectName}, Teacher ID: ${selectedTeacher}`);
    // Reset form
    setSubjectName("");
    setSelectedTeacher("");
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <>
      {/* Form Card Skeleton */}
      <Card className="mb-8 border-black/10 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-black/10">
          <Skeleton className="h-6 w-48 bg-zinc-500" />
          <Skeleton className="h-4 w-72 mt-1 bg-zinc-500" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-zinc-500" />
                <Skeleton className="h-10 w-full bg-zinc-500" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-zinc-500" />
                <Skeleton className="h-10 w-full bg-zinc-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32 bg-zinc-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List Card Skeleton */}
      <Card className="border-black/10 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-black/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Skeleton className="h-6 w-32 bg-zinc-500" />
              <Skeleton className="h-4 w-48 mt-1 bg-zinc-500" />
            </div>
            <Skeleton className="h-10 w-full md:w-64 bg-zinc-500" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            {/* Table Header Skeleton */}
            <div className="border-b border-gray-200">
              <div className="flex py-3">
                <Skeleton className="h-5 w-10 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-40 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-40 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-32 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-24 ml-auto bg-zinc-500" />
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center py-4 border-b border-gray-100"
              >
                <Skeleton className="h-5 w-6 mr-4 bg-zinc-500" />
                <div className="w-40 mr-4">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full mr-2 bg-zinc-500" />
                    <Skeleton className="h-5 w-32 bg-zinc-500" />
                  </div>
                </div>
                <div className="w-40 mr-4">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full mr-2 bg-zinc-500" />
                    <Skeleton className="h-5 w-32 bg-zinc-500" />
                  </div>
                </div>
                <Skeleton className="h-5 w-32 mr-4 bg-zinc-500" />
                <div className="ml-auto flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md bg-zinc-500" />
                  <Skeleton className="h-8 w-8 rounded-md bg-zinc-500" />
                </div>
              </div>
            ))}

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <Skeleton className="h-8 w-24 bg-zinc-500" />
              <div className="flex gap-1">
                {[1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="h-8 w-8 rounded-md bg-zinc-500"
                  />
                ))}
              </div>
              <Skeleton className="h-8 w-24 bg-zinc-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Subject Management
          </h1>
          <p className="text-gray-600">
            Create and manage subjects for your educational institution
          </p>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Form Card */}
            <Card className="mb-8 border-black/10 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-black/10">
                <CardTitle className="text-xl font-semibold text-black">
                  Add New Subject
                </CardTitle>
                <CardDescription>
                  Create a new subject and assign a teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="subjectName"
                        className="text-black font-medium"
                      >
                        Subject Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subjectName"
                        placeholder="Enter subject name"
                        className="border-gray-300 focus-visible:ring-black"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="teacher"
                        className="text-black font-medium"
                      >
                        Assign Teacher <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={setSelectedTeacher}
                        value={selectedTeacher}
                      >
                        <SelectTrigger className="border-gray-300 bg-white focus-visible:ring-black">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 max-h-[300px]">
                          {teachers.map((teacher) => (
                            <SelectItem
                              key={teacher._id}
                              value={teacher._id}
                              className="hover:bg-gray-100 cursor-pointer py-3"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {teacher.fullName}
                                </span>
                                <span className="text-gray-500 text-xs mt-0.5">
                                  ID: {teacher.portalId}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white"
                      disabled={!subjectName || !selectedTeacher}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Subject
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Subjects List Card */}
            <Card className="border-black/10 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-black/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-black">
                      Subjects
                    </CardTitle>
                    <CardDescription>
                      View and manage all subjects
                    </CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search subjects..."
                      className="pl-8 border-gray-300 focus-visible:ring-black"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow className="hover:bg-gray-50">
                        <TableHead className="w-[50px] text-black">#</TableHead>
                        <TableHead className="text-black">
                          Subject Name
                        </TableHead>
                        <TableHead className="text-black">Teacher</TableHead>
                        <TableHead className="text-black">Portal ID</TableHead>
                        <TableHead className="w-[100px] text-black text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject, index) => (
                          <TableRow
                            key={subject._id}
                            className="hover:bg-gray-50/50 border-b border-gray-100"
                          >
                            <TableCell className="font-medium text-gray-900">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium text-gray-900">
                                  {subject.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{subject.teacher.fullName}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {subject.teacher.portalId}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Pencil className="h-4 w-4 text-gray-500" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            {searchQuery ? (
                              <div className="flex flex-col items-center justify-center text-gray-500">
                                <Search className="h-8 w-8 mb-2 text-gray-400" />
                                <p>
                                  No subjects found matching "{searchQuery}"
                                </p>
                                <Button
                                  variant="link"
                                  className="mt-1 text-black"
                                  onClick={() => setSearchQuery("")}
                                >
                                  Clear search
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-500">
                                <BookOpen className="h-8 w-8 mb-2 text-gray-400" />
                                <p>No subjects have been added yet</p>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
