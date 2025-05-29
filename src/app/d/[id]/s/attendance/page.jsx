"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  MapPin,
  User,
  BarChart3,
  AlertCircle,
  Info,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Utility function to handle MongoDB date format
const formatMongoDate = (dateObj) => {
  if (!dateObj) return null;

  // Handle MongoDB date format: {"$date": "2024-04-05T00:00:00.000Z"}
  if (typeof dateObj === "object" && dateObj.$date) {
    return new Date(dateObj.$date);
  }

  // Handle regular ISO string
  if (typeof dateObj === "string") {
    return new Date(dateObj);
  }

  return new Date(dateObj);
};

export default function LMSAttendanceSystem() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingRecords, setFetchingRecords] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    status: "",
    reason: "",
  });

  // Attendance settings state
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [settingsDetails, setSettingsDetails] = useState(null);

  // Fetch attendance settings
  const fetchSettings = async () => {
    try {
      setIsLoadingSettings(true);
      const res = await axios.get(`/api/admin/attendance-setting`);
      if (res.data?.success === true && res.data?.data) {
        const data = res.data.data;
        setSettingsDetails(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  // Fetch attendance records from API
  const fetchAttendanceRecords = async () => {
    try {
      setFetchingRecords(true);
      const response = await axios.get("/api/student/attendance");

      if (response.data.success) {
        const records = response.data.data;
        setAttendanceRecords(Array.isArray(records) ? records : []);
      } else {
        setMessage("Failed to fetch attendance records");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setMessage(
        error.response?.data?.message || "Failed to fetch attendance records"
      );
      setMessageType("error");
    } finally {
      setFetchingRecords(false);
    }
  };

  // Submit attendance to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) return;

    // Check if system is enabled
    if (!settingsDetails?.isSystemEnabled) {
      setMessage(
        "Attendance system is currently disabled. Please try again later."
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post("/api/student/attendance", {
        status: formData.status,
        reason: formData.reason || undefined,
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setMessageType("success");
        setFormData({ status: "", reason: "" });
        // Refresh attendance records immediately after submission
        await fetchAttendanceRecords();
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setMessage(
        error.response?.data?.message || "Failed to submit attendance"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchSettings();
    fetchAttendanceRecords();
  }, []);

  // Static class information
  const currentClass = {
    subject: "Advanced JavaScript",
    instructor: "Prof. Muhammad Ali",
    room: "Attendance Time",
    time: "09:00 AM - 11:00 AM",
  };

  // Create status badge component with icons
  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-rose-100 text-rose-700 border-rose-200">
            <XCircle className="w-3 h-3 mr-1" />
            Absent
          </Badge>
        );
      default:
        return null;
    }
  };

  // Calculate attendance statistics
  const stats = {
    present: Array.isArray(attendanceRecords)
      ? attendanceRecords.filter((r) => r.status === "present").length
      : 0,
    absent: Array.isArray(attendanceRecords)
      ? attendanceRecords.filter((r) => r.status === "absent").length
      : 0,
  };

  // Calculate total records and percentages
  const totalRecords = stats.present + stats.absent;
  const presentPercentage =
    totalRecords > 0 ? Math.round((stats.present / totalRecords) * 100) : 0;
  const absentPercentage =
    totalRecords > 0 ? Math.round((stats.absent / totalRecords) * 100) : 0;

  // Prepare chart data with only two bars (Present and Absent)
  const prepareChartData = () => {
    const chartData = [
      {
        status: "Present",
        percentage: presentPercentage,
        count: stats.present,
        fill: "hsl(142, 76%, 36%)", // Green color for present
      },
      {
        status: "Absent",
        percentage: absentPercentage,
        count: stats.absent,
        fill: "hsl(0, 84%, 60%)", // Red color for absent
      },
    ];

    return chartData;
  };

  const chartData = prepareChartData();

  // Chart configuration for styling
  const chartConfig = {
    percentage: {
      label: "Percentage",
    },
    present: {
      label: "Present",
      color: "hsl(142, 76%, 36%)", // Green
    },
    absent: {
      label: "Absent",
      color: "hsl(0, 84%, 60%)", // Red
    },
  };

  // Calculate attendance trend for footer
  const calculateTrend = () => {
    const isPositive = stats.present > stats.absent;
    const difference = Math.abs(stats.present - stats.absent);
    const percentage =
      totalRecords > 0 ? Math.round((difference / totalRecords) * 100) : 0;

    return {
      percentage: percentage,
      isPositive: isPositive,
    };
  };

  const trend = calculateTrend();

  if (isLoadingSettings) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading attendance system...</p>
        </div>
      </div>
    );
  }

  // Format start date for display
  const formatStartDate = (dateObj) => {
    if (!dateObj) return "Not set";
    const date = formatMongoDate(dateObj);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* System Status Alert */}
        {!settingsDetails?.isSystemEnabled && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <div className="space-y-2">
                <p className="font-medium">
                  Attendance Session is Currently Not Open
                </p>
                <p className="text-sm">
                  The attendance system will be available starting{" "}
                  <span className="font-semibold">
                    {formatStartDate(settingsDetails?.startDate)}
                  </span>
                  {settingsDetails?.openingTime &&
                    settingsDetails?.closingTime && (
                      <span>
                        {" "}
                        from {settingsDetails.openingTime} to{" "}
                        {settingsDetails.closingTime}
                      </span>
                    )}
                  . Please check back later.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Header section with class information */}
        <div
          className={`rounded-xl sm:rounded-2xl shadow-lg text-white p-4 sm:p-6 ${
            settingsDetails?.isSystemEnabled
              ? "bg-gradient-to-r from-blue-600 to-indigo-700"
              : "bg-gradient-to-r from-gray-600 to-gray-700"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {currentClass.subject}
                </h3>
                <p
                  className={`text-sm sm:text-base ${
                    settingsDetails?.isSystemEnabled
                      ? "text-blue-100"
                      : "text-gray-300"
                  }`}
                >
                  Instructor: {currentClass.instructor}
                </p>
                {!settingsDetails?.isSystemEnabled && (
                  <p className="text-gray-300 text-sm mt-1">
                    <Info className="w-4 h-4 inline mr-1" />
                    System will open on{" "}
                    {formatStartDate(settingsDetails?.startDate)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:text-right space-y-1">
              <div
                className={`flex items-center space-x-2 text-sm ${
                  settingsDetails?.isSystemEnabled
                    ? "text-blue-100"
                    : "text-gray-300"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{currentClass.room}</span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  settingsDetails?.isSystemEnabled
                    ? "text-blue-100"
                    : "text-gray-300"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>
                  {settingsDetails?.openingTime || "09:00"} -{" "}
                  {settingsDetails?.closingTime || "18:00"}
                </span>
              </div>
              {settingsDetails?.gracePeriod && (
                <div
                  className={`flex items-center space-x-2 text-xs ${
                    settingsDetails?.isSystemEnabled
                      ? "text-blue-100"
                      : "text-gray-300"
                  }`}
                >
                  <span>
                    Grace Period: {settingsDetails.gracePeriod} minutes
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Success/Error message display */}
        {message && (
          <div
            className={`rounded-xl p-4 ${
              messageType === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-rose-50 border border-rose-200 text-rose-700"
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Left sidebar with form and stats */}
          <div className="lg:col-span-1">
            {/* Attendance submission form */}
            <Card
              className={`shadow-sm pt-0 border-slate-200 h-fit ${
                !settingsDetails?.isSystemEnabled ? "opacity-60" : ""
              }`}
            >
              <CardHeader
                className={`p-2 text-white rounded-t-xl ${
                  settingsDetails?.isSystemEnabled
                    ? "bg-slate-900"
                    : "bg-gray-600"
                }`}
              >
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Mark Attendance</span>
                </CardTitle>
                <CardDescription
                  className={`text-sm ${
                    settingsDetails?.isSystemEnabled
                      ? "text-slate-300"
                      : "text-gray-300"
                  }`}
                >
                  {settingsDetails?.isSystemEnabled
                    ? "Select your attendance status"
                    : "System currently disabled"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-sm font-medium text-slate-700">
                      Select Status
                    </Label>
                    <div className="space-y-3">
                      {/* Present button */}
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!settingsDetails?.isSystemEnabled}
                        className={`w-full p-3 sm:p-4 h-auto justify-start space-x-3 transition-all duration-200 ${
                          formData.status === "present"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                            : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                        } ${
                          !settingsDetails?.isSystemEnabled
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          settingsDetails?.isSystemEnabled &&
                          setFormData({ ...formData, status: "present" })
                        }
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <div className="text-left">
                          <div className="font-medium text-sm sm:text-base">
                            Present
                          </div>
                          <div className="text-xs text-slate-500">
                            I am attending the class
                          </div>
                        </div>
                      </Button>

                      {/* Absent button */}
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!settingsDetails?.isSystemEnabled}
                        className={`w-full p-3 sm:p-4 h-auto justify-start space-x-3 transition-all duration-200 ${
                          formData.status === "absent"
                            ? "bg-rose-50 border-rose-300 text-rose-700"
                            : "border-slate-200 hover:border-rose-300 hover:bg-rose-50"
                        } ${
                          !settingsDetails?.isSystemEnabled
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          settingsDetails?.isSystemEnabled &&
                          setFormData({ ...formData, status: "absent" })
                        }
                      >
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <div className="text-left">
                          <div className="font-medium text-sm sm:text-base">
                            Absent
                          </div>
                          <div className="text-xs text-slate-500">
                            I cannot attend today
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Reason input field (only shown when absent is selected) */}
                  {formData.status === "absent" &&
                    settingsDetails?.isSystemEnabled && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="reason"
                          className="text-sm font-medium text-slate-700"
                        >
                          Reason (Optional)
                        </Label>
                        <Input
                          id="reason"
                          placeholder="Enter reason..."
                          value={formData.reason}
                          onChange={(e) =>
                            setFormData({ ...formData, reason: e.target.value })
                          }
                          className="border-slate-200 focus:border-blue-500"
                        />
                      </div>
                    )}

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className={`w-full py-2 sm:py-3 text-white disabled:opacity-50 ${
                      settingsDetails?.isSystemEnabled
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                    disabled={
                      !formData.status ||
                      loading ||
                      !settingsDetails?.isSystemEnabled
                    }
                  >
                    {loading
                      ? "Submitting..."
                      : !settingsDetails?.isSystemEnabled
                      ? "System Disabled"
                      : "Submit Attendance"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Statistics cards */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-4">
              {/* Present count card */}
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                    {stats.present}
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-600">
                    Present ({presentPercentage}%)
                  </div>
                </CardContent>
              </Card>

              {/* Absent count card */}
              <Card className="border-rose-200 bg-rose-50">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-rose-700">
                    {stats.absent}
                  </div>
                  <div className="text-xs sm:text-sm text-rose-600">
                    Absent ({absentPercentage}%)
                  </div>
                </CardContent>
              </Card>

              {/* Progress bar overview */}
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">
                      Attendance Overview
                    </span>
                  </div>
                  <div className="space-y-3">
                    {/* Present progress bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-600">Present</span>
                        <span className="text-emerald-600">
                          {presentPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-emerald-100 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${presentPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Absent progress bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-rose-600">Absent</span>
                        <span className="text-rose-600">
                          {absentPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-rose-100 rounded-full h-2">
                        <div
                          className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${absentPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-xs text-slate-500">
                      Total Records: {totalRecords}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side with chart and table */}
          <div className="lg:col-span-3 space-y-4">
            {/* Two-bar chart showing Present vs Absent percentages */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary - Present vs Absent</CardTitle>
                <CardDescription>
                  Overall attendance percentage breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    margin={{
                      left: 0,
                    }}
                  >
                    <YAxis
                      dataKey="status"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value}
                    />
                    <XAxis dataKey="percentage" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          formatter={(value, name) => [
                            `${value}% (${
                              chartData.find((d) => d.status === name)?.count ||
                              0
                            } days)`,
                            name,
                          ]}
                        />
                      }
                    />
                    <Bar dataKey="percentage" layout="vertical" radius={5} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  {trend.isPositive
                    ? "Present attendance is higher"
                    : "Absent records are higher"}{" "}
                  by {trend.percentage}%
                  <TrendingUp
                    className={`h-4 w-4 ${
                      trend.isPositive
                        ? "text-emerald-600"
                        : "text-rose-600 rotate-180"
                    }`}
                  />
                </div>
                <div className="leading-none text-muted-foreground">
                  Total attendance records: {totalRecords} days
                </div>
              </CardFooter>
            </Card>

            {/* Attendance records table */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Attendance History</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  All attendance records
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {fetchingRecords ? (
                  <div className="p-8 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    Loading attendance records...
                  </div>
                ) : Array.isArray(attendanceRecords) &&
                  attendanceRecords.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <CalendarDays className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No attendance records found</p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-slate-50 z-10">
                        <TableRow>
                          <TableHead className="font-semibold text-xs sm:text-sm">
                            Date
                          </TableHead>
                          <TableHead className="font-semibold text-xs sm:text-sm hidden sm:table-cell">
                            Created At
                          </TableHead>
                          <TableHead className="font-semibold text-xs sm:text-sm">
                            Status
                          </TableHead>
                          <TableHead className="font-semibold text-xs sm:text-sm hidden md:table-cell">
                            Reason
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceRecords.map((record) => (
                          <TableRow
                            key={record._id}
                            className="hover:bg-slate-50"
                          >
                            <TableCell className="font-medium text-xs sm:text-sm">
                              {new Date(record.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm text-slate-600 hidden sm:table-cell">
                              {new Date(record.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}{" "}
                              {new Date(record.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(record.status)}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm text-slate-600 hidden md:table-cell">
                              {record.reason === "..." ? "-" : record.reason}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
