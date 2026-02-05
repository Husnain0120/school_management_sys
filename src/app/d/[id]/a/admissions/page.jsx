'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AvatarFallback } from '@radix-ui/react-avatar';
import axios from 'axios';
import {
  AlertCircle,
  Download,
  FileText,
  Printer,
  RefreshCw,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AdmissionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  // Function to fetch applications
  const fetchApplications = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get(`/api/admin/admission-applications`);
      setAdmissions(res.data?.applications || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch admissions:', error);
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
    const printWindow = window.open('', '', 'width=1000,height=1000');
    printWindow.document.write(`
      <html>
        <head>
          <title>Admission Applications - Pending</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .title { color: #f97316; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Pending Admission Applications</h1>
            <p>Date: ${date.toDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>#No</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>Admission Class</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${admissions
                .filter(app => app.isVerified === false)
                .map(
                  (app, inx) => `
                <tr>
                  <td>#${inx + 1}</td>
                  <td>${app.fullName}</td>
                  <td>${app.email}</td>
                  <td>${app.admissionClass}</td>
                  <td>${new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>Pending</td>
                </tr>
              `
                )
                .join('')}
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

  // Filter applications based on search term and pending status
  const filteredAdmissions = admissions.filter(app => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.admissionClass.toLowerCase().includes(searchTerm.toLowerCase());

    // Only show pending applications
    const isPending = app.isVerified === false;

    return matchesSearch && isPending;
  });

  // Get count for pending badge
  const pendingCount = admissions.filter(
    app => app.isVerified === false
  ).length;

  // Render loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Skeleton className="h-8 w-48 bg-gray-300 rounded-md" />
              <div className="flex gap-3 w-full md:w-auto">
                <Skeleton className="h-10 w-32 bg-gray-300 rounded-md" />
                <Skeleton className="h-10 w-32 bg-gray-300 rounded-md" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-3 mb-6">
              <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
              <Skeleton className="h-10 w-32 bg-gray-300 rounded-md" />
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    {[...Array(5)].map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-6 w-24 bg-gray-300 rounded-md" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(5)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="flex items-center space-x-2">
                            {cellIndex === 1 ? (
                              <>
                                <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                                <Skeleton className="h-4 w-32 bg-gray-300 rounded-md" />
                              </>
                            ) : cellIndex === 3 ? (
                              <Skeleton className="h-6 w-20 bg-gray-300 rounded-full" />
                            ) : (
                              <Skeleton className="h-4 w-24 bg-gray-300 rounded-md" />
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
  if (admissions.filter(app => app.isVerified === false).length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-black">
                  Pending Admissions
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Student admission requests waiting for review
                </CardDescription>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="gap-2 bg-white hover:bg-orange-50 border-gray-300 text-black"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
                />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-12 w-12 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                No Pending Applications
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                There are currently no pending admission applications. All
                applications have been processed.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  className="gap-2 border-gray-300 text-black hover:bg-orange-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
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
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-black">
                  Pending Admissions
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Student admission requests waiting for review
                </CardDescription>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="gap-2 bg-white hover:bg-orange-50 border-gray-300 text-black"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
                  />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="gap-2 bg-white hover:bg-orange-50 border-gray-300 text-black"
                >
                  <Printer className="h-4 w-4" /> Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Badge className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                Pending Applications ({pendingCount})
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  placeholder="Search by name, email, or class..."
                  className="pl-10 bg-white border-gray-300 text-black"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  const searchTerm = document.querySelector('input').value;
                  // Search functionality already handled by filter
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                No Matching Applications
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                No pending applications match your search criteria. Try a
                different search term.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchTerm('')}
                className="border-gray-300 text-black hover:bg-orange-50"
              >
                Clear Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main render with applications
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="border border-gray-200 shadow-md overflow-hidden">
        <CardHeader className="bg-white border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-black">
                Pending Admissions
              </CardTitle>
              <CardDescription className="text-gray-600">
                Student admission requests waiting for review
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="gap-2 bg-white hover:bg-orange-50 border-gray-300 text-black transition-all duration-200"
                disabled={refreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
                />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="gap-2 bg-white hover:bg-orange-50 border-gray-300 text-black transition-all duration-200"
              >
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button
                variant="default"
                className="gap-2 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
              >
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Badge className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
              Pending Applications ({pendingCount})
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                placeholder="Search by name, email, or class..."
                className="pl-10 bg-white border-gray-300 text-black"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                const searchTerm = document.querySelector('input').value;
                // Search functionality already handled by filter
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-semibold text-black">
                    #No
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Applicant
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Admission Class
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmissions.map((application, index) => (
                  <TableRow
                    key={application._id}
                    className="hover:bg-orange-50 transition-colors duration-150 border-b border-gray-100"
                  >
                    <TableCell className="font-medium text-black">
                      #{index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-full border-2 border-gray-300 overflow-hidden">
                          <AvatarImage
                            src={application.studentPhoto || '/placeholder.svg'}
                            alt={application.fullName}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                            {application.fullName
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-black">
                            {application.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {application.fatherName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {application.email}
                    </TableCell>
                    <TableCell className="text-black">
                      {application.admissionClass}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`admissions/${application._id}/details`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors duration-200"
                        >
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <p>
              Showing {filteredAdmissions.length} of {pendingCount} pending
              applications
            </p>
            <p className="text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionsPage;
