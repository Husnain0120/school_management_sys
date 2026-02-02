'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminVerifiedBadge from '@/components/verify-badge/Admin-verified-badge';
import TeacherVerifiedBadge from '@/components/verify-badge/Teacher-verified-badge';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Globe,
  GraduationCap,
  Hash,
  Home,
  Mail,
  MapPin,
  Phone,
  Printer,
  School,
  Shield,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Custom SVG components for orange accents
const OrangePatternSVG = () => (
  <svg
    className="absolute inset-0 h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="orange-pattern"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="20" cy="20" r="1" fill="rgba(249, 115, 22, 0.1)" />
        <circle cx="40" cy="20" r="1" fill="rgba(249, 115, 22, 0.1)" />
        <circle cx="20" cy="40" r="1" fill="rgba(249, 115, 22, 0.1)" />
        <circle cx="40" cy="40" r="1" fill="rgba(249, 115, 22, 0.1)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#orange-pattern)" />
  </svg>
);

const OrangeWaveSVG = () => (
  <svg
    className="absolute bottom-0 left-0 right-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="rgba(249, 115, 22, 0.05)"
      fillOpacity="1"
      d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
);

const OrangeCircleDecoration = () => (
  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/5 blur-xl" />
);

// Add print styles (kept from original)
const printStyles = `
  @media print {
    * {
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      font-size: 10px !important;
      line-height: 1.2 !important;
    }

    @page {
      size: A4 portrait;
      margin: 0.3cm;
    }

    nav, header, footer, button, .no-print {
      display: none !important;
    }

    body, html {
      background: white !important;
      width: 100% !important;
      height: auto !important;
      overflow: visible !important;
    }

    .min-h-screen {
      min-height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    .max-w-7xl {
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    /* Additional print optimizations */
    .bg-gradient-to-br {
      background: white !important;
    }

    .shadow-xl, .shadow-lg {
      box-shadow: none !important;
      border: 1px solid #eee !important;
    }

    .bg-black, .bg-orange-500, .bg-gradient-to-r {
      background: #f5f5f5 !important;
      -webkit-print-color-adjust: exact;
    }

    .text-white {
      color: black !important;
    }
  }
`;

