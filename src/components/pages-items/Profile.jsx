'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  Hash,
  Home,
  Mail,
  MapPin,
  School,
  Shield,
  User,
  UserCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfessionalProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/user-profile`);
        if (res?.data?.data) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = name => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  // Check if user is admin or teacher
  const isAdminOrTeacher =
    profileData.role === 'admin' || profileData.role === 'teacher';

  // router

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-black to-gray-900 rounded-2xl shadow-lg mb-8 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-lg opacity-30"></div>
                  <Avatar className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 border-4 border-white shadow-lg relative">
                    <AvatarImage
                      src={profileData.studentPhoto}
                      alt={profileData.fullName}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl">
                      {getInitials(profileData.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  {profileData.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-orange-200">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      {profileData.fullName}
                    </h1>
                    <div className="flex justify-center sm:justify-start gap-2">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                        {profileData.role.charAt(0).toUpperCase() +
                          profileData.role.slice(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-black/20 text-white border-white/30 hover:bg-black/30"
                      >
                        {profileData.status.charAt(0).toUpperCase() +
                          profileData.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 text-orange-200">
                      <Hash className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {profileData.portalId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-200">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-200">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Joined {formatDate(profileData.createdAt)}
                      </span>
                    </div>
                  </div>

                  {!isAdminOrTeacher &&
                    profileData.admissionClass !== 'No class yet' && (
                      <div className="flex items-center gap-2 text-orange-200 mb-4">
                        <GraduationCap className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {profileData.admissionClass}
                        </span>
                      </div>
                    )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => {
                        router.push('profile/edit');
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 text-white border-white/20 cursor-pointer hover:bg-white/20 hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - All in One Page */}
        <div className="space-y-8">
          {/* Personal & Academic Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-5">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Full Name
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {profileData.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Father's Name
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {profileData.fatherName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Gender
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {profileData.gender.charAt(0).toUpperCase() +
                              profileData.gender.slice(1)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date of Birth
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {formatDate(profileData.dateOfBirth)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {profileData.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            Portal ID
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {profileData.portalId}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Address Information Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-black/5 rounded-lg">
                        <MapPin className="h-6 w-6 text-gray-900" />
                      </div>
                      <span>Address Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-orange-100 rounded-md">
                              <Home className="h-4 w-4 text-orange-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              Current Address
                            </p>
                          </div>
                          <div className="pl-8">
                            <p className="text-gray-700 mb-2">
                              {profileData.currentAddress}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {profileData.city}
                              </span>
                              <span>•</span>
                              <span>ZIP: {profileData.zipCode}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-black/5 rounded-md">
                              <Home className="h-4 w-4 text-gray-700" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              Permanent Address
                            </p>
                          </div>
                          <div className="pl-8">
                            <p className="text-gray-700">
                              {profileData.permanentAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Academic Information Card - Only show if not admin/teacher */}
              {!isAdminOrTeacher &&
                profileData.admissionClass !== 'No class yet' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border border-orange-200 shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <School className="h-6 w-6 text-orange-600" />
                          </div>
                          <span>Academic Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">
                              Admission Class
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              {profileData.admissionClass}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">
                              Enrollment Date
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatDate(profileData.createdAt)}
                            </p>
                          </div>
                          {profileData.previousSchool && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Previous School
                              </p>
                              <p className="text-lg font-semibold text-gray-900">
                                {profileData.previousSchool}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
            </div>

            {/* Right Column - Quick Info & Verification */}
            <div className="space-y-6">
              {/* Verification Status Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border border-orange-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Shield className="h-6 w-6 text-orange-600" />
                      </div>
                      <span>Verification Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-md">
                            <UserCheck className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            Identity
                          </span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          Verified
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-md">
                            <FileCheck className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            Documents
                          </span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          Verified
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-md">
                            <CheckCircle className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            Account
                          </span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          {profileData.isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Information Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border border-black/10 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-black/5 rounded-lg">
                        <Briefcase className="h-6 w-6 text-gray-900" />
                      </div>
                      <span>Account Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Role</p>
                        <p className="text-sm font-medium text-gray-900">
                          {profileData.role.charAt(0).toUpperCase() +
                            profileData.role.slice(1)}
                        </p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">
                          Account Status
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {profileData.status.charAt(0).toUpperCase() +
                            profileData.status.slice(1)}
                        </p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">
                          Member Since
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(profileData.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Documents Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <span>Document Verification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <DocumentCard
                    title="Student Photo"
                    image={profileData.studentPhoto}
                    alt="Student Photo"
                    date={formatDate(profileData.createdAt)}
                  />
                  <DocumentCard
                    title="ID Proof"
                    image={profileData.idProof}
                    alt="ID Proof"
                    date={formatDate(profileData.createdAt)}
                  />
                  <DocumentCard
                    title="Birth Certificate"
                    image={profileData.birthCertificate}
                    alt="Birth Certificate"
                    date={formatDate(profileData.createdAt)}
                  />
                </div>

                {/* Document Status */}
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Document Status Summary
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-md">
                          <User className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Student Photo
                        </span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-md">
                          <Shield className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          ID Proof
                        </span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-md">
                          <FileCheck className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Birth Certificate
                        </span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading Skeleton
 */
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Skeleton className="h-32 w-32 rounded-full bg-gray-700" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-8 w-64 bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-700" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 bg-gray-700" />
              <Skeleton className="h-6 w-24 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-56 w-full rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>

      <div className="mt-8">
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

/**
 * Document Card Component
 */
const DocumentCard = ({ title, image, alt, date }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:border-orange-300 transition-colors">
    <div className="relative h-48 bg-gray-100">
      <img src={image} alt={alt} className="object-contain w-full h-full p-4" />
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 bg-white/90 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
      >
        <Eye className="h-4 w-4 text-gray-700" />
      </Button>
    </div>
    <div className="p-4 border-t border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs">
          Verified
        </Badge>
      </div>
      <p className="text-xs text-gray-500">Uploaded: {date}</p>
    </div>
  </div>
);
