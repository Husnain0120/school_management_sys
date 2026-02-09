'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  Hash,
  Home,
  Mail,
  MapPin,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminVerifiedBadge from '../verify-badge/Admin-verified-badge';

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

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <DesktopProfile profileData={profileData} router={router} />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <MobileProfile profileData={profileData} router={router} />
        </div>
      </div>
    </div>
  );
}

// Desktop Layout Component
const DesktopProfile = ({ profileData, router }) => {
  const isAdminOrTeacher =
    profileData.role === 'admin' || profileData.role === 'teacher';
  const isStudent = profileData.role === 'student';

  // Check if should show verified badge
  const shouldShowVerifiedBadge =
    profileData.role === 'admin' ||
    (profileData.role === 'teacher' && profileData.isVerified) ||
    (profileData.role === 'student' && profileData.status === 'approved');

  const formatDate = dateString => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = name => {
    if (!name) return 'US';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Dynamic stats based on role
  const getProfileStats = () => {
    if (profileData.role === 'admin') {
      return [
        {
          label: 'Users Managed',
          value: '1.2K+',
          icon: Users,
          color: 'bg-orange-50 text-orange-700',
        },
        {
          label: 'Active Systems',
          value: '15',
          icon: Briefcase,
          color: 'bg-black/5 text-gray-700',
        },
        {
          label: 'Admin Since',
          value: profileData.createdAt
            ? formatDate(profileData.createdAt).split(' ')[2]
            : 'N/A',
          icon: Calendar,
          color: 'bg-orange-50 text-orange-700',
        },
        {
          label: 'Uptime',
          value: '99.8%',
          icon: Clock,
          color: 'bg-black/5 text-gray-700',
        },
      ];
    } else if (profileData.role === 'teacher') {
      return [
        {
          label: 'Students',
          value: '45',
          icon: Users,
          color: 'bg-orange-50 text-orange-700',
        },
        {
          label: 'Courses',
          value: '8',
          icon: BookOpen,
          color: 'bg-black/5 text-gray-700',
        },
        {
          label: 'Teaching Since',
          value: profileData.createdAt
            ? formatDate(profileData.createdAt).split(' ')[2]
            : 'N/A',
          icon: Calendar,
          color: 'bg-orange-50 text-orange-700',
        },
        {
          label: 'Rating',
          value: '4.8/5',
          icon: Award,
          color: 'bg-black/5 text-gray-700',
        },
      ];
    } else {
      return [
        {
          label: 'Attendance',
          value: '92%',
          icon: CheckCircle,
          color: 'bg-orange-50 text-orange-700',
        },
        {
          label: 'Courses',
          value: '6',
          icon: BookOpen,
          color: 'bg-black/5 text-gray-700',
        },
        {
          label: 'Joined',
          value: profileData.createdAt
            ? formatDate(profileData.createdAt).split(' ')[2]
            : 'N/A',
          icon: Calendar,
          color: 'bg-orange-50 text-orange-700',
        },
        {
          label: 'Performance',
          value: 'A+',
          icon: Award,
          color: 'bg-black/5 text-gray-700',
        },
      ];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 px-4"
    >
      {/* Header Section - Enhanced with Orange/White/Black Theme */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-orange-100">
        {/* Cover Photo with Gradient */}
        <div className="relative h-72 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="relative px-12 pb-8">
          {/* Avatar and Basic Info */}
          <div className="flex items-end -mt-24 mb-8">
            <div className="relative mr-8">
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-20 blur-xl"></div>
              <Avatar className="h-48 w-48 border-6 border-white shadow-2xl relative hover:scale-105 transition-transform duration-300">
                <AvatarImage
                  src={profileData.studentPhoto}
                  alt={profileData.fullName || 'User'}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-5xl font-bold">
                  {getInitials(profileData.fullName)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                      {profileData.fullName || 'User Name'}
                    </h1>
                    {shouldShowVerifiedBadge && (
                      <div className="flex items-center">
                        <AdminVerifiedBadge size={28} />
                        <span className="ml-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                          Verified {profileData.role}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-xl mb-3">
                    {profileData.role?.charAt(0).toUpperCase() +
                      profileData.role?.slice(1) || 'User'}{' '}
                    •{' '}
                    {isStudent && profileData.admissionClass !== 'No class yet'
                      ? profileData.admissionClass
                      : profileData.role === 'teacher'
                        ? 'Faculty Member'
                        : 'System Administrator'}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 text-sm font-medium px-4 py-1">
                      {profileData.status?.charAt(0).toUpperCase() +
                        profileData.status?.slice(1) || 'Active'}
                    </Badge>
                    <Badge className="bg-black/5 text-gray-700 hover:bg-black/10 border-gray-300 text-sm font-medium px-4 py-1">
                      <Hash className="h-3 w-3 mr-1" />
                      ID: {profileData.portalId || 'N/A'}
                    </Badge>
                    <span className="text-gray-500 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {profileData.city || 'Location not set'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats with alternating colors */}
          <div className="grid grid-cols-4 gap-6 border-t border-gray-200 pt-8">
            {getProfileStats().map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className={`${stat.color} rounded-2xl p-4 mb-3 inline-flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">About</h2>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <InfoRow
                      icon={Mail}
                      label="Email"
                      value={profileData.email || 'Not provided'}
                      color="orange"
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Date of Birth"
                      value={formatDate(profileData.dateOfBirth)}
                    />
                    <InfoRow
                      icon={User}
                      label="Father's Name"
                      value={profileData.fatherName || 'Not provided'}
                    />
                  </div>
                  <div className="space-y-6">
                    <InfoRow
                      icon={Hash}
                      label="Portal ID"
                      value={profileData.portalId || 'N/A'}
                    />
                    <InfoRow
                      icon={Globe}
                      label="Gender"
                      value={
                        profileData.gender
                          ? profileData.gender.charAt(0).toUpperCase() +
                            profileData.gender.slice(1)
                          : 'Not specified'
                      }
                    />
                    <InfoRow
                      icon={Building}
                      label="City"
                      value={profileData.city || 'Not specified'}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Address Information
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Home className="h-5 w-5 text-orange-600" />
                      Current Address
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.currentAddress || 'Not provided'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                      <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                        <Building className="h-4 w-4" />
                        {profileData.city || 'City not set'}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        ZIP: {profileData.zipCode || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Home className="h-5 w-5 text-gray-600" />
                      Permanent Address
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.permanentAddress ||
                        'Same as current address'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents Card - Only for students */}
          {isStudent && profileData.admissionClass !== 'No class yet' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Documents
                      </h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-4">
                    <DocumentCard
                      title="Student Photo"
                      image={profileData.studentPhoto}
                      date={formatDate(profileData.createdAt)}
                    />
                    <DocumentCard
                      title="ID Proof"
                      image={profileData.idProof}
                      date={formatDate(profileData.createdAt)}
                    />
                    <DocumentCard
                      title="Birth Certificate"
                      image={profileData.birthCertificate}
                      date={formatDate(profileData.createdAt)}
                    />
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Documents
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Role Specific Card */}
          {isStudent && profileData.admissionClass !== 'No class yet' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Academic Info
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 border border-orange-200">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2 font-medium">
                          Current Class
                        </p>
                        <p className="font-bold text-gray-900 text-xl">
                          {profileData.admissionClass}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2 font-medium">
                          Enrollment Date
                        </p>
                        <p className="font-bold text-gray-900">
                          {formatDate(profileData.createdAt)}
                        </p>
                      </div>
                      {profileData.previousSchool && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2 font-medium">
                            Previous School
                          </p>
                          <p className="font-bold text-gray-900">
                            {profileData.previousSchool}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Verification Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Verification
                    </h2>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none shadow-sm">
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <VerificationItem
                    label="Identity"
                    verified={true}
                    description="Government ID verified"
                  />
                  <VerificationItem
                    label="Documents"
                    verified={true}
                    description="All documents verified"
                  />
                  <VerificationItem
                    label="Account"
                    verified={profileData.isVerified}
                    description="Account fully verified"
                  />
                  {profileData.status === 'approved' && (
                    <VerificationItem
                      label="Approval"
                      verified={true}
                      description="Profile approved by admin"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Quick Actions
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 text-gray-700 font-medium transition-colors duration-300"
                >
                  <Eye className="h-4 w-4 mr-3" />
                  View Public Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 text-gray-700 font-medium transition-colors duration-300"
                >
                  <Download className="h-4 w-4 mr-3" />
                  Export Profile Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 text-gray-700 font-medium transition-colors duration-300"
                >
                  <Shield className="h-4 w-4 mr-3" />
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile Layout Component
const MobileProfile = ({ profileData, router }) => {
  const isAdminOrTeacher =
    profileData.role === 'admin' || profileData.role === 'teacher';
  const isStudent = profileData.role === 'student';

  // Check if should show verified badge
  const shouldShowVerifiedBadge =
    profileData.role === 'admin' ||
    (profileData.role === 'teacher' && profileData.isVerified) ||
    (profileData.role === 'student' && profileData.status === 'approved');

  const formatDate = dateString => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = name => {
    if (!name) return 'US';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Dynamic stats for mobile
  const getProfileStats = () => {
    if (profileData.role === 'admin') {
      return [
        { label: 'Users', value: '1.2K+', icon: Users, color: 'bg-orange-100' },
        { label: 'Systems', value: '15', icon: Briefcase, color: 'bg-black/5' },
      ];
    } else if (profileData.role === 'teacher') {
      return [
        { label: 'Students', value: '45', icon: Users, color: 'bg-orange-100' },
        { label: 'Courses', value: '8', icon: BookOpen, color: 'bg-black/5' },
      ];
    } else {
      return [
        {
          label: 'Attendance',
          value: '92%',
          icon: CheckCircle,
          color: 'bg-orange-100',
        },
        { label: 'Performance', value: 'A+', icon: Award, color: 'bg-black/5' },
      ];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Profile Info */}
      <div className="px-4">
        {/* Avatar */}
        <div className="flex justify-center -mt-20 mb-4">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-30 blur-xl"></div>
            <Avatar className="h-36 w-36 border-6 border-white shadow-2xl relative">
              <AvatarImage
                src={profileData.studentPhoto}
                alt={profileData.fullName || 'User'}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-4xl font-bold">
                {getInitials(profileData.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Name and Title - Centered */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 text-center">
                {profileData.fullName || 'User Name'}
              </h1>
              {shouldShowVerifiedBadge && <AdminVerifiedBadge size={20} />}
            </div>
            {shouldShowVerifiedBadge && (
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full mt-1">
                Verified {profileData.role}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-3 text-center">
            {profileData.role?.charAt(0).toUpperCase() +
              profileData.role?.slice(1) || 'User'}{' '}
            •{' '}
            {isStudent && profileData.admissionClass !== 'No class yet'
              ? profileData.admissionClass
              : profileData.role === 'teacher'
                ? 'Faculty'
                : 'Admin'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 text-xs">
              {profileData.status?.charAt(0).toUpperCase() +
                profileData.status?.slice(1) || 'Active'}
            </Badge>
            <Badge className="bg-black/5 text-gray-700 hover:bg-black/10 border-gray-300 text-xs">
              <Hash className="h-3 w-3 mr-1" />
              ID: {profileData.portalId || 'N/A'}
            </Badge>
            <span className="text-gray-500 text-xs flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3" />
              {profileData.city || 'Location'}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {getProfileStats().map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md">
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button variant="outline" className="flex-1 border-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">About</h2>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={profileData.email || 'Not provided'}
                  color="orange"
                  mobile
                />
                <InfoRow
                  icon={Calendar}
                  label="Date of Birth"
                  value={formatDate(profileData.dateOfBirth)}
                  mobile
                />
                <InfoRow
                  icon={User}
                  label="Father's Name"
                  value={profileData.fatherName || 'Not provided'}
                  mobile
                />
                <InfoRow
                  icon={Hash}
                  label="Portal ID"
                  value={profileData.portalId || 'N/A'}
                  mobile
                />
                <InfoRow
                  icon={Globe}
                  label="Gender"
                  value={
                    profileData.gender
                      ? profileData.gender.charAt(0).toUpperCase() +
                        profileData.gender.slice(1)
                      : 'Not specified'
                  }
                  mobile
                />
                <InfoRow
                  icon={Building}
                  label="City"
                  value={profileData.city || 'Not specified'}
                  mobile
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Address Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Address</h2>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                    <Home className="h-4 w-4 text-orange-600" />
                    Current Address
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    {profileData.currentAddress || 'Not provided'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                    <Home className="h-4 w-4 text-gray-600" />
                    Permanent Address
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    {profileData.permanentAddress || 'Same as current'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Verification Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Verification
                    </h2>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none text-xs">
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <VerificationItem
                  label="Identity"
                  verified={true}
                  description="ID verified"
                  mobile
                />
                <VerificationItem
                  label="Documents"
                  verified={true}
                  description="All docs verified"
                  mobile
                />
                <VerificationItem
                  label="Account"
                  verified={profileData.isVerified}
                  description="Account verified"
                  mobile
                />
                {profileData.status === 'approved' && (
                  <VerificationItem
                    label="Approval"
                    verified={true}
                    description="Admin approved"
                    mobile
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper Components
const InfoRow = ({ icon: Icon, label, value, color, mobile = false }) => {
  if (mobile) {
    return (
      <div className="flex items-start gap-3 py-2">
        <div
          className={`p-2 rounded-lg ${color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-gray-900 font-medium">{value}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-xl ${color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
};

const DocumentCard = ({ title, image, date }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-orange-300 transition-colors duration-300 group cursor-pointer">
    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3 border border-gray-200 group-hover:border-orange-300 transition-colors duration-300">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{date}</p>
  </div>
);

const VerificationItem = ({ label, verified, description, mobile = false }) => (
  <div className={`flex items-center ${mobile ? 'gap-3' : 'gap-4'} py-2`}>
    <div
      className={`p-2 rounded-lg ${verified ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
    >
      <CheckCircle className="h-4 w-4" />
    </div>
    <div className="flex-1">
      <p
        className={`font-medium ${mobile ? 'text-sm' : ''} ${verified ? 'text-gray-900' : 'text-gray-500'}`}
      >
        {label}
      </p>
      <p className={`text-sm ${verified ? 'text-gray-500' : 'text-gray-400'}`}>
        {description}
      </p>
    </div>
    {verified && (
      <span
        className={`${mobile ? 'text-xs' : 'text-sm'} font-medium text-green-600`}
      >
        Verified
      </span>
    )}
  </div>
);

// Enhanced Loading Skeleton
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Desktop Skeleton */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-orange-100">
            {/* Cover Skeleton */}
            <div className="relative h-72 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>

            {/* Profile Info Skeleton */}
            <div className="relative px-12 pb-8">
              <div className="flex items-end -mt-24 mb-8">
                <div className="relative mr-8">
                  <div className="absolute -inset-3 bg-gray-300 rounded-full opacity-20 blur-xl"></div>
                  <Skeleton className="h-48 w-48 rounded-full border-6 border-white" />
                </div>

                <div className="flex-1 mb-4">
                  <Skeleton className="h-10 w-64 mb-3" />
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-32 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Stats Skeleton */}
              <div className="grid grid-cols-4 gap-6 border-t border-gray-200 pt-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="text-center">
                    <Skeleton className="h-16 w-16 rounded-2xl mx-auto mb-3" />
                    <Skeleton className="h-8 w-12 mx-auto mb-2" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid Skeleton */}
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
            <div className="space-y-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Skeleton */}
        <div className="lg:hidden">
          {/* Cover Skeleton */}
          <Skeleton className="h-48 w-full rounded-b-2xl mb-4" />

          {/* Avatar Skeleton */}
          <div className="flex justify-center -mt-20 mb-4">
            <Skeleton className="h-36 w-36 rounded-full border-6 border-white" />
          </div>

          {/* Name Skeleton */}
          <div className="text-center mb-6">
            <Skeleton className="h-8 w-48 mx-auto mb-3" />
            <Skeleton className="h-5 w-32 mx-auto mb-4" />
            <div className="flex justify-center gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
