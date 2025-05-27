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
} from "lucide-react";

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

  // Fetch attendance records
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

  // Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) return;

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
        // Refresh attendance records immediately
        await fetchAttendanceRecords();
        // Clear message after 3 seconds
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

  // Load attendance records on component mount
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const currentClass = {
    subject: "Advanced JavaScript",
    instructor: "Prof. Muhammad Ali",
    room: "Room 205",
    time: "10:00 AM - 12:00 PM",
  };

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

  const stats = {
    present: Array.isArray(attendanceRecords)
      ? attendanceRecords.filter((r) => r.status === "present").length
      : 0,
    absent: Array.isArray(attendanceRecords)
      ? attendanceRecords.filter((r) => r.status === "absent").length
      : 0,
  };

  const totalRecords = stats.present + stats.absent;
  const presentPercentage =
    totalRecords > 0 ? Math.round((stats.present / totalRecords) * 100) : 0;
  const absentPercentage =
    totalRecords > 0 ? Math.round((stats.absent / totalRecords) * 100) : 0;

  // Prepare chart data from attendance records
  const prepareChartData = () => {
    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return [];
    }

    // Create data for each date with status and count
    const chartData = attendanceRecords.slice(0, 10).map((record) => {
      const date = new Date(record.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return {
        date: date,
        count: 1,
        status: record.status,
        fill:
          record.status === "present"
            ? "hsl(142, 76%, 36%)"
            : "hsl(0, 84%, 60%)",
      };
    });

    return chartData.reverse(); // Show latest dates at top
  };

  const chartData = prepareChartData();

  const chartConfig = {
    count: {
      label: "Count",
    },
    present: {
      label: "Present",
      color: "hsl(142, 76%, 36%)", // emerald-600
    },
    absent: {
      label: "Absent",
      color: "hsl(0, 84%, 60%)", // rose-500
    },
  };

  // Calculate trend
  const calculateTrend = () => {
    if (chartData.length < 2) return { percentage: 0, isPositive: true };

    const lastMonth = chartData[chartData.length - 1];
    const previousMonth = chartData[chartData.length - 2];

    const lastMonthPresent = lastMonth.present;
    const previousMonthPresent = previousMonth.present;

    if (previousMonthPresent === 0) return { percentage: 0, isPositive: true };

    const change =
      ((lastMonthPresent - previousMonthPresent) / previousMonthPresent) * 100;
    return { percentage: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  const trend = calculateTrend();

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Current Class Info */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl shadow-lg text-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {currentClass.subject}
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">
                  Instructor: {currentClass.instructor}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:text-right space-y-1">
              <div className="flex items-center space-x-2 text-blue-100 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{currentClass.room}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100 text-sm">
                <Clock className="w-4 h-4" />
                <span>{currentClass.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
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
          {/* Attendance Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm pt-0 border-slate-200 h-fit">
              <CardHeader className="bg-slate-900 text-white rounded-t-xl">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Mark Attendance</span>
                </CardTitle>
                <CardDescription className="text-slate-300 text-sm">
                  Select your attendance status
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
                      <Button
                        type="button"
                        variant="outline"
                        className={`w-full p-3 sm:p-4 h-auto justify-start space-x-3 transition-all duration-200 ${
                          formData.status === "present"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                            : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                        }`}
                        onClick={() =>
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

                      <Button
                        type="button"
                        variant="outline"
                        className={`w-full p-3 sm:p-4 h-auto justify-start space-x-3 transition-all duration-200 ${
                          formData.status === "absent"
                            ? "bg-rose-50 border-rose-300 text-rose-700"
                            : "border-slate-200 hover:border-rose-300 hover:bg-rose-50"
                        }`}
                        onClick={() =>
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

                  {formData.status === "absent" && (
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

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 disabled:opacity-50"
                    disabled={!formData.status || loading}
                  >
                    {loading ? "Submitting..." : "Submit Attendance"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-4">
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

              {/* Attendance Chart */}
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">
                      Attendance Overview
                    </span>
                  </div>
                  <div className="space-y-3">
                    {/* Present Bar */}
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
                    {/* Absent Bar */}
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

          {/* Charts and Table */}
          <div className="lg:col-span-3 space-y-4">
            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance - Bar Chart</CardTitle>
                <CardDescription>Present vs Absent by date</CardDescription>
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
                      dataKey="date"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value}
                    />
                    <XAxis dataKey="count" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="count" layout="vertical" radius={5} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  {trend.isPositive ? "Trending up" : "Trending down"} by{" "}
                  {trend.percentage}% this month
                  <TrendingUp
                    className={`h-4 w-4 ${
                      trend.isPositive
                        ? "text-emerald-600"
                        : "text-rose-600 rotate-180"
                    }`}
                  />
                </div>
                <div className="leading-none text-muted-foreground">
                  {stats.present > stats.absent
                    ? "Present attendance is higher"
                    : "Absent records are higher"}
                </div>
              </CardFooter>
            </Card>

            {/* Attendance Records Table */}
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