export default function EnhancedProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [downloading, setDownloading] = useState(false);

  /**
   * Handle print functionality with optimized styles
   */
  const handlePrintProfile = () => {
    const style = document.createElement('style');
    style.innerHTML = printStyles;
    document.head.appendChild(style);

    setTimeout(() => {
      window.print();
      setTimeout(() => document.head.removeChild(style), 1000);
    }, 100);
  };

  /**
   * Download single document
   */
  const downloadSingleDocument = async (url, filename) => {
    try {
      if (!url || url.includes('placeholder')) {
        console.warn(`Document ${filename} not available`);
        return null;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to download ${filename}`);
      return await response.blob();
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
      return null;
    }
  };

  /**
   * Download all documents as zip
   */
  const handleDownloadDocuments = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const documents = [
        {
          url: profileData.studentPhoto,
          filename: 'student-photo.jpg',
          label: 'Student Photo',
        },
        {
          url: profileData.idProof,
          filename: 'id-proof.jpg',
          label: 'ID Proof',
        },
        {
          url: profileData.birthCertificate,
          filename: 'birth-certificate.jpg',
          label: 'Birth Certificate',
        },
      ];

      for (const doc of documents) {
        if (!doc.url || doc.url.includes('placeholder')) continue;
        const blob = await downloadSingleDocument(doc.url, doc.filename);
        if (blob) zip.file(doc.filename, blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipFilename = `${profileData.fullName.replace(/\s+/g, '-').toLowerCase()}-documents.zip`;
      saveAs(zipBlob, zipFilename);
    } catch (error) {
      console.error('Error downloading documents:', error);
      alert('Failed to download documents. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/user-profile`);
        if (res?.data?.data) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to mock data for demonstration
        setProfile({
          fullName: 'Alex Johnson',
          fatherName: 'Michael Johnson',
          gender: 'male',
          dateOfBirth: '2000-05-15',
          email: 'alex.johnson@example.com',
          role: 'student',
          portalId: 'STU-2023-78945',
          admissionClass: 'Computer Science',
          currentAddress: '123 University Ave, New York, NY 10001',
          permanentAddress: '456 Main Street, Los Angeles, CA 90001',
          city: 'New York',
          zipCode: '10001',
          studentPhoto: '/placeholder.svg?height=200&width=200',
          idProof: '/placeholder.svg?height=200&width=200',
          birthCertificate: '/placeholder.svg?height=200&width=200',
          createdAt: '2022-09-01T00:00:00.000Z',
          isVerified: true,
          phoneNumber: '+1 (555) 123-4567',
          semester: '6th Semester',
          gpa: '3.85',
          department: 'School of Computer Science',
          enrollmentYear: '2020',
          expectedGraduation: '2024',
          emergencyContact: 'Michael Johnson (+1 555-987-6543)',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with black/orange gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-800 mb-8 shadow-2xl"
        >
          <OrangePatternSVG />
          <OrangeWaveSVG />
          <OrangeCircleDecoration />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar with orange accent */}
              <div className="relative">
                <div className="rounded-full p-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 shadow-lg">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarImage
                      src={profileData.studentPhoto || '/placeholder.svg'}
                      alt={profileData.fullName}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-3xl">
                      {profileData.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {profileData.isVerified && (
                  <Badge className="absolute -bottom-2 -right-2 bg-orange-500 border-2 border-white px-3 py-1 shadow-md">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>

              {/* Profile info */}
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {profileData.fullName}
                  </h1>
                  {profileData.role === 'admin' ? (
                    <AdminVerifiedBadge size={28} className="mt-1" />
                  ) : profileData.role === 'teacher' ? (
                    <TeacherVerifiedBadge size={28} className="mt-1" />
                  ) : null}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20 px-3 py-1"
                  >
                    <School className="h-3 w-3 mr-1" />
                    {profileData.role.charAt(0).toUpperCase() +
                      profileData.role.slice(1)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20 px-3 py-1"
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {profileData.portalId}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20 px-3 py-1"
                  >
                    <Award className="h-3 w-3 mr-1" />
                    GPA: {profileData.gpa}
                  </Badge>
                </div>

                <div className="text-gray-300 space-y-2">
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-orange-300" />
                      {profileData.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-orange-300" />
                      {profileData.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-orange-200">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {profileData.department} • {profileData.semester}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white border border-white/20">
                  <p className="text-sm font-medium text-orange-200">
                    Enrollment
                  </p>
                  <p className="text-lg font-bold flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {profileData.enrollmentYear}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white border border-white/20">
                  <p className="text-sm font-medium text-orange-200">
                    Graduation
                  </p>
                  <p className="text-lg font-bold">
                    {profileData.expectedGraduation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl rounded-2xl p-1 bg-white shadow-md border">
                <TabsTrigger
                  value="overview"
                  className="rounded-xl data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="personal"
                  className="rounded-xl data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="rounded-xl data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="rounded-xl data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Personal Info Card */}
                <Card className="lg:col-span-2 border-0 shadow-lg rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="h-5 w-5 text-orange-500" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <InfoItem
                          label="Full Name"
                          value={profileData.fullName}
                          icon={<User className="h-4 w-4 text-orange-400" />}
                        />
                        <InfoItem
                          label="Father's Name"
                          value={profileData.fatherName}
                        />
                        <InfoItem
                          label="Gender"
                          value={
                            profileData.gender.charAt(0).toUpperCase() +
                            profileData.gender.slice(1)
                          }
                        />
                      </div>
                      <div className="space-y-4">
                        <InfoItem
                          label="Date of Birth"
                          value={new Date(
                            profileData.dateOfBirth
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                          icon={
                            <Calendar className="h-4 w-4 text-orange-400" />
                          }
                        />
                        <InfoItem
                          label="Email"
                          value={profileData.email}
                          icon={<Mail className="h-4 w-4 text-orange-400" />}
                        />
                        <InfoItem
                          label="Phone"
                          value={profileData.phoneNumber}
                          icon={<Phone className="h-4 w-4 text-orange-400" />}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Info Card */}
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="h-1 bg-gradient-to-r from-gray-800 to-black"></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <GraduationCap className="h-5 w-5 text-gray-800" />
                      Academic Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <InfoItem
                        label="Program"
                        value={profileData.admissionClass}
                        icon={<BookOpen className="h-4 w-4 text-gray-600" />}
                      />
                      <InfoItem
                        label="Department"
                        value={profileData.department}
                        icon={<Building className="h-4 w-4 text-gray-600" />}
                      />
                      <InfoItem
                        label="Semester"
                        value={profileData.semester}
                        icon={<Clock className="h-4 w-4 text-gray-600" />}
                      />
                      <div className="pt-4 border-t">
                        <InfoItem
                          label="Emergency Contact"
                          value={profileData.emergencyContact}
                          icon={<Users className="h-4 w-4 text-orange-500" />}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Card */}
                <Card className="lg:col-span-3 border-0 shadow-lg rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-gray-800"></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <Home className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="font-medium">Current Address</h3>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border">
                          <p className="text-gray-700 whitespace-pre-line">
                            {profileData.currentAddress}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Globe className="h-4 w-4 text-gray-600" />
                          </div>
                          <h3 className="font-medium">Permanent Address</h3>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border">
                          <p className="text-gray-700 whitespace-pre-line">
                            {profileData.permanentAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Personal Tab (Detailed View) */}
            <TabsContent value="personal">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-gray-800"></div>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Detailed Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h3 className="font-medium text-orange-700 mb-2">
                          Personal Details
                        </h3>
                        <InfoItem
                          label="Full Name"
                          value={profileData.fullName}
                        />
                        <InfoItem
                          label="Father's Name"
                          value={profileData.fatherName}
                        />
                        <InfoItem label="Gender" value={profileData.gender} />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Contact Information
                        </h3>
                        <InfoItem label="Email" value={profileData.email} />
                        <InfoItem
                          label="Phone"
                          value={profileData.phoneNumber}
                        />
                        <InfoItem
                          label="Emergency Contact"
                          value={profileData.emergencyContact}
                        />
                      </div>
                      <div className="bg-black/5 p-4 rounded-xl border">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Academic Details
                        </h3>
                        <InfoItem
                          label="Program"
                          value={profileData.admissionClass}
                        />
                        <InfoItem
                          label="Semester"
                          value={profileData.semester}
                        />
                        <InfoItem label="GPA" value={profileData.gpa} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-gray-800"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <FileText className="h-5 w-5 text-orange-500" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <DocumentCard
                        title="Student Photo"
                        image={profileData.studentPhoto}
                        alt="Student Photo"
                        color="orange"
                      />
                      <DocumentCard
                        title="ID Proof"
                        image={profileData.idProof}
                        alt="ID Proof"
                        color="black"
                      />
                      <DocumentCard
                        title="Birth Certificate"
                        image={profileData.birthCertificate}
                        alt="Birth Certificate"
                        color="gray"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-gray-800"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="h-5 w-5 text-orange-500" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <Clock className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Account Created</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                profileData.createdAt
                              ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Account Status</h3>
                            <Badge
                              className={`mt-2 ${profileData.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}
                            >
                              {profileData.isVerified ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-black/5 to-white p-6 rounded-xl border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-black p-2 rounded-full">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">User Role</h3>
                            <Badge
                              variant="outline"
                              className="mt-2 capitalize border-black text-black"
                            >
                              {profileData.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link href="profile/edit" className="no-print">
            <Button
              variant="outline"
              className="px-6 rounded-full border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-300"
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>

          <Button
            variant="outline"
            className="px-6 rounded-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center gap-2 no-print"
            onClick={handleDownloadDocuments}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-orange-600 rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download Documents
              </>
            )}
          </Button>

          <Button
            className="px-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 no-print"
            onClick={handlePrintProfile}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Profile
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Loading Skeleton Component
 */
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="w-full h-64 rounded-3xl bg-gradient-to-r from-gray-200 to-gray-300 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Skeleton className="h-24 w-24 rounded-full bg-gray-300" />
          <Skeleton className="h-6 w-48 mt-4 bg-gray-300" />
          <Skeleton className="h-4 w-32 mt-2 bg-gray-300" />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Skeleton className="h-10 w-96 rounded-full bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-64 rounded-3xl bg-gray-200" />
        <Skeleton className="h-64 rounded-3xl bg-gray-200" />
        <Skeleton className="lg:col-span-3 h-48 rounded-3xl bg-gray-200" />
      </div>
    </div>
  </div>
);

/**
 * Reusable Info Item Component
 */
const InfoItem = ({ label, value, icon }) => (
  <div className="space-y-1 group">
    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
      {icon}
      {label}
    </p>
    <p className="text-gray-800 font-medium group-hover:text-orange-600 transition-colors">
      {value}
    </p>
  </div>
);

/**
 * Document Card Component with hover effects
 */
const DocumentCard = ({ title, image, alt, color = 'orange' }) => {
  const colorClasses = {
    orange: 'border-orange-200 hover:border-orange-300',
    black: 'border-gray-300 hover:border-gray-400',
    gray: 'border-gray-200 hover:border-gray-300',
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 ${colorClasses[color]} group`}
    >
      <div className="aspect-w-3 aspect-h-4 relative">
        <img
          src={image || '/placeholder.svg'}
          alt={alt}
          className="object-contain w-full h-48 group-hover:scale-105 transition-transform duration-300 p-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white hover:bg-white/90"
          >
            <Download className="h-3 w-3 mr-1" /> View
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-center text-gray-800">{title}</h3>
      </div>
    </div>
  );
};
