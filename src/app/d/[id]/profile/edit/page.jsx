'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import AdminVerifiedBadge from '@/components/verify-badge/Admin-verified-badge';
import TeacherVerifiedBadge from '@/components/verify-badge/Teacher-verified-badge';
import axios from 'axios';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  Key,
  Lock,
  Shield,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ProfileEditPage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/user-profile');
        if (res?.data?.data) {
          setUserData(res?.data?.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !userData) {
    return <SkeletonLoading />;
  }

  return <ActualProfileEditPage userData={userData} />;
};

const SkeletonLoading = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      {/* Header Skeleton */}
      <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Skeleton className="h-24 w-24 rounded-full bg-gray-300" />
            </div>
            <div className="text-center md:text-left space-y-3 flex-1">
              <Skeleton className="h-8 w-64 bg-gray-300 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-48 bg-gray-300 mx-auto md:mx-0" />
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Skeleton className="h-6 w-20 bg-gray-300" />
                <Skeleton className="h-6 w-16 bg-gray-300" />
                <Skeleton className="h-6 w-24 bg-gray-300" />
              </div>
            </div>
            <div className="md:ml-auto">
              <Skeleton className="h-16 w-32 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-300 h-2" />
          <div className="p-6">
            <div className="pb-4">
              <Skeleton className="h-6 w-48 bg-gray-300" />
              <Skeleton className="h-4 w-64 bg-gray-300 mt-2" />
            </div>
            <div className="space-y-8">
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <Skeleton className="h-9 w-9 rounded-full bg-gray-300 mr-3" />
                  <Skeleton className="h-5 w-32 bg-gray-300" />
                </div>
                <div className="space-y-4 pl-12">
                  {[...Array(3)].map((_, i) => (
                    <div className="space-y-2" key={i}>
                      <Skeleton className="h-4 w-24 bg-gray-300" />
                      <Skeleton className="h-10 w-full max-w-md bg-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-300 h-2" />
          <div className="p-6">
            <Skeleton className="h-6 w-32 bg-gray-300 mb-4" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-gray-300" />
                  <Skeleton className="h-4 w-40 bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActualProfileEditPage = ({ userData }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleUpdatingPassword = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const setMessageWithTimeout = msg => {
        setMessage(msg);
        setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 5000);
      };

      if (newPassword !== confirmPassword) {
        setMessageWithTimeout({
          text: "New password and confirm password don't match",
          type: 'error',
        });
        return;
      }

      const res = await axios.put('/api/auth/new-password', {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        setMessageWithTimeout({
          text: 'Password updated successfully!',
          type: 'success',
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessageWithTimeout({
          text: res.data.message || 'Failed to update password',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Password update error:', error);
      setMessageWithTimeout({
        text: error.response?.data?.message || 'Failed to update password',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <AvatarImage
                    src={userData?.studentPhoto || '/placeholder.svg'}
                    alt={userData?.fullName || 'User'}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl font-semibold">
                    {userData?.fullName
                      ?.split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 right-0">
                  <Badge className="bg-emerald-500 text-white border-2 border-white px-3 py-1 hover:bg-emerald-600 transition-colors">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                      {userData?.fullName}
                      {userData.role === 'admin' ? (
                        <AdminVerifiedBadge size={24} />
                      ) : userData.role === 'teacher' ? (
                        <TeacherVerifiedBadge size={24} />
                      ) : null}
                    </h1>
                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      {userData?.email || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-gray-900 text-white rounded-lg px-4 py-3 shadow-md">
                    <p className="text-sm font-medium text-gray-300">
                      {userData?.role === 'student' ? 'Student ID' : 'User ID'}
                    </p>
                    <p className="text-xl font-bold tracking-wider">
                      {userData?.portalId || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {userData?.role === 'student' && (
                    <Badge className="bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Class: {userData?.admissionClass || 'N/A'}
                    </Badge>
                  )}

                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
                    <Shield className="h-3 w-3 mr-1" />
                    {userData?.role?.toUpperCase() || 'USER'}
                  </Badge>

                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {formatDate(userData?.createdAt)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Settings Card */}
          <Card className="lg:col-span-2 shadow-lg border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-orange-50 mr-3">
                    <Key className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Security Settings
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      Update your password and security preferences
                    </CardDescription>
                  </div>
                </div>
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
                    message.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center">
                    {message.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-medium">{message.text}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpdatingPassword} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="currentPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gray-900 hover:bg-black text-white transition-colors duration-300"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Updating...
                        </span>
                      ) : (
                        'Update Password'
                      )}
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Note:</span> Password must be
                    at least 8 characters long and contain uppercase, lowercase,
                    and numbers.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* User Information Card */}
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-white">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gray-100 mr-3">
                  <User className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Account Info
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Your profile details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </p>
                    <p className="text-gray-900 font-medium">
                      {userData?.fullName || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Email Address
                    </p>
                    <p className="text-gray-900 font-medium">
                      {userData?.email || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Role
                    </p>
                    <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
                      {userData?.role?.toUpperCase() || 'USER'}
                    </Badge>
                  </div>

                  {userData?.role === 'student' && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Class
                      </p>
                      <Badge className="bg-orange-50 text-orange-700 border border-orange-200">
                        {userData?.admissionClass || 'N/A'}
                      </Badge>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Member Since
                    </p>
                    <p className="text-gray-900 font-medium">
                      {formatDate(userData?.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Account Status
                    </p>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                      <span className="text-emerald-600 font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            For additional security settings or account modifications, please
            contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
