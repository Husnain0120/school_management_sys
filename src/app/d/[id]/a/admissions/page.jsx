"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Printer,
  RefreshCw,
  Search,
  FileText,
  Download,
  ClipboardList,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdmissionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Function to fetch applications
  const fetchApplications = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get(`/api/admin/admission-applications`);
      setAdmissions(res.data?.applications || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch admissions:", error);
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    fetchApplications();
  };

  const handlePrint = () => {
    const date = new Date();
    const printWindow = window.open("", "", "width=1000,height=1000");
    printWindow.document.write(`
      <html>
        <head>
          <title>Admission Applications</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Admission Applications: ${date.toDateString()}</h1>
          <table>
            <thead>
              <tr>
                <th>#No</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${admissions
                .map(
                  (app, inx) => `
                <tr>
                  <td>#${inx + 1}</td>
                  <td>${app.fullName}</td>
                  <td>${app.email}</td>
                  <td>${
                    app.isVerified === true
                      ? "Approved"
                      : app.isVerified === false
                      ? "Pending"
                      : "Rejected"
                  }</td>
                  <td>${new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p>Printed on ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Filter applications based on search term and status
  const filteredAdmissions = admissions.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "approved")
      return matchesSearch && app.isVerified === true;
    if (statusFilter === "pending")
      return matchesSearch && app.isVerified === false;
    if (statusFilter === "rejected")
      return matchesSearch && app.isVerified === null;

    return matchesSearch;
  });

  // Get counts for status badges
  const approvedCount = admissions.filter(
    (app) => app.isVerified === true
  ).length;
  const pendingCount = admissions.filter(
    (app) => app.isVerified === false
  ).length;
  const rejectedCount = admissions.filter(
    (app) => app.isVerified === null
  ).length;

  // Render loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Skeleton className="h-8 w-48 bg-gray-200 rounded-md" />
              <div className="flex gap-3 w-full md:w-auto">
                <Skeleton className="h-10 w-32 bg-gray-200 rounded-md" />
                <Skeleton className="h-10 w-32 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <Skeleton className="h-8 w-32 bg-gray-200 rounded-full" />
              <Skeleton className="h-8 w-32 bg-gray-200 rounded-full" />
              <Skeleton className="h-8 w-32 bg-gray-200 rounded-full" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Skeleton className="h-10 w-full md:w-64 bg-gray-200 rounded-md" />
              <Skeleton className="h-10 w-full md:w-48 bg-gray-200 rounded-md" />
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    {[...Array(6)].map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-6 w-24 bg-gray-200 rounded-md" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="flex items-center space-x-2">
                            {cellIndex === 1 ? (
                              <>
                                <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />
                              </>
                            ) : cellIndex === 3 ? (
                              <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
                            ) : cellIndex === 5 ? (
                              <Skeleton className="h-9 w-20 bg-gray-200 rounded-md" />
                            ) : (
                              <Skeleton className="h-4 w-24 bg-gray-200 rounded-md" />
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render empty state when no applications are found
  if (admissions.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Admission Applications
                </CardTitle>
                <CardDescription>
                  Manage student admission requests
                </CardDescription>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="gap-2 bg-white hover:bg-blue-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-blue-50">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <FileText className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Applications Found
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                There are currently no admission applications in the system. New
                applications will appear here once submitted.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                {/* <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <ClipboardList className="h-4 w-4" />
                  Create Application
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render no results found when filtering returns empty
  if (filteredAdmissions.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Admission Applications
                </CardTitle>
                <CardDescription>
                  Manage student admission requests
                </CardDescription>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="gap-2 bg-white hover:bg-blue-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Refreshing..." : "Refresh"}
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="gap-2 bg-white hover:bg-blue-50"
                >
                  <Printer className="h-4 w-4" /> Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge
                variant="outline"
                className={`px-3 py-1 text-sm font-medium ${
                  statusFilter === "all"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "hover:bg-blue-50"
                }`}
                onClick={() => setStatusFilter("all")}
              >
                All ({admissions.length})
              </Badge>
              <Badge
                variant="outline"
                className={`px-3 py-1 text-sm font-medium ${
                  statusFilter === "approved"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "hover:bg-green-50"
                }`}
                onClick={() => setStatusFilter("approved")}
              >
                Approved ({approvedCount})
              </Badge>
              <Badge
                variant="outline"
                className={`px-3 py-1 text-sm font-medium ${
                  statusFilter === "pending"
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : "hover:bg-yellow-50"
                }`}
                onClick={() => setStatusFilter("pending")}
              >
                Pending ({pendingCount})
              </Badge>
              <Badge
                variant="outline"
                className={`px-3 py-1 text-sm font-medium ${
                  statusFilter === "rejected"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "hover:bg-red-50"
                }`}
                onClick={() => setStatusFilter("rejected")}
              >
                Rejected ({rejectedCount})
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Matching Applications
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                No applications match your current search and filter criteria.
                Try adjusting your filters or search term.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main render with applications
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Admission Applications
              </CardTitle>
              <CardDescription>
                Manage student admission requests
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="gap-2 bg-white hover:bg-blue-50 transition-all duration-200"
                disabled={refreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="gap-2 bg-white hover:bg-blue-50 transition-all duration-200"
              >
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button
                variant="default"
                className="gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              >
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge
              variant="outline"
              className={`px-3 py-1 text-sm font-medium cursor-pointer transition-all duration-200 ${
                statusFilter === "all"
                  ? "bg-blue-100 text-blue-800 border-blue-200"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              All ({admissions.length})
            </Badge>
            <Badge
              variant="outline"
              className={`px-3 py-1 text-sm font-medium cursor-pointer transition-all duration-200 ${
                statusFilter === "approved"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "hover:bg-green-50"
              }`}
              onClick={() => setStatusFilter("approved")}
            >
              Approved ({approvedCount})
            </Badge>
            <Badge
              variant="outline"
              className={`px-3 py-1 text-sm font-medium cursor-pointer transition-all duration-200 ${
                statusFilter === "pending"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                  : "hover:bg-yellow-50"
              }`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending ({pendingCount})
            </Badge>
            <Badge
              variant="outline"
              className={`px-3 py-1 text-sm font-medium cursor-pointer transition-all duration-200 ${
                statusFilter === "rejected"
                  ? "bg-red-100 text-red-800 border-red-200"
                  : "hover:bg-red-50"
              }`}
              onClick={() => setStatusFilter("rejected")}
            >
              Rejected ({rejectedCount})
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search by name or email..."
                className="pl-10 bg-gray-50 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-gray-50 border-gray-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600">
                    #No
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Applicant
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 print:hidden">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmissions.map((application, index) => (
                  <TableRow
                    key={application._id}
                    className="hover:bg-blue-50/50 transition-colors duration-150"
                  >
                    <TableCell className="font-medium text-gray-700">
                      #{index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-full border-2 border-gray-200 shadow-sm overflow-hidden transition-transform hover:scale-110 duration-200">
                          <AvatarImage
                            src={application.studentPhoto || "/placeholder.svg"}
                            alt={application.fullName}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                            {application.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                            {application.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {application._id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {application.email}
                    </TableCell>
                    <TableCell>
                      {application.isVerified === true ? (
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                          <span className="font-medium text-green-700">
                            Approved
                          </span>
                        </div>
                      ) : application.isVerified === false ? (
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                          <span className="font-medium text-yellow-700">
                            Pending
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                          <span className="font-medium text-red-700">
                            Rejected
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="print:hidden">
                      <Link href={`admissions/${application._id}/details`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
            <p>
              Showing {filteredAdmissions.length} of {admissions.length}{" "}
              applications
            </p>
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionsPage;
