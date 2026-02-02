'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  PhoneCall,
  Shield,
  Sparkles,
  SquareArrowOutDownLeft,
  UserPlus2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    portalId: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [seePassword, setSeePassword] = useState(true);

  const isLoading = isSubmitting || isRedirecting;

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(`/api/auth/login`, credentials);

      if (res.status === 200) {
        toast.success('Login successful', {
          description: res.data.message,
        });

        setIsRedirecting(true);
        const profileRes = await axios.get('/api/auth/user-profile');
        const { role, _id } = profileRes.data?.data || {};

        if (role === 'admin') {
          router.push(`/d/${_id}/a/home`);
        } else if (role === 'teacher') {
          router.push(`/d/${_id}/t/subjects`);
        } else if (role === 'student') {
          router.push(`/d/${_id}/s/home`);
        } else {
          toast.error('Unauthorized user role');
          setIsRedirecting(false);
        }
      }
    } catch (error) {
      console.log('Login failed:', error);
      const backendMessage = error?.response?.data?.message;
      toast.error('Login failed', {
        description:
          backendMessage || 'Something went wrong. Please try again later.',
      });
      setIsSubmitting(false);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-gray-100">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-white border-4 border-white">
                <Loader2 className="h-6 w-6 text-orange-600 animate-spin" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {isRedirecting ? 'Redirecting...' : 'Authenticating...'}
            </h3>
            <p className="text-gray-600 text-center text-sm">
              {isRedirecting
                ? 'Taking you to your dashboard'
                : 'Verifying your credentials'}
            </p>
          </div>
        </div>
      )}

      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-gray-900">Edu</span>
                  <span className="text-orange-600">Manage</span>
                </h1>
                <p className="text-sm text-gray-500">
                  Enterprise Education Platform
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600">
                Sign in to access your educational dashboard
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  Portal ID
                </Label>
                <Input
                  name="portalId"
                  value={credentials.portalId.toLocaleLowerCase()}
                  onChange={handleChange}
                  className="w-full border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-lg h-11"
                  placeholder="Enter your portal ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <Link
                    href="/pages/forgot-password"
                    className={`text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline transition-colors ${
                      isLoading ? 'pointer-events-none opacity-50' : ''
                    }`}
                    tabIndex={isLoading ? -1 : 0}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={seePassword ? 'password' : 'text'}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-lg h-11 pr-10"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setSeePassword(prev => !prev)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                  >
                    {seePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-11 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {isRedirecting ? 'Redirecting...' : 'Signing in...'}
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Links */}
          <div className="mt-8 space-y-3">
            <Link
              className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
              href="/pages/admission"
              tabIndex={isLoading ? -1 : 0}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <UserPlus2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Admissions Open
                  </div>
                  <div className="text-xs text-gray-500">
                    Apply for 2024-25 session
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </div>
            </Link>

            <div
              className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 ${
                isLoading ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    New Registrations
                  </div>
                  <div className="text-xs text-gray-500">
                    1.5k students enrolled
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-semibold">
                This week
              </div>
            </div>

            <Link
              className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
              href="/pages/contact"
              tabIndex={isLoading ? -1 : 0}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <PhoneCall className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Need Help?</div>
                <div className="text-xs text-gray-500">
                  Contact our support team
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">500+</div>
              <div className="text-xs text-gray-500">Schools</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">50K+</div>
              <div className="text-xs text-gray-500">Students</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">99.9%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
          </div>

          {/* Mobile Website Link */}
          <p className="text-gray-600 text-sm mt-6 pt-6 border-t border-gray-100 lg:hidden">
            Stay updated —{' '}
            <Link
              href="/"
              className={`inline-flex items-center font-medium text-orange-600 hover:text-orange-700 underline ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
              tabIndex={isLoading ? -1 : 0}
            >
              visit our website
              <SquareArrowOutDownLeft className="w-3 h-3 ml-1" />
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-40 right-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center p-12">
          <div className="w-full space-y-10">
            {/* Dashboard Preview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Student Dashboard</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Active
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-100"></div>
                  <div className="h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-100"></div>
                  <div className="h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-100"></div>
                </div>
                <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-100"></div>
                  <div className="h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-100"></div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Courses</h4>
                </div>
                <p className="text-sm text-gray-600">150+ digital courses</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-900/10 to-gray-900/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-gray-900" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Analytics</h4>
                </div>
                <p className="text-sm text-gray-600">Real-time insights</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white font-bold">SJ</span>
                </div>
                <div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle
                        key={i}
                        className="h-4 w-4 text-orange-500 fill-current mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-gray-800 italic">
                    "EduManage transformed how we operate. Efficiency increased
                    by 40% in the first month."
                  </p>
                  <div className="mt-3">
                    <div className="font-semibold text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-600">
                      Principal, Green Valley High
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Website Link */}
            <p className="text-gray-600 text-center text-sm">
              Stay updated —{' '}
              <Link
                href="/"
                className={`inline-flex items-center font-medium text-orange-600 hover:text-orange-700 underline ${
                  isLoading ? 'pointer-events-none opacity-50' : ''
                }`}
                tabIndex={isLoading ? -1 : 0}
              >
                visit our website
                <SquareArrowOutDownLeft className="w-3 h-3 ml-1" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
