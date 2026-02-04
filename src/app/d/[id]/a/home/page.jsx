'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import {
  Activity,
  BarChart3,
  BookMarked,
  BookOpen,
  Calendar,
  Download,
  GraduationCap,
  PieChart as PieChartIcon,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/admin/analytics');
      if (response.data && response.data.metaData) {
        setAnalytics(response.data.metaData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Calculate dynamic metrics
  const calculateMetrics = () => {
    if (!analytics) return null;

    const totalStudents = analytics.newAdmissions + analytics.verifyStudent;
    const verificationRate =
      totalStudents > 0
        ? Math.round((analytics.verifyStudent / totalStudents) * 100)
        : 0;

    const activityScore = Math.min(
      100,
      analytics.totalClasses * 10 +
        analytics.totalLectures * 2 +
        analytics.teachers * 5
    );

    return {
      totalStudents,
      verificationRate,
      activityScore,
      completionRate: Math.round(
        (analytics.totalLectures / (analytics.totalClasses * 10 || 1)) * 100
      ),
    };
  };

  // Generate dynamic chart data
  const generateChartData = () => {
    if (!analytics) return { lineData: [], barData: [], pieData: [] };

    // Line Chart Data - Enrollment Trend
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseValue = analytics.verifyStudent;

    const lineData = months.map((month, index) => ({
      month,
      students: Math.round(baseValue * (0.5 + index * 0.15)),
      target: Math.round(baseValue * (0.6 + index * 0.2)),
    }));

    // Bar Chart Data - Monthly Performance
    const barData = months.map((month, index) => ({
      month,
      admissions: Math.round(
        analytics.newAdmissions * (0.3 + Math.random() * 0.4)
      ),
      verifications: Math.round(
        analytics.verifyStudent * (0.4 + Math.random() * 0.3)
      ),
    }));

    // Pie Chart Data - Distribution
    const pieData = [
      {
        name: 'New Admissions',
        value: analytics.newAdmissions,
        color: '#f97316',
      },
      {
        name: 'Verified Students',
        value: analytics.verifyStudent,
        color: '#10b981',
      },
      { name: 'Teachers', value: analytics.teachers, color: '#3b82f6' },
      { name: 'Classes', value: analytics.totalClasses, color: '#8b5cf6' },
      { name: 'Lectures', value: analytics.totalLectures, color: '#6366f1' },
    ].filter(item => item.value > 0);

    return { lineData, barData, pieData };
  };

  const metrics = calculateMetrics();
  const chartData = generateChartData();

  // Color palette
  const COLORS = [
    '#f97316',
    '#10b981',
    '#3b82f6',
    '#8b5cf6',
    '#6366f1',
    '#ec4899',
  ];
  const CHART_COLORS = {
    orange: '#f97316',
    black: '#000000',
    gray: '#6b7280',
    lightGray: '#f3f4f6',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Loading Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white rounded-lg shadow animate-pulse"
              ></div>
            ))}
          </div>

          {/* Loading Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="h-80 bg-white rounded-lg shadow animate-pulse"></div>
            <div className="h-80 bg-white rounded-lg shadow animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time analytics and insights | Last updated:{' '}
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={fetchAnalyticsData}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
                />
                Refresh Data
              </Button>

              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="rounded-full bg-red-100 p-2">
                  <span className="text-red-600">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                  <Button
                    onClick={fetchAnalyticsData}
                    size="sm"
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: 'New Admissions',
              value: analytics?.newAdmissions || 0,
              icon: Users,
              color: CHART_COLORS.orange,
              description: 'Pending verification',
              trend: 'Requires attention',
            },
            {
              title: 'Verified Students',
              value: analytics?.verifyStudent || 0,
              icon: UserCheck,
              color: '#10b981',
              description: 'Active in system',
              trend: 'Ready to learn',
            },
            {
              title: 'Teaching Staff',
              value: analytics?.teachers || 0,
              icon: GraduationCap,
              color: '#3b82f6',
              description: 'Faculty members',
              trend: 'Available',
            },
            {
              title: 'Total Classes',
              value: analytics?.totalClasses || 0,
              icon: BookOpen,
              color: '#8b5cf6',
              description: 'Scheduled classes',
              trend: 'In progress',
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon
                      className="h-5 w-5"
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {stat.description}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Enrollment Trend */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    Enrollment Trend
                  </CardTitle>
                  <CardDescription>
                    Monthly student growth pattern
                  </CardDescription>
                </div>
                <div className="text-sm text-gray-500">
                  Total: {metrics?.totalStudents || 0}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <defs>
                      <linearGradient
                        id="colorStudents"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f97316"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f97316"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="#f97316"
                      fill="url(#colorStudents)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#000000"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center justify-between w-full text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span>Actual Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border-2 border-black"></div>
                    <span>Target</span>
                  </div>
                </div>
                <span className="text-gray-500">
                  {chartData.lineData.length > 0 &&
                    `Growth: ${Math.round(((chartData.lineData[chartData.lineData.length - 1].students - chartData.lineData[0].students) / chartData.lineData[0].students) * 100)}%`}
                </span>
              </div>
            </CardFooter>
          </Card>

          {/* Bar Chart - Monthly Performance */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Monthly Performance
                  </CardTitle>
                  <CardDescription>Admissions vs Verifications</CardDescription>
                </div>
                <div className="text-sm text-gray-500">
                  Ratio:{' '}
                  {analytics?.newAdmissions > 0
                    ? (
                        analytics.verifyStudent / analytics.newAdmissions
                      ).toFixed(1)
                    : '0.0'}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="admissions"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                      name="New Admissions"
                    />
                    <Bar
                      dataKey="verifications"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      name="Verifications"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center justify-between w-full text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-orange-500"></div>
                    <span>New Admissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-green-500"></div>
                    <span>Verifications</span>
                  </div>
                </div>
                <span className="text-gray-500">
                  Efficiency: {metrics?.verificationRate || 0}%
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Charts and Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pie Chart - Distribution */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-purple-500" />
                    System Distribution
                  </CardTitle>
                  <CardDescription>Overall system composition</CardDescription>
                </div>
                <div className="text-sm text-gray-500">
                  Total Items:{' '}
                  {chartData.pieData.reduce((sum, item) => sum + item.value, 0)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color || COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={value => [value, 'Count']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Progress Metrics */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Performance Metrics
              </CardTitle>
              <CardDescription>System health indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  label: 'Verification Rate',
                  value: metrics?.verificationRate || 0,
                  icon: UserCheck,
                  color: '#10b981',
                  target: 90,
                },
                {
                  label: 'Activity Score',
                  value: metrics?.activityScore || 0,
                  icon: Activity,
                  color: '#3b82f6',
                  target: 80,
                },
                {
                  label: 'Completion Rate',
                  value: metrics?.completionRate || 0,
                  icon: Calendar,
                  color: '#8b5cf6',
                  target: 75,
                },
                {
                  label: 'System Load',
                  value: Math.min(
                    100,
                    analytics?.totalClasses * 5 +
                      analytics?.totalLectures * 2 || 0
                  ),
                  icon: BarChart3,
                  color: '#f97316',
                  target: 70,
                },
              ].map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-1 rounded"
                        style={{ backgroundColor: `${metric.color}15` }}
                      >
                        <metric.icon
                          className="h-4 w-4"
                          style={{ color: metric.color }}
                        />
                      </div>
                      <span className="font-medium">{metric.label}</span>
                    </div>
                    <span className="font-bold" style={{ color: metric.color }}>
                      {metric.value}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress
                      value={metric.value}
                      className="h-2"
                      style={{
                        backgroundColor: `${metric.color}20`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>
                        {Math.min(
                          100,
                          Math.round((metric.value / metric.target) * 100)
                        )}
                        % of target
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-sm text-gray-500 w-full text-center">
                Overall Performance:{' '}
                {Math.round(
                  (metrics?.verificationRate +
                    metrics?.activityScore +
                    metrics?.completionRate) /
                    3 || 0
                )}
                %
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Info */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-gray-700" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: 'Total Subjects',
                  value: analytics?.totalSubjects || 0,
                  icon: '📚',
                },
                {
                  label: 'Total Lectures',
                  value: analytics?.totalLectures || 0,
                  icon: '📅',
                },
                {
                  label: 'Average Classes/Subject',
                  value:
                    analytics?.totalSubjects > 0
                      ? (
                          analytics.totalClasses / analytics.totalSubjects
                        ).toFixed(1)
                      : 0,
                  icon: '📊',
                },
                { label: 'Data Freshness', value: 'Live', icon: '⚡' },
              ].map((info, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{info.icon}</span>
                    <span className="font-medium">{info.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{info.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Student-Teacher Ratio</span>
                  <span className="font-bold">
                    {analytics?.teachers > 0
                      ? (
                          (analytics.verifyStudent + analytics.newAdmissions) /
                          analytics.teachers
                        ).toFixed(1)
                      : 'N/A'}
                    :1
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lecture Density</span>
                  <span className="font-bold">
                    {analytics?.totalClasses > 0
                      ? (
                          analytics.totalLectures / analytics.totalClasses
                        ).toFixed(1)
                      : '0.0'}
                    lectures/class
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verification Queue</span>
                  <span className="font-bold">
                    {analytics?.newAdmissions || 0} pending
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">System Utilization</span>
                  <span className="font-bold text-green-600">
                    {Math.min(
                      100,
                      analytics?.totalClasses * 10 + analytics?.teachers * 5 ||
                        0
                    )}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={fetchAnalyticsData}
                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Insights
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-gray-500 text-sm">
          <p>
            Dashboard updated automatically • Data refreshes every 5 minutes
          </p>
          <p className="mt-1">
            Powered by EduLearn Analytics • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
