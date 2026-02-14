'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Info,
  Loader2,
  Power,
  Save,
  Timer,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// ==================== UTILITY FUNCTIONS ====================

/**
 * Formats ISO date string to YYYY-MM-DD format for input fields
 * @param {string} isoDate - ISO format date string
 * @returns {string} Formatted date string
 */
const formatDateForInput = isoDate => {
  if (!isoDate) return '2024-01-15';

  try {
    const date = new Date(isoDate);
    return isNaN(date.getTime())
      ? '2024-01-15'
      : date.toISOString().split('T')[0];
  } catch {
    return '2024-01-15';
  }
};

/**
 * Formats date string to ISO format for API requests
 * @param {string} dateString - Date string from input
 * @returns {string|null} ISO format date string
 */
const formatDateForAPI = dateString => {
  if (!dateString) return null;
  try {
    return new Date(dateString).toISOString();
  } catch {
    return null;
  }
};

// ==================== TYPES & INTERFACES ====================

/**
 * @typedef {Object} AttendanceSettings
 * @property {string} startDate - Attendance opening date
 * @property {string} openingTime - Daily opening time
 * @property {string} closingTime - Daily closing time
 * @property {number} gracePeriod - Grace period in minutes
 * @property {boolean} isSystemEnabled - System enable/disable status
 */

// ==================== MAIN COMPONENT ====================

