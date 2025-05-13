"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, User, Filter, Printer } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AdmissionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = () => {
      setTimeout(() => {
        setAdmissions([
          {
            id: 1,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            isVerified: false,
            date: "2023-05-15",
          },
          {
            id: 2,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            isVerified: false,
            date: "2023-05-15",
          },
          {
            id: 3,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            isVerified: false,
            date: "2023-05-15",
          },
          {
            id: 4,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            isVerified: false,
            date: "2023-05-15",
          },
          {
            id: 5,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            isVerified: false,
            date: "2023-05-15",
          },
          {
            id: 6,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            isVerified: false,
            date: "2023-05-15",
          },
          // ... other data
        ]);
        setLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  const getStatusBadge = (isVerified) => {
    if (isVerified === true)
      return <Badge className="bg-green-500">Approved</Badge>;
    if (isVerified === false)
      return <Badge className="bg-yellow-500">Pending</Badge>;
    return <Badge className="bg-red-500">Rejected</Badge>;
  };

  const filteredApplications = admissions.filter((application) => {
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "approved" && application.isVerified === true) ||
      (statusFilter === "pending" && application.isVerified === false) ||
      (statusFilter === "rejected" && application.isVerified === null);
    return matchesSearch && matchesStatus;
  });

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
            .badge { padding: 3px 8px; border-radius: 12px; font-size: 12px; color: white; }
            .approved { background-color: #10B981; }
            .pending { background-color: #F59E0B; }
            .rejected { background-color: #EF4444; }
          </style>
        </head>
        <body>
          <h1>Admission Applications: ${date.toDateString()}</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredApplications
                .map(
                  (app) => `
                <tr>
                  <td>${app.id}</td>
                  <td>${app.name}</td>
                  <td>${app.email}</td>
                  <td>
                    <span class="badge ${
                      app.isVerified === true
                        ? "approved"
                        : app.isVerified === false
                        ? "pending"
                        : "rejected"
                    }">
                      ${
                        app.isVerified === true
                          ? "Approved"
                          : app.isVerified === false
                          ? "Pending"
                          : "Rejected"
                      }
                    </span>
                  </td>
                  <td>${new Date(app.date).toLocaleDateString()}</td>
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

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col space-y-6">
          {/* Loading Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Skeleton className="h-8 w-48 bg-zinc-500 rounded-md" />
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Skeleton className="h-10 w-[200px] bg-zinc-500 rounded-md" />
              <Skeleton className="h-10  w-full bg-zinc-500 rounded-md" />
              <Skeleton className="h-10 w-32 bg-zinc-500 rounded-md" />
            </div>
          </div>

          {/* Loading Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  {[...Array(6)].map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-6 w-24 bg-zinc-500 rounded-md" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(15)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {[...Array(6)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="flex items-center space-x-2">
                          {cellIndex === 1 ? (
                            <>
                              <Skeleton className="h-10 w-10 rounded-full bg-zinc-500" />
                              <Skeleton className="h-4 w-32 bg-zinc-500 rounded-md" />
                            </>
                          ) : cellIndex === 3 ? (
                            <Skeleton className="h-6 w-20 bg-zinc-500 rounded-full" />
                          ) : cellIndex === 5 ? (
                            <Skeleton className="h-9 w-20 bg-zinc-500 rounded-md" />
                          ) : (
                            <Skeleton className="h-4 w-24 bg-zinc-500 rounded-md" />
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
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 print:hidden">
          <h1 className="text-2xl font-bold">Admission Applications</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status:{" "}
                  {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"bg-white "}>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("all")}
                  className={"cursor-pointer hover:bg-zinc-100"}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("approved")}
                  className={"cursor-pointer hover:bg-green-100"}
                >
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("pending")}
                  className={"cursor-pointer hover:bg-orange-100"}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("rejected")}
                  className={"cursor-pointer hover:bg-red-100"}
                >
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="print:hidden">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.id}</TableCell>
                  <TableCell>
                    <div className=" flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full ">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="cursor-pointer hover:underline">
                        {application.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>
                    {getStatusBadge(application.isVerified)}
                  </TableCell>
                  <TableCell>
                    {new Date(application.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="print:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        "hover:bg-zinc-800 hover:text-gray-100 cursor-pointer"
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;
