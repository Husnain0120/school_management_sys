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
  IdCard,
  Mail,
  MapPin,
  Phone,
  Printer,
  School,
  Shield,
  University,
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

// University Logo SVG (Replace with your actual logo)
const UniversityLogo = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="10"
      y="30"
      width="80"
      height="40"
      rx="5"
      className="fill-blue-800"
    />
    <rect
      x="20"
      y="20"
      width="60"
      height="10"
      rx="5"
      className="fill-blue-600"
    />
    <circle cx="50" cy="50" r="15" className="fill-white" />
    <path d="M45 45 L55 50 L45 55 Z" className="fill-blue-800" />
    <text
      x="50"
      y="85"
      textAnchor="middle"
      className="text-xs font-bold fill-white"
    >
      LNS LMS
    </text>
  </svg>
);

export default function EnhancedProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [downloading, setDownloading] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  /**
   * Generate e-ID Card Data
   */
  const generateEIDCardData = () => {
    if (!profileData) return null;

    return {
      studentName: profileData.fullName,
      program:
        profileData.admissionClass ||
        'Bachelor of Business & Information Technology',
      studentId: profileData.portalId || 'bc230212199',
      cardType: 'STUDENT CARD',
      validUntil: 'May 2027',
      universityName: 'EduManage System',
      universityType: 'Federal Government University',
      note1: 'The Student must possess this card while in university campus.',
      note2: 'It is obligatory to produce this card on demand.',
      signatureTitle: 'Registrar',
    };
  };

  /**
   * Handle e-ID Card Print
   */
  const handlePrintEIDCard = () => {
    const printWindow = window.open('', '_blank');
    const cardData = generateEIDCardData();

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>e-ID Card - ${cardData.studentName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            background: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }

          .id-card-container {
            max-width: 400px;
            width: 100%;
          }

          .id-card {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 20px;
            padding: 30px;
            color: white;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .id-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
            z-index: 1;
          }

          .university-info {
            text-align: right;
          }

          .university-name {
            font-size: 14px;
            font-weight: 600;
            color: #f97316;
            margin-bottom: 4px;
          }

          .university-type {
            font-size: 11px;
            color: #cbd5e1;
          }

          .card-body {
            position: relative;
            z-index: 1;
          }

          .student-photo-section {
            display: flex;
            align-items: center;
            gap: 25px;
            margin-bottom: 30px;
          }

          .student-photo {
            width: 120px;
            height: 150px;
            border-radius: 12px;
            overflow: hidden;
            border: 3px solid #f97316;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .student-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .student-info {
            flex: 1;
          }

          .student-name {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
            color: white;
          }

          .program {
            font-size: 14px;
            color: #cbd5e1;
            margin-bottom: 5px;
          }

          .student-id {
            font-size: 16px;
            font-weight: 600;
            color: #f97316;
            margin-bottom: 20px;
          }

          .card-type {
            background: #f97316;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            display: inline-block;
          }

          .card-footer {
            margin-top: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
            position: relative;
            z-index: 1;
          }

          .notes {
            font-size: 11px;
            color: #94a3b8;
            margin-bottom: 15px;
            line-height: 1.5;
          }

          .validity-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }

          .valid-until {
            font-size: 12px;
            color: #cbd5e1;
          }

          .valid-until strong {
            color: #f97316;
            font-size: 14px;
          }

          .signature {
            text-align: center;
          }

          .signature-line {
            width: 120px;
            height: 1px;
            background: white;
            margin: 0 auto 5px;
          }

          .signature-title {
            font-size: 11px;
            color: #94a3b8;
          }

          .print-button {
            margin-top: 30px;
            text-align: center;
          }

          .print-btn {
            background: #f97316;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
          }

          .print-btn:hover {
            background: #ea580c;
          }

          @media print {
            body {
              background: white;
              padding: 0;
            }

            .id-card {
              box-shadow: none;
              border: 1px solid #000;
            }

            .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="id-card-container">
          <div class="id-card">
            <div class="card-header">
              <div class="logo">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
                    <br/>LMS
                  </div>
                  <div>
                    <div style="font-size: 12px; font-weight: bold; color: #f97316;">LMS Learning</div>
                    <div style="font-size: 10px; color: #cbd5e1;">Management System</div>
                  </div>
                </div>
              </div>
              <div class="university-info">
                <div class="university-name">${cardData.universityName}</div>
                <div class="university-type">${cardData.universityType}</div>
              </div>
            </div>

            <div class="card-body">
              <div class="student-photo-section">
                <div class="student-photo">
                  <img src="${profileData.studentPhoto || '/placeholder.svg'}" alt="${cardData.studentName}" />
                </div>
                <div class="student-info">
                  <div class="student-name">${cardData.studentName}</div>
                  <div class="program">${cardData.program}</div>
                  <div class="student-id">${cardData.studentId}</div>
                  <div class="card-type">${cardData.cardType}</div>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="notes">
                <div>${cardData.note1}</div>
                <div>${cardData.note2}</div>
              </div>

              <div class="validity-section">
                <div class="valid-until">
                  Valid Upto: <strong>${cardData.validUntil}</strong>
                </div>
                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">${cardData.signatureTitle}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="print-button">
            <button class="print-btn" onclick="window.print()">🖨️ Print e-ID Card</button>
          </div>
        </div>

        <script>
          setTimeout(() => {
            window.print();
            setTimeout(() => window.close(), 1000);
          }, 500);
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  /**
   * Download e-ID Card as PNG/PDF
   */
  const handleDownloadEIDCard = async () => {
    // In a real application, you would use html2canvas or similar library
    // to convert the e-ID Card to an image
    alert(
      'e-ID Card download feature requires html2canvas library. Please use Print option for now.'
    );
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
          fullName: 'Muhammad Husnain Rashid',
          fatherName: 'Muhammad Rashid',
          gender: 'male',
          dateOfBirth: '2000-05-15',
          email: 'husnain@example.com',
          role: 'student',
          portalId: 'bc230212199',
          admissionClass: 'Bachelor of Business & Information Technology',
          currentAddress: '123 University Ave, Islamabad',
          permanentAddress: '456 Main Street, Lahore',
          city: 'Islamabad',
          zipCode: '44000',
          studentPhoto: '/placeholder.svg?height=200&width=200',
          idProof: '/placeholder.svg?height=200&width=200',
          birthCertificate: '/placeholder.svg?height=200&width=200',
          createdAt: '2022-09-01T00:00:00.000Z',
          isVerified: true,
          phoneNumber: '+92 300 1234567',
          semester: '6th Semester',
          gpa: '3.85',
          department: 'Faculty of Computer Science',
          enrollmentYear: '2023',
          expectedGraduation: '2027',
          emergencyContact: 'Father (+92 300 9876543)',
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

  const eidCardData = generateEIDCardData();

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
                    <IdCard className="h-3 w-3 mr-1" />
                    e-ID Card Available
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
                    <University className="h-4 w-4 mr-2" />
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

        {/* Navigation Tabs - Added e-ID Card Tab */}
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
              <TabsList className="grid grid-cols-5 w-full max-w-3xl rounded-2xl p-1 bg-white shadow-md border">
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
                  value="eidcard"
                  className="rounded-xl data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <IdCard className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">e-ID Card</span>
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

            {/* e-ID Card Tab - NEW SECTION */}
            <TabsContent value="eidcard">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-gray-800"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <IdCard className="h-5 w-5 text-orange-500" />
                      e-ID Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* e-ID Card Preview */}
                      <div className="relative">
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl border border-gray-800 relative overflow-hidden">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500 rounded-full -translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500 rounded-full translate-x-24 translate-y-24"></div>
                          </div>

                          <div className="relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-xs">
                                  LNS
                                  <br />
                                  LMS
                                </div>
                                <div>
                                  <div className="text-orange-400 text-sm font-bold">
                                    LNS Learning
                                  </div>
                                  <div className="text-gray-400 text-xs">
                                    Management System
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-orange-400 text-sm font-semibold">
                                  Virtual University of Pakistan
                                </div>
                                <div className="text-gray-400 text-xs">
                                  Federal Government University
                                </div>
                              </div>
                            </div>

                            {/* Student Info */}
                            <div className="flex gap-6 items-center mb-8">
                              <div className="w-32 h-40 rounded-xl overflow-hidden border-4 border-orange-500">
                                <img
                                  src={
                                    profileData.studentPhoto ||
                                    '/placeholder.svg'
                                  }
                                  alt={eidCardData.studentName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                  {eidCardData.studentName}
                                </h3>
                                <p className="text-gray-300 mb-1">
                                  {eidCardData.program}
                                </p>
                                <p className="text-orange-400 text-lg font-semibold mb-3">
                                  {eidCardData.studentId}
                                </p>
                                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block font-semibold">
                                  {eidCardData.cardType}
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-800 pt-6">
                              <div className="text-gray-400 text-xs mb-4 space-y-1">
                                <p>{eidCardData.note1}</p>
                                <p>{eidCardData.note2}</p>
                              </div>
                              <div className="flex justify-between items-end">
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    Valid Upto:
                                  </p>
                                  <p className="text-orange-400 font-semibold">
                                    {eidCardData.validUntil}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <div className="w-32 h-px bg-white mb-1"></div>
                                  <p className="text-gray-400 text-xs">
                                    {eidCardData.signatureTitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* e-ID Card Actions and Info */}
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100">
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            e-ID Card Status:{' '}
                            <span className="text-green-600">Active</span>
                          </h3>
                          <div className="space-y-3">
                            <InfoItem
                              label="Card Holder"
                              value={eidCardData.studentName}
                              icon={
                                <User className="h-4 w-4 text-orange-500" />
                              }
                            />
                            <InfoItem
                              label="Student ID"
                              value={eidCardData.studentId}
                              icon={
                                <Hash className="h-4 w-4 text-orange-500" />
                              }
                            />
                            <InfoItem
                              label="Program"
                              value={eidCardData.program}
                              icon={
                                <BookOpen className="h-4 w-4 text-orange-500" />
                              }
                            />
                            <InfoItem
                              label="Validity"
                              value={`Until ${eidCardData.validUntil}`}
                              icon={
                                <Calendar className="h-4 w-4 text-orange-500" />
                              }
                            />
                          </div>
                        </div>

                        {/* Action Buttons for e-ID Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Button
                            onClick={handlePrintEIDCard}
                            className="h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                          >
                            <Printer className="h-4 w-4 mr-2" />
                            Print e-ID Card
                          </Button>
                          <Button
                            onClick={handleDownloadEIDCard}
                            variant="outline"
                            className="h-12 rounded-xl border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Card
                          </Button>
                        </div>

                        {/* Important Notes */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Important Instructions
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                              Carry this card at all times within university
                              premises
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                              Present card upon request by university
                              authorities
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                              Report lost/stolen cards immediately to
                              administration
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                              Card is non-transferable and university property
                            </li>
                          </ul>
                        </div>
                      </div>
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
          <Link href="profile/edit">
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
            className="px-6 rounded-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center gap-2"
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
            onClick={handlePrintEIDCard}
            className="px-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <IdCard className="h-4 w-4" />
            Print e-ID Card
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