export default function AttendanceSettingsPage() {
  const param = useParams();
  const userId = param.id;

  // ==================== STATE MANAGEMENT ====================

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  // Form states
  const [settings, setSettings] = useState({
    startDate: '2024-01-15',
    openingTime: '08:00',
    closingTime: '17:00',
    gracePeriod: 15,
    isSystemEnabled: true,
  });

  // Status messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ==================== API CALLS ====================

  /**
   * Fetches attendance settings from the API
   */
  const fetchSettingsDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data } = await axios.get('/api/admin/attendance-setting');

      if (data?.success === true && data?.data) {
        setSettings({
          startDate: formatDateForInput(data.data.startDate),
          openingTime: data.data.openingTime || '08:00',
          closingTime: data.data.closingTime || '17:00',
          gracePeriod: data.data.gracePeriod || 15,
          isSystemEnabled: data.data.isSystemEnabled ?? true,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to load attendance settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles attendance system toggle
   * @param {boolean} newValue - New system status
   */
  const handleSystemToggle = async newValue => {
    try {
      setIsSwitchLoading(true);
      setError('');
      setSuccess('');

      const { data } = await axios.put('/api/admin/attendance-setting', {
        isSystemEnabled: newValue,
      });

      if (data?.success) {
        setSuccess(
          `Attendance system ${newValue ? 'enabled' : 'disabled'} successfully!`
        );
        setSettings(prev => ({ ...prev, isSystemEnabled: newValue }));
        await fetchSettingsDetails();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Failed to update attendance status');
      }
    } catch (error) {
      console.error('Error updating attendance status:', error);
      setError('Failed to update attendance status. Please try again.');
      setSettings(prev => ({ ...prev, isSystemEnabled: !newValue }));
    } finally {
      setIsSwitchLoading(false);
    }
  };

  /**
   * Saves all attendance settings
   */
  const handleSaveSettings = async () => {
    // Validation
    if (settings.gracePeriod <= 0 || settings.gracePeriod > 60) {
      setError('Grace period must be between 1 and 60 minutes.');
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      setSuccess('');

      const payload = {
        startDate: formatDateForAPI(settings.startDate),
        openingTime: settings.openingTime,
        closingTime: settings.closingTime,
        gracePeriod: Number(settings.gracePeriod),
        isSystemEnabled: settings.isSystemEnabled,
      };

      const { data } = await axios.post(
        '/api/admin/attendance-setting',
        payload
      );

      if (data?.success) {
        setSuccess('Settings saved successfully!');
        await fetchSettingsDetails();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handles grace period input with validation
   * @param {string} value - Input value
   */
  const handleGracePeriodChange = value => {
    const num = Number(value);
    if (num >= 0 && num <= 60) {
      setSettings(prev => ({ ...prev, gracePeriod: num }));
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSettingsDetails();
  }, [fetchSettingsDetails]);

  // ==================== LOADING STATE ====================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              Loading Settings
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we fetch your attendance configuration...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== RENDER COMPONENT ====================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== BREADCRUMB ===== */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link
            href={`/d/${userId}/a/settings`}
            className="text-gray-500 hover:text-orange-600 transition-colors"
          >
            Settings
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Attendance Settings</span>
        </div>

        {/* ===== HEADER ===== */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-orange-100 p-3 rounded-xl">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Attendance Settings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure and manage your attendance system
            </p>
          </div>
        </div>

        {/* ===== STATUS MESSAGES ===== */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* ===== IMPORTANT NOTICE ===== */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-800 mb-1">
                Important Notice
              </h3>
              <p className="text-sm text-orange-700">
                Changes to attendance settings will take effect immediately.
                Make sure to notify students about any schedule changes.
              </p>
            </div>
          </div>
        </div>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== LEFT COLUMN - MAIN SETTINGS ===== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date & Time Configuration Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-orange-500" />
                  <h2 className="font-semibold text-gray-900">
                    Date & Time Configuration
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Attendance Opening Date */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="attendance-date"
                        className="text-sm font-medium text-gray-700"
                      >
                        Opening Date
                      </Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            <span>What's this?</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Attendance Start Date</DialogTitle>
                            <DialogDescription>
                              <p className="mb-3">
                                This date informs students when attendance
                                tracking begins. The actual attendance
                                availability depends on the system toggle.
                              </p>
                              <p className="text-orange-600 bg-orange-50 p-3 rounded-lg text-sm">
                                ⚠️ Note: This is an informative field only. Use
                                the system toggle below to actually
                                enable/disable attendance.
                              </p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Input
                      id="attendance-date"
                      type="date"
                      value={settings.startDate}
                      onChange={e =>
                        setSettings(prev => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      disabled={isSaving}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500">
                      Date when attendance becomes available
                    </p>
                  </div>

                  {/* Opening Time */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="opening-time"
                      className="text-sm font-medium text-gray-700 flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      Opening Time
                    </Label>
                    <Input
                      id="opening-time"
                      type="time"
                      value={settings.openingTime}
                      onChange={e =>
                        setSettings(prev => ({
                          ...prev,
                          openingTime: e.target.value,
                        }))
                      }
                      disabled={isSaving}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500">
                      Daily attendance opening time
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  {/* Closing Time */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="closing-time"
                      className="text-sm font-medium text-gray-700 flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      Closing Time
                    </Label>
                    <Input
                      id="closing-time"
                      type="time"
                      value={settings.closingTime}
                      onChange={e =>
                        setSettings(prev => ({
                          ...prev,
                          closingTime: e.target.value,
                        }))
                      }
                      disabled={isSaving}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500">
                      Daily attendance closing time
                    </p>
                  </div>

                  {/* Grace Period */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="grace-period"
                      className="text-sm font-medium text-gray-700 flex items-center gap-1"
                    >
                      <Timer className="h-3 w-3" />
                      Grace Period
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="grace-period"
                        type="number"
                        min="1"
                        max="60"
                        value={settings.gracePeriod}
                        onChange={e => handleGracePeriodChange(e.target.value)}
                        disabled={isSaving}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-500">minutes</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Extra time allowed (1-60 minutes)
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* System Control Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Power className="h-5 w-5 text-orange-500" />
                    <h2 className="font-semibold text-gray-900">
                      System Control
                    </h2>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        <span>Learn more</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Attendance System Guide</DialogTitle>
                        <DialogDescription className="space-y-4">
                          <p>
                            Enable attendance only when classes officially
                            start. The system begins tracking from the moment
                            you enable it.
                          </p>
                          <p>
                            Disable attendance only after the course/semester is
                            fully completed to ensure accurate tracking.
                          </p>
                          <p className="text-orange-600 bg-orange-50 p-3 rounded-lg">
                            ⚠️ Disabling early will prevent students from
                            marking attendance and may cause incomplete records.
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          settings.isSystemEnabled
                            ? 'text-green-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {settings.isSystemEnabled
                          ? 'System Active'
                          : 'System Inactive'}
                      </span>
                      {isSwitchLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 max-w-md">
                      {settings.isSystemEnabled
                        ? 'Attendance tracking is currently active. Disable only after course completion.'
                        : 'Attendance tracking is paused. Enable when classes officially start.'}
                    </p>
                  </div>
                  <Switch
                    id="system-enabled"
                    checked={settings.isSystemEnabled}
                    onCheckedChange={handleSystemToggle}
                    disabled={isSaving || isSwitchLoading}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN - SUMMARY SIDEBAR ===== */}
          <div className="space-y-6">
            {/* Current Status Summary */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden sticky top-6">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  Current Configuration
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {/* System Status */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">System Status</span>
                  <div className="flex items-center gap-2">
                    {settings.isSystemEnabled ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-600">
                          Inactive
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Opening Time */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Opening Time</span>
                  <span className="text-sm font-medium text-gray-900 bg-orange-50 px-3 py-1 rounded-full">
                    {settings.openingTime}
                  </span>
                </div>

                {/* Closing Time */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Closing Time</span>
                  <span className="text-sm font-medium text-gray-900 bg-orange-50 px-3 py-1 rounded-full">
                    {settings.closingTime}
                  </span>
                </div>

                {/* Grace Period */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Grace Period</span>
                  <span className="text-sm font-medium text-gray-900">
                    {settings.gracePeriod} minutes
                  </span>
                </div>

                {/* Start Date */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(settings.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Quick Action Button */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button className="w-full text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1 group">
                    View Detailed Analytics
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Quick Tips
              </h4>
              <ul className="space-y-2 text-sm text-orange-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Set opening time before classes start</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Grace period helps with late arrivals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Disable system only after course ends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
