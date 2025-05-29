"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Users,
  Save,
  CheckCircle,
  Settings,
  AlertCircle,
  ChevronRight,
  Info,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// Utility function to convert ISO date to YYYY-MM-DD format
const formatDateForInput = (isoDate) => {
  if (!isoDate) {
    return "2024-01-15"; // default fallback
  }

  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      return "2024-01-15";
    }
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "2024-01-15"; // fallback on error
  }
};

// Utility function to convert date input to ISO format for API
const formatDateForAPI = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch (error) {
    console.error("Error converting date for API:", error);
    return null;
  }
};

export default function AttendanceSettingsPage() {
  const param = useParams();
  const userId = param.id;

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  // Form states
  const [startDate, setStartDate] = useState("2024-01-15");
  const [openingTime, setOpeningTime] = useState("08:00");
  const [closingTime, setClosingTime] = useState("17:00");
  const [gracePeriod, setGracePeriod] = useState(15);
  const [isSystemEnabled, setIsSystemEnabled] = useState(true);

  // Status messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch settings data
  const fetchSettingsDetails = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await axios.get(`/api/admin/attendance-setting`);

      if (res.data?.success === true && res.data?.data) {
        const data = res.data.data;

        // Convert and set the start date
        const formattedStartDate = formatDateForInput(data.startDate);

        // Update form states with API data
        setStartDate(formattedStartDate);
        setOpeningTime(data.openingTime || "08:00");
        setClosingTime(data.closingTime || "17:00");
        setGracePeriod(data.gracePeriod || 15);
        setIsSystemEnabled(data.isSystemEnabled ?? true);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setError("Failed to load attendance settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle attendance publish toggle with PUT API
  const handleSystemToggle = async (newValue) => {
    try {
      setIsSwitchLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.put(`/api/admin/attendance-setting`, {
        isSystemEnabled: newValue,
      });

      if (res.data?.success) {
        setSuccess(
          `Attendance system ${newValue ? "enabled" : "disabled"} successfully!`
        );

        // Update local state immediately
        setIsSystemEnabled(newValue);

        // Fetch updated data from server
        await fetchSettingsDetails();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to update attendance status. Please try again.");
        // Revert the switch if API call failed
        setIsSystemEnabled(!newValue);
      }
    } catch (error) {
      console.error("Error updating attendance status:", error);
      setError("Failed to update attendance status. Please try again.");
      // Revert the switch if API call failed
      setIsSystemEnabled(!newValue);
    } finally {
      setIsSwitchLoading(false);
    }
  };

  // Save settings
  const handleSaveSettings = async () => {
    try {
      // Validate grace period
      const gracePeriodNum = Number(gracePeriod);
      if (gracePeriodNum <= 0 || gracePeriodNum > 60) {
        setError("Grace period must be between 1 and 60 minutes.");
        return;
      }

      setIsSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        startDate: formatDateForAPI(startDate),
        openingTime,
        closingTime,
        gracePeriod: gracePeriodNum,
        isSystemEnabled,
      };

      const res = await axios.post(`/api/admin/attendance-setting`, payload);

      if (res.data?.success) {
        setSuccess("Settings saved successfully!");

        // Refresh data to get updated values
        await fetchSettingsDetails();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to save settings. Please try again.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setError("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle grace period change with validation
  const handleGracePeriodChange = (value) => {
    const num = Number(value);
    if (num >= 0 && num <= 60) {
      setGracePeriod(num);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSettingsDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading attendance settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link
            href={`/d/${userId}/a/settings`}
            className="hover:text-gray-900"
          >
            Settings
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Attendance Settings</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Attendance Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure attendance system and scheduling
              </p>
            </div>
          </div>
        </div>

        {/* Status Messages */}
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

        {/* Important Notice */}
        <div className="bg-amber-50 border mb-3 border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800 mb-2">
                Important Notice
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Changes to attendance settings will take effect immediately.
                Make sure to notify students about any schedule changes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date & Time Settings */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Date & Time Configuration
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Attendance Opening Date */}
                  <div className="space-y-3 relative">
                    <Label
                      htmlFor="attendance-date"
                      className="text-sm font-medium text-gray-900"
                    >
                      Attendance Opening Date
                      <span className="text-gray-500 opacity-50 text-xs pl-3">
                        Format (dd/mm/yyyy)
                      </span>
                    </Label>

                    <div className="relative">
                      <Input
                        id="attendance-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="pr-14"
                        disabled={isSaving}
                      />

                      {/* Info Dialog */}
                      <div className="absolute inset-y-0 right-2 flex items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              className="text-red-600 text-xs underline focus:outline-none flex items-center gap-1 cursor-pointer font-bold italic"
                            >
                              <Info className="h-3 w-3 mt-0.5" /> info
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle className="text-base">
                                Attendance Start Info
                              </DialogTitle>
                              <DialogDescription className="text-sm text-gray-600 space-y-3">
                                <p>
                                  This date is shown only to inform students
                                  when the attendance window is expected to
                                  open.
                                </p>
                                <p className="text-red-600 font-semibold border-l-4 border-red-500 pl-3">
                                  ⚠️ Note: This is a display-only field for
                                  student awareness. Real attendance depends on
                                  toggle status.
                                </p>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      Date when attendance will be available
                    </p>
                  </div>

                  {/* Opening Time */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="attendance-time"
                      className="text-sm font-medium text-gray-900"
                    >
                      Opening Time
                    </Label>
                    <Input
                      id="attendance-time"
                      type="time"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                      disabled={isSaving}
                    />
                    <p className="text-sm text-gray-500">
                      Time when attendance opens
                    </p>
                  </div>
                </div>

                {/* Closing Time and Grace Period */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="closing-time"
                      className="text-sm font-medium text-gray-900"
                    >
                      Closing Time
                    </Label>
                    <Input
                      id="closing-time"
                      type="time"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                      disabled={isSaving}
                    />
                    <p className="text-sm text-gray-500">
                      Time when attendance closes
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="grace-period"
                      className="text-sm font-medium text-gray-900"
                    >
                      Grace Period (minutes)
                    </Label>
                    <Input
                      id="grace-period"
                      type="number"
                      min="1"
                      max="60"
                      value={gracePeriod}
                      onChange={(e) => handleGracePeriodChange(e.target.value)}
                      disabled={isSaving}
                    />
                    <p className="text-sm text-gray-500">
                      Extra time allowed for late attendance (1-60 minutes)
                    </p>
                  </div>

                  {/* Save Button */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
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
            </div>

            {/* System Control */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <h2 className="text-lg font-medium text-gray-900">
                      System Control
                    </h2>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex items-center gap-1">
                        <Info className="h-3 w-3 text-red-600 mt-0.5" />
                        <h2 className="text-xs underline font-medium cursor-pointer text-red-600">
                          more info
                        </h2>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          Attendance Activation Guide
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 leading-6 space-y-3">
                          <p>
                            You should enable the attendance system only when
                            your institution has officially started classes. The
                            moment you activate attendance, the system begins
                            tracking from that exact date, allowing students to
                            start marking their attendance.
                          </p>
                          <p>
                            It's important to disable the attendance system only
                            after the course or semester is fully completed —
                            such as after final exams or once the class session
                            has ended. Disabling it earlier will prevent
                            students from marking attendance and can result in
                            incomplete or inaccurate tracking.
                          </p>
                          <p className="text-red-600 font-semibold border-l-4 border-red-500 pl-3">
                            ⚠️ Note: Once attendance is enabled, the system will
                            treat the current date as the official start date.
                            Disabling it before the class session is complete
                            will stop all attendance tracking and may cause data
                            loss or confusion in student records.
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label
                      htmlFor="system-enabled"
                      className="text-sm font-medium text-gray-900"
                    >
                      <span className="underline">
                        {isSystemEnabled ? "Enabled" : "Disabled"}
                      </span>{" "}
                      Attendance System
                      {isSwitchLoading && (
                        <Loader2 className="h-4 w-4 ml-2 animate-spin text-blue-600 inline" />
                      )}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {isSystemEnabled
                        ? "Disable attendance tracking only after the class duration (e.g., 6 months or 1 year) has officially concluded."
                        : "Enable attendance tracking only when the academic session or classes are formally commencing."}
                    </p>
                  </div>
                  <Switch
                    id="system-enabled"
                    checked={isSystemEnabled}
                    onCheckedChange={handleSystemToggle}
                    disabled={isSaving || isSwitchLoading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Current Status
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Status</span>
                  <div className="flex items-center gap-2">
                    {isSystemEnabled ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-600">
                          Inactive
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Opening Time</span>
                  <span className="text-sm font-medium text-gray-900">
                    {openingTime}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Closing Time</span>
                  <span className="text-sm font-medium text-gray-900">
                    {closingTime}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Grace Period</span>
                  <span className="text-sm font-medium text-gray-900">
                    {gracePeriod} min
                  </span>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View Detailed Report
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
