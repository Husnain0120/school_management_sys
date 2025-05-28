"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Clock,
  Save,
  RotateCcw,
  CheckCircle,
  ArrowLeft,
  Settings,
  AlertCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AttendanceSettingsPage() {
  const param = useParams();
  const userId = param.id;

  const AttendancePublish = true;
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
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
                        {AttendancePublish ? "Enabled" : "Disabled"}
                      </span>
                      Attendance System
                    </Label>
                    <p className="text-sm text-gray-500">
                      {AttendancePublish
                        ? "Disable attendance tracking only after the class duration (e.g., 6 months or 1 year) has officially concluded."
                        : "Enable attendance tracking only when the academic session or classes are formally commencing."}
                    </p>
                  </div>
                  <Switch id="system-enabled" />
                </div>
              </div>
            </div>

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
                  <div className="space-y-3">
                    <Label
                      htmlFor="attendance-date"
                      className="text-sm font-medium text-gray-900"
                    >
                      Attendance Date
                    </Label>
                    <Input
                      id="attendance-date"
                      type="date"
                      defaultValue="2024-01-15"
                    />
                    <p className="text-sm text-gray-500">
                      Date when attendance will be available
                    </p>
                  </div>

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
                      defaultValue="09:00"
                    />
                    <p className="text-sm text-gray-500">
                      Time when attendance opens
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="closing-time"
                      className="text-sm font-medium text-gray-900"
                    >
                      Closing Time
                    </Label>
                    <Input id="closing-time" type="time" defaultValue="17:00" />
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
                      defaultValue="15"
                      min="0"
                      max="60"
                    />
                    <p className="text-sm text-gray-500">
                      Extra time allowed for late attendance
                    </p>
                  </div>
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
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">
                      Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Next Opening</span>
                  <span className="text-sm font-medium text-gray-900">
                    Jan 15, 9:00 AM
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="text-sm font-medium text-gray-900">156</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Present Today</span>
                  <span className="text-sm font-medium text-gray-900">142</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">Absent Today</span>
                  <span className="text-sm font-medium text-gray-900">14</span>
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
