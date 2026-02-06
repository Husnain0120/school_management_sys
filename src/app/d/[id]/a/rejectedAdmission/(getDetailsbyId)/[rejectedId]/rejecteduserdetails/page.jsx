'use client';

import axios from 'axios';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Book,
  Calendar,
  CheckCircle,
  Download,
  Eye,
  FileText,
  Home,
  IdCard,
  Loader2,
  Mail,
  MapPin,
  School,
  Shield,
  User,
  XCircle,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Color constants
const COLORS = {
  primary: {
    light: '#FB923C',
    dark: '#EA580C',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  status: {
    rejected: '#DC2626',
    approved: '#16A34A',
    pending: '#D97706',
  },
};

// Skeleton Components
const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  </div>
);

const DocumentSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

// Reusable Components
const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0 gap-1 sm:gap-0">
    <div className="flex items-center space-x-2">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-medium text-gray-900 text-right sm:text-left break-words">
      {value || 'N/A'}
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusConfig = status => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: CheckCircle,
        };
      case 'rejected':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: XCircle,
        };
      default:
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          icon: AlertCircle,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full border ${config.bg} ${config.text} ${config.border} text-xs md:text-sm`}
    >
      <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
      <span className="font-medium">{status?.toUpperCase()}</span>
    </div>
  );
};

const ActionButton = ({
  onClick,
  icon: Icon,
  label,
  variant = 'primary',
  loading,
  disabled,
}) => {
  const baseClasses =
    'w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-sm hover:shadow',
    secondary:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 shadow-sm hover:shadow',
    danger:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow',
    success:
      'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-sm hover:shadow',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Icon className="w-5 h-5" />
          <span className="text-sm md:text-base">{label}</span>
        </>
      )}
    </button>
  );
};

const DocumentCard = ({ title, url, type, onView }) => {
  const getIcon = type => {
    switch (type) {
      case 'photo':
        return User;
      case 'id':
        return IdCard;
      default:
        return FileText;
    }
  };

  const Icon = getIcon(type);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {url ? 'Click to view' : 'Not available'}
            </p>
          </div>
        </div>
        <button
          onClick={onView}
          disabled={!url}
          className="px-2 py-1.5 md:px-3 md:py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0 ml-2"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Status Note Component with dynamic colors
const StatusNote = ({ status, className = '' }) => {
  const getStatusNoteConfig = status => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'Application Approved',
          message:
            'This application has been approved. Student has been notified about the admission status.',
        };
      case 'rejected':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          title: 'Application Rejected',
          message:
            'Rejecting will move this application to rejected status and remove it from active processing. The student will receive a rejection notification.',
          actionMessage:
            'Moving to pending will return this application to the admission portal for review. The student will be notified about this status change.',
        };
      default: // pending
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          title: 'Application Pending',
          message:
            'This application is currently under review. No action has been taken yet.',
          actionMessage:
            'Rejecting will move this application to rejected status and remove it from active processing. The student will receive a rejection notification.',
        };
    }
  };

  const config = getStatusNoteConfig(status);

  return (
    <div
      className={`rounded-lg p-4 border ${config.bg} ${config.border} ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
        >
          <AlertTriangle className={`w-4 h-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold mb-1.5">{config.title}</h4>
          <p className="text-xs leading-relaxed">{config.message}</p>
          {config.actionMessage && (
            <p className="text-xs leading-relaxed mt-2 font-medium">
              {config.actionMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AdmissionDetailsPage() {
  const params = useParams();
  const admissionId = params.rejectedId;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [action, setAction] = useState(null);

  // API Configuration
  const api = axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Fetch admission details
  useEffect(() => {
    const fetchData = async () => {
      if (!admissionId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          `/api/admin/rejectedAdmissions/${admissionId}/rejectedDetails`
        );

        if (response.status === 200) {
          setData(response.data?.info);
        } else {
          throw new Error(response.message || 'Failed to fetch details');
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Failed to load details'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [admissionId]);

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!action || !data) return;

    try {
      setUpdating(true);

      const response = await api.put(
        `/api/admin/admission-applications/admission-details/${admissionId}/rejectingAdmission`,
        { status: action === 'approve' ? 'approved' : 'rejected' }
      );

      setData(response.data?.applicant || response.data?.info);
      setShowConfirm(false);
      setAction(null);

      // Show success message
      alert(`Status updated to ${response.applicant?.status || action}`);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to update status'
      );
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  // Format date
  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-7 md:h-8 bg-gray-200 rounded w-1/2 md:w-1/4 mb-2"></div>
            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 md:w-1/2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
            <div className="space-y-4 md:space-y-6">
              <CardSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-red-500" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            Error Loading Details
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm md:text-base"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm md:text-base shadow-sm hover:shadow"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          {/* Back Button and Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
            <div className="flex-1 min-w-0">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-2 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm md:text-base">
                  Back to Applications
                </span>
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                    Admission Details
                  </h1>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Application ID: {data?.portalId || 'N/A'}
                  </p>
                </div>
                <div className="sm:self-start">
                  <StatusBadge status={data?.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Header - Fixed Layout */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Avatar Section */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="relative">
                  {data?.studentPhoto ? (
                    <img
                      src={data.studentPhoto}
                      alt="Student"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-orange-50 shadow-sm"
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm">
                      <User className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                      {data?.fullName || 'N/A'}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mt-2">
                      <span className="flex items-center space-x-1 text-gray-600 text-sm md:text-base">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{data?.email || 'N/A'}</span>
                      </span>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span className="flex items-center space-x-1 text-gray-600 text-sm md:text-base">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(data?.dateOfBirth)}</span>
                      </span>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs md:text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                      Applied on {formatDate(data?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>
              </div>
              <div className="space-y-1">
                <InfoRow label="Full Name" value={data?.fullName} icon={User} />
                <InfoRow
                  label="Father's Name"
                  value={data?.fatherName}
                  icon={User}
                />
                <InfoRow
                  label="Date of Birth"
                  value={formatDate(data?.dateOfBirth)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Gender"
                  value={
                    data?.gender?.charAt(0).toUpperCase() +
                    data?.gender?.slice(1)
                  }
                  icon={User}
                />
                <InfoRow label="Email" value={data?.email} icon={Mail} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Current Address
                  </h4>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm md:text-base">
                    {data?.currentAddress || 'Not provided'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Permanent Address
                  </h4>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm md:text-base">
                    {data?.permanentAddress || 'Not provided'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow label="City" value={data?.city} icon={MapPin} />
                  <InfoRow
                    label="ZIP Code"
                    value={data?.zipCode}
                    icon={MapPin}
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <School className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Academic Information
                </h3>
              </div>
              <div className="space-y-1">
                <InfoRow
                  label="Admission Class"
                  value={data?.admissionClass}
                  icon={Book}
                />
                <InfoRow
                  label="Previous School"
                  value={data?.previousSchool || 'Not provided'}
                  icon={School}
                />
                {data?.subjects?.length > 0 && (
                  <div className="py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Book className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Subjects</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Documents */}
          <div className="space-y-4 md:space-y-6">
            {/* Application Status Box */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Application Status
                </h3>
              </div>

              <div className="space-y-4">
                {/* Status Badge with Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-700 text-sm md:text-base font-medium">
                      Current Status:
                    </div>
                    <StatusBadge status={data?.status} />
                  </div>
                </div>

                {/* Important Note - Integrated into Status Box */}
                <StatusNote status={data?.status} />

                {/* Status Timeline */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Applied Date</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(data?.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(data?.updatedAt)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  {data?.status === 'rejected' ? (
                    <>
                      <ActionButton
                        onClick={() => {
                          setAction('approve');
                          setShowConfirm(true);
                        }}
                        icon={CheckCircle}
                        label="Move to Pending"
                        variant="success"
                        loading={updating}
                      />
                      <div className="text-xs text-gray-500 text-center mt-1 px-2">
                        This will change status to PENDING and notify the
                        student
                      </div>
                    </>
                  ) : (
                    <>
                      <ActionButton
                        onClick={() => {
                          setAction('reject');
                          setShowConfirm(true);
                        }}
                        icon={XCircle}
                        label="Reject Application"
                        variant="danger"
                        loading={updating}
                      />
                      <div className="text-xs text-gray-500 text-center mt-1 px-2">
                        This will move application to REJECTED status
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => {
                        if (data?.email) {
                          window.location.href = `mailto:${data.email}`;
                        }
                      }}
                      className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 font-medium text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={() => {
                        // PDF download implementation
                        alert(
                          'PDF download functionality would be implemented here'
                        );
                      }}
                      className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 font-medium text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Documents
                </h3>
              </div>
              <div className="space-y-3">
                <DocumentCard
                  title="Student Photo"
                  url={data?.studentPhoto}
                  type="photo"
                  onView={() => window.open(data?.studentPhoto, '_blank')}
                />
                <DocumentCard
                  title="ID Proof"
                  url={data?.idProof}
                  type="id"
                  onView={() => window.open(data?.idProof, '_blank')}
                />
                <DocumentCard
                  title="Birth Certificate"
                  url={data?.birthCertificate}
                  type="document"
                  onView={() => window.open(data?.birthCertificate, '_blank')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  action === 'approve' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {action === 'approve' ? (
                  <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                ) : (
                  <XCircle className="w-7 h-7 md:w-8 md:h-8 text-red-600" />
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {action === 'approve'
                  ? 'Move to Pending?'
                  : 'Reject Application?'}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {action === 'approve'
                  ? 'This will change the status from REJECTED to PENDING and notify the student.'
                  : 'This will reject the application and move it to rejected status.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Please confirm this action:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Student: {data?.fullName}
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Application ID: {data?.portalId}
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Action:{' '}
                        {action === 'approve'
                          ? 'Move to Pending'
                          : 'Reject Application'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    setAction(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating}
                  className={`flex-1 px-4 py-3 font-medium rounded-lg transition-colors duration-200 text-sm md:text-base ${
                    action === 'approve'
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow'
                      : 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {updating ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : action === 'approve' ? (
                    'Move to Pending'
                  ) : (
                    'Reject Application'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
