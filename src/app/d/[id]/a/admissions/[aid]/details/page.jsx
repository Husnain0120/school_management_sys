'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import axios from 'axios';
import {
  ArrowLeft,
  BadgeCheck,
  Download,
  Printer,
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
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVerifyApplicant = async () => {
    try {
      setIsDisabled(true);
      const verifyResponse = await axios.put(
        `/api/admin/admission-applications/admission-details/${aid}/verfiy-applicant`
      );
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
      setIsDisabled(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 print:bg-white print:p-0">
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:flex print:justify-between print:items-start print:py-4 print:border-b print:border-gray-300 print:mb-4">
        <div className="print:block print:w-24 print:h-24 print:border print:border-gray-300 print:mr-4 print:flex-shrink-0 print:bg-gray-50 print:overflow-hidden">
          <img
            src={applicantData.studentPhoto || '/placeholder.svg'}
            alt={applicantData.fullName || 'Student'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Applicant Details
          </h1>
          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
            <div>
              <p className="mb-1">
                <span className="font-semibold text-gray-700">Name:</span>{' '}
                <span className="text-gray-900">{applicantData.fullName}</span>
              </p>
              <p className="mb-1">
                <span className="font-semibold text-gray-700">Father:</span>{' '}
                <span className="text-gray-900">
                  {applicantData.fatherName}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">DOB:</span>{' '}
                <span className="text-gray-900">
                  {formatDate(applicantData.dateOfBirth)}
                </span>
              </p>
            </div>
            <div>
              <p className="mb-1">
                <span className="font-semibold text-gray-700">Portal ID:</span>{' '}
                <span className="text-gray-900">{applicantData.portalId}</span>
              </p>
              <p className="mb-1">
                <span className="font-semibold text-gray-700">Class:</span>{' '}
                <span className="text-gray-900">
                  {applicantData.admissionClass}
                </span>
              </p>
              <p
                className={`font-semibold ${applicantData.isVerified ? 'text-green-600' : 'text-amber-600'}`}
              >
                <span className="text-gray-700">Status:</span>{' '}
                {applicantData.isVerified ? 'Verified' : 'Pending'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global print styles */}
      <style jsx global>{`
        @media print {
          nav,
          aside,
          .sidebar,
          .navbar,
          header,
          footer {
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

      <div className="max-w-7xl mx-auto space-y-8 print:max-w-full print:space-y-4 print:mx-0 print:mt-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-10 w-10 rounded-lg border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Applicant Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Student information and documents
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
                    className="h-10 w-10 rounded-lg border-gray-300 hover:bg-gray-50 transition-colors"
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
              className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold ${
                applicantData.isVerified
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {applicantData.isVerified ? (
                <>
                  <BadgeCheck className="h-4 w-4 mr-2" />
                  Verified
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Pending Verification
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="border border-gray-200 shadow-sm print:shadow-none print:border-0 print-break-avoid">
          <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 print:hidden">
              <div className="relative">
                <div className="h-32 w-32 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src={
                      applicantData.studentPhoto ||
                      '/placeholder.svg?height=128&width=128'
                    }
                    alt={applicantData.fullName || 'Student'}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {applicantData.fullName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Portal ID:</span>
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-md text-sm">
                      {applicantData.portalId}
                    </span>
                  </div>
                </div>
                {/* // add logic if class not exist */}
                {applicantData.admissionClass === 'No class yet' ? (
                  <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p class="text-yellow-800 font-medium">
                      No class For verification
                    </p>
                    <p class="text-yellow-700">User not Allow For Admission</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-700">
                      Verification Status:
                    </div>

                    <Switch
                      id="verification-switch"
                      disabled={isDisabled}
                      checked={applicantData.isVerified || false}
                      onCheckedChange={handleVerifyApplicant}
                      className="data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-gray-300"
                    />
                    <span className="text-sm text-gray-600">
                      {applicantData.isVerified
                        ? 'Verified'
                        : 'Click to verify'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-2 gap-8 print:grid-cols-2 print:p-0 print:gap-6 print:mt-2">
            {/* Personal Information */}
            <div className="space-y-5 print:space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-7 w-1.5 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-900 print:text-lg">
                  Personal Information
                </h3>
              </div>
              <div className="space-y-4 print:space-y-3 print:text-sm">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                    Father's Name
                  </Label>
                  <Input
                    className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                    value={applicantData.fatherName || ''}
                    readOnly
                  />
                  <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                    {applicantData.fatherName || ''}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                    Email Address
                  </Label>
                  <Input
                    className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                    value={applicantData.email || ''}
                    readOnly
                  />
                  <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                    {applicantData.email || ''}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                      Gender
                    </Label>
                    <Input
                      className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                      value={applicantData.gender || ''}
                      readOnly
                    />
                    <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                      {applicantData.gender || ''}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                      value={formatDate(applicantData.dateOfBirth)}
                      readOnly
                    />
                    <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                      {formatDate(applicantData.dateOfBirth)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-5 print:space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-7 w-1.5 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-900 print:text-lg">
                  Academic Information
                </h3>
              </div>
              <div className="space-y-4 print:space-y-3 print:text-sm">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                    Admission Class
                  </Label>
                  <Input
                    className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                    type="text"
                    value={applicantData.admissionClass || ''}
                    readOnly
                  />
                  <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                    {applicantData.admissionClass || ''}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                    Previous School
                  </Label>
                  <Input
                    className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                    value={applicantData.previousSchool || 'N/A'}
                    readOnly
                  />
                  <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                    {applicantData.previousSchool || 'N/A'}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                    Role
                  </Label>
                  <Input
                    className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                    value={applicantData.role || ''}
                    readOnly
                  />
                  <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                    {applicantData.role || ''}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="border border-gray-200 shadow-sm print:shadow-none print:border-0 print:mt-2 print-break-avoid">
          <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6 print:py-2 print:px-0 print:border-b print:border-gray-300">
            <div className="flex items-center gap-3">
              <div className="h-7 w-1.5 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full print:hidden"></div>
              <CardTitle className="text-xl font-semibold text-gray-900 print:text-lg">
                Address Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6 print:grid-cols-2 print:p-0 print:gap-6 print:mt-2">
            <div className="print:text-sm">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                City
              </Label>
              <Input
                className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                value={applicantData.city || ''}
                readOnly
              />
              <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                {applicantData.city || ''}
              </div>
            </div>
            <div className="print:text-sm">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                Zip Code
              </Label>
              <Input
                className="focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 h-11 print:hidden"
                value={applicantData.zipCode || ''}
                readOnly
              />
              <div className="hidden print:block print:py-2 print:border-b print:border-gray-300">
                {applicantData.zipCode || ''}
              </div>
            </div>
            <div className="md:col-span-2 print:text-sm">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                Current Address
              </Label>
              <Textarea
                value={applicantData.currentAddress || ''}
                className="min-h-[120px] focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 print:hidden"
                readOnly
              />
              <div className="hidden print:block print:py-2 print:border-b print:border-gray-300 print:min-h-[60px]">
                {applicantData.currentAddress || ''}
              </div>
            </div>
            <div className="md:col-span-2 print:text-sm">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block print:font-medium">
                Permanent Address
              </Label>
              <Textarea
                value={applicantData.permanentAddress || ''}
                className="min-h-[120px] focus-visible:ring-2 focus-visible:ring-orange-500 bg-gray-50 border-gray-300 print:hidden"
                readOnly
              />
              <div className="hidden print:block print:py-2 print:border-b print:border-gray-300 print:min-h-[60px]">
                {applicantData.permanentAddress || ''}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Card - Hidden when printing */}
        <Card className="border border-gray-200 shadow-sm print:hidden">
          <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6">
            <div className="flex items-center gap-3">
              <div className="h-7 w-1.5 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full"></div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Documents
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold text-gray-900">
                  ID Proof
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-2 border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          window.open(applicantData.idProof, '_blank')
                        }
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm">View Document</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Open document in new tab</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="border border-gray-300 rounded-xl overflow-hidden bg-white p-1 shadow-inner">
                <img
                  src={
                    applicantData.idProof ||
                    '/placeholder.svg?height=300&width=400'
                  }
                  alt="ID Proof"
                  className="w-full h-auto object-contain max-h-72 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold text-gray-900">
                  Birth Certificate
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-2 border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          window.open(applicantData.birthCertificate, '_blank')
                        }
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm">View Document</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Open document in new tab</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="border border-gray-300 rounded-xl overflow-hidden bg-white p-1 shadow-inner">
                <img
                  src={
                    applicantData.birthCertificate ||
                    '/placeholder.svg?height=300&width=400'
                  }
                  alt="Birth Certificate"
                  className="w-full h-auto object-contain max-h-72 rounded-lg"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="flex justify-between w-full gap-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="h-11 px-6 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back to List
              </Button>
              <Button
                onClick={handlePrint}
                className="h-11 px-6 bg-orange-600 hover:bg-orange-700 text-white transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block print:mt-8 print:pt-6 print:border-t print:border-gray-300 print:text-sm print:text-center print:text-gray-700">
        <p>Printed on: {new Date().toLocaleString()}</p>
        <p className="mt-2 font-semibold">
          Official document - For institutional records only
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
            <div>
              <Skeleton className="h-8 w-72 mb-2 bg-gray-200" />
              <Skeleton className="h-4 w-56 bg-gray-200" />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
            <Skeleton className="h-10 w-40 rounded-lg bg-gray-200" />
          </div>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <Skeleton className="h-32 w-32 rounded-xl bg-gray-200" />
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64 bg-gray-200" />
                  <Skeleton className="h-6 w-48 bg-gray-200" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32 bg-gray-200" />
                  <Skeleton className="h-5 w-10 rounded-full bg-gray-200" />
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-1.5 rounded-full bg-gray-200" />
                <Skeleton className="h-6 w-48 bg-gray-200" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-11 w-full bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-1.5 rounded-full bg-gray-200" />
                <Skeleton className="h-6 w-48 bg-gray-200" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-11 w-full bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-1.5 rounded-full bg-gray-200" />
              <Skeleton className="h-6 w-56 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32 bg-gray-200" />
                <Skeleton className="h-11 w-full bg-gray-200" />
              </div>
            ))}
            {[1, 2].map(i => (
              <div key={i} className="space-y-2 md:col-span-2">
                <Skeleton className="h-4 w-40 bg-gray-200" />
                <Skeleton className="h-32 w-full bg-gray-200" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-1.5 rounded-full bg-gray-200" />
              <Skeleton className="h-6 w-40 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-32 bg-gray-200" />
                  <Skeleton className="h-9 w-36 bg-gray-200" />
                </div>
                <Skeleton className="h-72 w-full rounded-xl bg-gray-200" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="flex justify-between w-full gap-4">
              <Skeleton className="h-11 w-32 bg-gray-200" />
              <Skeleton className="h-11 w-40 bg-gray-200" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 py-6">
          <CardTitle className="text-red-600 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Error Loading Applicant Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white transition-colors"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
