'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import axios from 'axios';
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  Download,
  Printer,
  X,
  XCircle,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ApplicantPage() {
  const router = useRouter();
  const { aid } = useParams();

  const [applicantData, setApplicantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // Fetch applicant data
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/admin/admission-applications/admission-details/${aid}`
        );
        if (res?.data?.details) {
          setApplicantData(res?.data?.details);
        } else {
          setError('No applicant data found');
        }
      } catch (error) {
        console.error('Error fetching applicant data:', error);
        setError('Failed to load applicant data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [aid]);

  // Handle verify applicant
  const handleVerifyApplicant = async () => {
    try {
      setIsVerifying(true);
      const verifyResponse = await axios.put(
        `/api/admin/admission-applications/admission-details/${aid}/verfiy-applicant`
      );

      // Refresh data
      const res = await axios.get(
        `/api/admin/admission-applications/admission-details/${aid}`
      );
      if (res?.data?.details) {
        setApplicantData(res?.data?.details);
      }
      toast.success(
        verifyResponse?.data?.message ||
          'Verification status updated successfully'
      );
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to update verification status');
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle reject/unreject applicant
  const handleRejectApplicant = async () => {
    try {
      setIsRejecting(true);
      const response = await axios.put(
        `/api/admin/admission-applications/admission-details/${aid}/rejectingAdmission`
      );

      // Refresh data
      const res = await axios.get(
        `/api/admin/admission-applications/admission-details/${aid}`
      );
      if (res?.data?.details) {
        setApplicantData(res?.data?.details);
      }

      toast.success(response?.data?.message || 'Status updated successfully');
    } catch (error) {
      console.error('Reject error:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setIsRejecting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = dateString => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString.$date || dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  if (isLoading || !applicantData) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  // Determine status colors and icons
  const getStatusConfig = (status, isVerified) => {
    switch (status) {
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-4 w-4 mr-2" />,
          text: 'Approved',
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <X className="h-4 w-4 mr-2" />,
          text: 'Rejected',
        };
      case 'pending':
        return isVerified
          ? {
              color: 'bg-orange-100 text-orange-800 border-orange-200',
              icon: <BadgeCheck className="h-4 w-4 mr-2" />,
              text: 'Verified (Pending)',
            }
          : {
              color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
              icon: <AlertTriangle className="h-4 w-4 mr-2" />,
              text: 'Pending Verification',
            };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertTriangle className="h-4 w-4 mr-2" />,
          text: status || 'Unknown',
        };
    }
  };

  const statusConfig = getStatusConfig(
    applicantData.status,
    applicantData.isVerified
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 print:bg-white print:p-0">
      {/* Global print styles */}
      <style jsx global>{`
        @media print {
          nav,
          aside,
          .sidebar,
          .navbar,
          header,
          footer,
          .no-print {
            display: none !important;
          }

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

          .shadow-sm,
          .shadow-md,
          .shadow-lg,
          .shadow-xl {
            box-shadow: none !important;
          }

          .print-break-avoid {
            page-break-inside: avoid;
          }

          a {
            color: inherit !important;
            text-decoration: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6 print:max-w-full print:space-y-4 print:mx-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-10 w-10 rounded-lg border-gray-300 hover:bg-gray-100 transition-colors hover:border-orange-500"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Applicant Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Manage admission application details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrint}
                    className="h-10 w-10 rounded-lg border-gray-300 hover:bg-gray-100 transition-colors hover:border-orange-500"
                  >
                    <Printer className="h-4 w-4 text-gray-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Print details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div
              className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold border ${statusConfig.color}`}
            >
              {statusConfig.icon}
              {statusConfig.text}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      <img
                        src={
                          applicantData.studentPhoto ||
                          '/placeholder.svg?height=128&width=128'
                        }
                        alt={applicantData.fullName || 'Student'}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-2 -right-2 h-10 w-10 rounded-full border-4 border-white ${statusConfig.color} flex items-center justify-center`}
                    >
                      {applicantData.status === 'approved' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : applicantData.status === 'rejected' ? (
                        <X className="h-5 w-5" />
                      ) : applicantData.isVerified ? (
                        <BadgeCheck className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {applicantData.fullName}
                    </h2>
                    <p className="text-gray-600">{applicantData.fatherName}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-600 text-sm">Portal ID:</span>
                      <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">
                        {applicantData.portalId}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full space-y-3 pt-4">
                    {applicantData.admissionClass !== 'No class yet' && (
                      <>
                        <Button
                          onClick={handleVerifyApplicant}
                          disabled={isVerifying}
                          variant={
                            applicantData.isVerified ? 'outline' : 'default'
                          }
                          className={`w-full h-11 ${applicantData.isVerified ? 'border-orange-600 text-orange-600 hover:bg-orange-50' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}
                        >
                          {isVerifying
                            ? 'Processing...'
                            : applicantData.isVerified
                              ? 'Unverify Applicant'
                              : 'Verify Applicant'}
                        </Button>

                        <Button
                          onClick={handleRejectApplicant}
                          disabled={isRejecting}
                          variant={
                            applicantData.status === 'rejected'
                              ? 'default'
                              : 'destructive'
                          }
                          className={`w-full h-11 ${applicantData.status === 'rejected' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        >
                          {isRejecting
                            ? 'Processing...'
                            : applicantData.status === 'rejected'
                              ? 'Unreject Applicant'
                              : 'Reject Applicant'}
                        </Button>
                      </>
                    )}

                    {applicantData.admissionClass === 'No class yet' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 font-medium text-sm">
                          No class assigned for verification
                        </p>
                        <p className="text-yellow-700 text-sm mt-1">
                          User not eligible for admission
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Quick Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="text-gray-900 font-medium truncate">
                    {applicantData.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </Label>
                  <div className="text-gray-900 font-medium">
                    {formatDate(applicantData.dateOfBirth)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Gender
                  </Label>
                  <div className="text-gray-900 font-medium">
                    {applicantData.gender}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Admission Class
                  </Label>
                  <div className="text-gray-900 font-medium">
                    {applicantData.admissionClass}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal & Academic Info Card */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Application Details
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Applied on:{' '}
                    {new Date(applicantData.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                        <div className="h-6 w-1 bg-orange-500 rounded-full"></div>
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">
                            Father's Name
                          </Label>
                          <Input
                            className="bg-gray-50 border-gray-300 h-10"
                            value={applicantData.fatherName || ''}
                            readOnly
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">
                            Email Address
                          </Label>
                          <Input
                            className="bg-gray-50 border-gray-300 h-10"
                            value={applicantData.email || ''}
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                              Gender
                            </Label>
                            <Input
                              className="bg-gray-50 border-gray-300 h-10"
                              value={applicantData.gender || ''}
                              readOnly
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                              Date of Birth
                            </Label>
                            <Input
                              type="date"
                              className="bg-gray-50 border-gray-300 h-10"
                              value={formatDate(applicantData.dateOfBirth)}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                        <div className="h-6 w-1 bg-orange-500 rounded-full"></div>
                        Academic Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">
                            Admission Class
                          </Label>
                          <Input
                            className="bg-gray-50 border-gray-300 h-10"
                            value={applicantData.admissionClass || ''}
                            readOnly
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">
                            Previous School
                          </Label>
                          <Input
                            className="bg-gray-50 border-gray-300 h-10"
                            value={applicantData.previousSchool || 'N/A'}
                            readOnly
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">
                            Role
                          </Label>
                          <Input
                            className="bg-gray-50 border-gray-300 h-10"
                            value={applicantData.role || ''}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information Card */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">
                      City
                    </Label>
                    <Input
                      className="bg-gray-50 border-gray-300 h-10"
                      value={applicantData.city || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">
                      Zip Code
                    </Label>
                    <Input
                      className="bg-gray-50 border-gray-300 h-10"
                      value={applicantData.zipCode || ''}
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">
                      Current Address
                    </Label>
                    <Textarea
                      className="min-h-[100px] bg-gray-50 border-gray-300"
                      value={applicantData.currentAddress || ''}
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">
                      Permanent Address
                    </Label>
                    <Textarea
                      className="min-h-[100px] bg-gray-50 border-gray-300"
                      value={applicantData.permanentAddress || ''}
                      readOnly
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Card - Hidden when printing */}
            <Card className="border border-gray-200 shadow-sm bg-white print:hidden">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* ID Proof */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-semibold text-gray-900">
                        ID Proof
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-2 border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          window.open(applicantData.idProof, '_blank')
                        }
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm">View</span>
                      </Button>
                    </div>
                    <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={
                          applicantData.idProof ||
                          '/placeholder.svg?height=300&width=400'
                        }
                        alt="ID Proof"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>

                  {/* Birth Certificate */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-semibold text-gray-900">
                        Birth Certificate
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-2 border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          window.open(applicantData.birthCertificate, '_blank')
                        }
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm">View</span>
                      </Button>
                    </div>
                    <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={
                          applicantData.birthCertificate ||
                          '/placeholder.svg?height=300&width=400'
                        }
                        alt="Birth Certificate"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200 print:hidden">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="h-11 px-6 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back to List
          </Button>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="h-11 px-6 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
            <div>
              <Skeleton className="h-8 w-64 mb-2 bg-gray-200" />
              <Skeleton className="h-4 w-48 bg-gray-200" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
            <Skeleton className="h-10 w-32 rounded-lg bg-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-96 w-full rounded-lg bg-gray-200" />
            <Skeleton className="h-64 w-full rounded-lg bg-gray-200" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-lg bg-gray-200" />
            <Skeleton className="h-64 w-full rounded-lg bg-gray-200" />
            <Skeleton className="h-80 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-red-600 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-y-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full h-11 border-gray-300"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
