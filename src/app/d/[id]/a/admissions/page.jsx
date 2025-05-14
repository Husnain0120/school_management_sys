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
import { Skeleton } from "@/components/ui/skeleton";
import { User, Printer } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const AdmissionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/admin/admission-applications`);
        setAdmissions(res.data?.applications || []); // Ensure we always have an array
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch admissions:", error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

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

  if (loading || admissions.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Skeleton className="h-8 w-48 bg-zinc-500 rounded-md" />
            <div className="flex gap-3 w-full md:w-auto">
              <Skeleton className="h-10 w-32 bg-zinc-500 rounded-md" />
            </div>
          </div>
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
                {[...Array(9)].map((_, rowIndex) => (
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

          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
        <div className=" w-fit px-2 py-1 rounded-md">
          <p className="text-sm font-bold text-indigo-500 ">
            Total Applications:{" "}
            <span className="bg-red-500  text-white px-2 p-0.5 rounded-full">
              {admissions.length}
            </span>
          </p>
        </div>

        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>#No</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="print:hidden">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissions.map((application, index) => (
                <TableRow key={application._id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className=" p-2 rounded-full">
                        <Avatar className="h-9 w-9 rounded-full border-2 border-primary">
                          <AvatarImage
                            src={application.studentPhoto}
                            alt={application.fullName}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback className="bg-primary text-white">
                            {application.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="cursor-pointer hover:underline">
                        {application.fullName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>
                    {application.isVerified === true
                      ? "Approved"
                      : application.isVerified === false
                      ? "Pending"
                      : "Rejected"}
                  </TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="print:hidden">
                    <Link href={`admissions/${application._id}/details`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-zinc-800 hover:text-white"
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
      </div>
    </div>
  );
};

export default AdmissionsPage;
