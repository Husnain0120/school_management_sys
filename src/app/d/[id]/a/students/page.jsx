"use client";
import { useState, useEffect } from "react";
import {
  BadgeCheck,
  User,
  Search,
  Filter,
  SortAsc,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const VerifiedStudentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/fetch-students");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch students");
        }

        // Filter only verified students
        const verifiedStudents = data.students.filter(
          (student) => student.isVerified
        );
        setStudents(verifiedStudents);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError(err.message || "Failed to load student data");
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.portalId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (value) => {
    const newSize = Number(value);
    setPageSize(newSize);
    const newTotalPages = Math.ceil(filteredStudents.length / newSize);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-50 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Error Loading Data</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated gradient border */}
        <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500"></div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-6 w-6 text-emerald-500" />
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Verified Students
                  </h1>
                </div>
                <p className="text-gray-600">
                  Efficient management of all verified students in the system
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-[240px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    className="pl-9 bg-gray-50 border-gray-200"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem>All Classes</DropdownMenuItem>
                      <DropdownMenuItem>Grade 9</DropdownMenuItem>
                      <DropdownMenuItem>Grade 10</DropdownMenuItem>
                      <DropdownMenuItem>Grade 11</DropdownMenuItem>
                      <DropdownMenuItem>Grade 12</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="bg-emerald-50 px-4 py-2 rounded-lg flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
                <span className="font-medium text-emerald-700">
                  Total: {filteredStudents.length} Students
                </span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  Active: {filteredStudents.filter((s) => s.userAccess).length}
                </Badge>
              </div>
              <div className="bg-amber-50 px-4 py-2 rounded-lg flex items-center gap-2">
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  Inactive:{" "}
                  {filteredStudents.filter((s) => !s.userAccess).length}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-8 w-32" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-8" />
                    ))}
                  </div>
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            ) : filteredStudents.length > 0 ? (
              <>
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <div className="font-medium">
                    Showing {(currentPage - 1) * pageSize + 1} to{" "}
                    {Math.min(currentPage * pageSize, filteredStudents.length)}{" "}
                    of {filteredStudents.length} students
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Show:</span>
                    <Select
                      value={pageSize.toString()}
                      onValueChange={handlePageSizeChange}
                    >
                      <SelectTrigger className="w-[80px] h-8">
                        <SelectValue placeholder="10" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center gap-1">
                            Student
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedStudents.map((student, index) => (
                        <TableRow
                          key={student._id}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell className="font-medium">
                            {(currentPage - 1) * pageSize + index + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border border-gray-200">
                                <AvatarImage
                                  src={student.studentPhoto}
                                  alt={student.fullName}
                                />
                                <AvatarFallback className="bg-emerald-50 text-emerald-600 text-xs">
                                  {student.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {student.fullName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.portalId}</TableCell>
                          <TableCell>{student.admissionClass}</TableCell>
                          <TableCell>
                            {new Date(student.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.userAccess ? "default" : "outline"
                              }
                              className={
                                student.userAccess
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                              }
                            >
                              {student.userAccess ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`students/${student?._id}/student-details`}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <Link
                                    href={`students/${student?._id}/student-details`}
                                  >
                                    <DropdownMenuItem>
                                      View Details
                                    </DropdownMenuItem>
                                  </Link>
                                  <Link href={`students/${student?._id}`}>
                                    <DropdownMenuItem>
                                      Edit Student
                                    </DropdownMenuItem>
                                  </Link>
                                  <DropdownMenuSeparator />
                                  <Link href={`students/${student?._id}`}>
                                    <DropdownMenuItem className="text-red-600">
                                      Deactivate
                                    </DropdownMenuItem>
                                  </Link>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={`page-${page}`}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          className={`h-8 w-8 ${
                            currentPage === page ? "bg-emerald-600" : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-full mb-6 shadow-inner">
                  <User className="h-12 w-12 text-emerald-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {searchTerm
                    ? "No Matching Students Found"
                    : "No Verified Students"}
                </h3>
                <p className="text-gray-500 max-w-md text-center mb-6">
                  {searchTerm
                    ? "No students match your search criteria. Try a different search term."
                    : "There are currently no verified students in the system. Approved applications will appear here once processed."}
                </p>
                {searchTerm ? (
                  <Button onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button>Go to Applications</Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifiedStudentsPage;
