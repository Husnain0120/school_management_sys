'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  ChartBar,
  Eye,
  GraduationCap,
  Grid3x3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  RefreshCw,
  School,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('year');
  const [activeView, setActiveView] = useState('overview');
  const [currentDate, setCurrentDate] = useState('');

  // Initialize current date after component mounts (client-side only)
  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/analytics');

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error(
          'Server returned invalid format. Please check the endpoint.'
        );
      }

      const data = await response.json();
      setAnalytics(data.metaData || data);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Use useMemo to avoid recalculations on every render
  const processedData = useMemo(() => {
    if (!analytics) return { chartData: [], yearlyData: [], quarterlyData: [] };

    const monthlyData = analytics.monthlyAdmissions || [];

    // Sort data properly without Date constructor issues
    const chartData = monthlyData
      .map(item => ({
        month: item.month,
        year: item.year,
        monthShort: item.month.slice(0, 3),
        count: item.count || 0,
        label: `${item.month} ${item.year}`,
        // Calculate quarter without Date constructor
        quarter: Math.floor(
          ([
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ].indexOf(item.month.slice(0, 3)) +
            3) /
            3
        ),
      }))
      .sort((a, b) => {
        // Simple sort by year and month index
        const monthOrder = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const monthIndexA = monthOrder.indexOf(a.monthShort);
        const monthIndexB = monthOrder.indexOf(b.monthShort);

        if (a.year !== b.year) return a.year - b.year;
        return monthIndexA - monthIndexB;
      });

    // Group by year
    const years = [...new Set(chartData.map(item => item.year))].sort();
    const yearlyData = years.map(year => {
      const yearData = chartData.filter(item => item.year === year);
      const total = yearData.reduce((sum, item) => sum + item.count, 0);
      const avg = yearData.length > 0 ? Math.round(total / yearData.length) : 0;
      const maxMonth = yearData.reduce(
        (max, item) => (item.count > max.count ? item : max),
        { count: 0, month: '' }
      );

      return {
        year,
        total,
        avg,
        maxMonth: maxMonth.month,
        maxCount: maxMonth.count,
        data: yearData,
        growth:
          yearData.length >= 2
            ? (
                ((yearData[yearData.length - 1].count -
                  yearData[yearData.length - 2].count) /
                  yearData[yearData.length - 2].count) *
                100
              ).toFixed(1)
            : '0',
      };
    });

    // Prepare bar chart data (aggregated by quarter)
    const quarterlyData = [];
    chartData.forEach(item => {
      const quarterKey = `Q${item.quarter} ${item.year}`;
      const existing = quarterlyData.find(q => q.quarter === quarterKey);
      if (existing) {
        existing.count += item.count;
      } else {
        quarterlyData.push({
          quarter: quarterKey,
          year: item.year,
          quarterNum: item.quarter,
          count: item.count,
        });
      }
    });

    // Sort quarterly data
    quarterlyData.sort(
      (a, b) => a.year - b.year || a.quarterNum - b.quarterNum
    );

    return { chartData, yearlyData, quarterlyData };
  }, [analytics]);

  const { chartData, yearlyData, quarterlyData } = processedData;

  // Current year data for main chart
  const currentYear =
    yearlyData.length > 0
      ? yearlyData[yearlyData.length - 1]?.year
      : new Date().getFullYear();
  const currentYearData = chartData.filter(item => item.year === currentYear);

  // Stats data - memoized to prevent recalculation
  const stats = useMemo(() => {
    const totalAdmissions =
      (analytics?.newAdmissions || 0) + (analytics?.verifyStudent || 0);

    return [
      {
        label: 'Total Admissions',
        value: totalAdmissions,
        change: '+12.5%',
        trend: 'up',
        icon: <Users className="h-5 w-5" />,
        color: 'bg-gradient-to-br from-orange-500 to-amber-500',
      },
      {
        label: 'Active Students',
        value: analytics?.verifyStudent || 0,
        change: '+8.2%',
        trend: 'up',
        icon: <GraduationCap className="h-5 w-5" />,
        color: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      },
      {
        label: 'Teaching Staff',
        value: analytics?.teachers || 0,
        change: '+3.7%',
        trend: 'up',
        icon: <School className="h-5 w-5" />,
        color: 'bg-gradient-to-br from-yellow-500 to-orange-400',
      },
      {
        label: 'Classes & Subjects',
        value: `${analytics?.totalClasses || 0}/${analytics?.totalSubjects || 0}`,
        change: '+5.1%',
        trend: 'up',
        icon: <BookOpen className="h-5 w-5" />,
        color: 'bg-gradient-to-br from-orange-400 to-red-400',
      },
    ];
  }, [analytics]);

  // Performance data - static to avoid hydration issues
  const performanceData = [
    { name: 'Admissions', value: 85, fill: '#f97316' },
    { name: 'Retention', value: 72, fill: '#fb923c' },
    { name: 'Growth', value: 91, fill: '#fbbf24' },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3">
          <p className="font-semibold text-gray-900">{label}</p>
          <div className="mt-1 space-y-1">
            {payload.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{entry.name}:</span>
                </div>
                <span className="font-bold text-gray-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
            <BarChart3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Loading Analytics
          </h3>
          <p className="text-gray-500">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-gray-900">Connection Failed</CardTitle>
            <CardDescription className="text-gray-600">
              Could not connect to analytics API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-100 px-3 py-2 rounded inline-block">
                GET /api/admin/analytics
              </code>
              <p className="text-sm text-red-600 mt-2">{error}</p>
            </div>
            <button
              onClick={fetchAnalytics}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChartBar className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No Data Available
          </h3>
          <p className="text-gray-500 mb-4">
            Analytics data is not available at the moment
          </p>
          <button
            onClick={fetchAnalytics}
            className="bg-orange-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-orange-600 transition"
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Analytics Dashboard
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {['overview', 'detailed', 'comparison'].map(view => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      activeView === view
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div> */}

              <button
                onClick={fetchAnalytics}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Analytics Overview
              </h2>
              <p className="text-gray-600">
                Comprehensive view of institutional metrics
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['month', 'quarter', 'year', 'all'].map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      timeRange === range
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Admissions Trend - Line Chart */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    Admissions Trend
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Monthly admissions for {currentYear}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Current Year
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentYearData.length > 0 ? (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentYearData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis
                        dataKey="monthShort"
                        stroke="#6b7280"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#6b7280"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center">
                  <LineChartIcon className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500">No data for current year</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quarterly Comparison - Bar Chart */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <ChartBar className="h-5 w-5 text-orange-500" />
                    Quarterly Admissions
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Quarterly comparison across years
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  All Years
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {quarterlyData.length > 0 ? (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis
                        dataKey="quarter"
                        stroke="#6b7280"
                        axisLine={false}
                        tickLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        stroke="#6b7280"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="count"
                        name="Admissions"
                        radius={[4, 4, 0, 0]}
                      >
                        {quarterlyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? '#f97316' : '#fb923c'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center">
                  <ChartBar className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500">No quarterly data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Yearly Performance - Bar Chart */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    Yearly Performance
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Total admissions by year
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Historical Data
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {yearlyData.length > 0 ? (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis
                        dataKey="year"
                        stroke="#6b7280"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#6b7280"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        formatter={value => [`${value} admissions`, 'Total']}
                      />
                      <Bar
                        dataKey="total"
                        name="Total Admissions"
                        radius={[4, 4, 0, 0]}
                      >
                        {yearlyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === yearlyData.length - 1
                                ? '#f97316'
                                : '#e5e7eb'
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center">
                  <Activity className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500">No yearly data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Distribution - Pie Chart */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-orange-500" />
                    User Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Breakdown by user categories
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  Overview
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center">
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Students',
                            value: analytics.verifyStudent || 0,
                            color: '#f97316',
                          },
                          {
                            name: 'Teachers',
                            value: analytics.teachers || 0,
                            color: '#fb923c',
                          },
                          {
                            name: 'New Admissions',
                            value: analytics.newAdmissions || 0,
                            color: '#fbbf24',
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          {
                            name: 'Students',
                            value: analytics.verifyStudent || 0,
                            color: '#f97316',
                          },
                          {
                            name: 'Teachers',
                            value: analytics.teachers || 0,
                            color: '#fb923c',
                          },
                          {
                            name: 'New Admissions',
                            value: analytics.newAdmissions || 0,
                            color: '#fbbf24',
                          },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 lg:mt-0 lg:ml-6 space-y-3">
                  {[
                    {
                      name: 'Verified Students',
                      value: analytics.verifyStudent || 0,
                      color: '#f97316',
                    },
                    {
                      name: 'Teaching Staff',
                      value: analytics.teachers || 0,
                      color: '#fb923c',
                    },
                    {
                      name: 'New Admissions',
                      value: analytics.newAdmissions || 0,
                      color: '#fbbf24',
                    },
                    {
                      name: 'Classes',
                      value: analytics.totalClasses || 0,
                      color: '#e5e7eb',
                    },
                    {
                      name: 'Subjects',
                      value: analytics.totalSubjects || 0,
                      color: '#d1d5db',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Data Table */}
          <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Grid3x3 className="h-5 w-5 text-orange-500" />
                Detailed Monthly Data
              </CardTitle>
              <CardDescription className="text-gray-600">
                Complete monthly admissions breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Year
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Month
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Admissions
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {chartData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <span className="font-medium text-gray-900">
                                {row.year}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <span className="font-medium text-gray-700">
                                  {row.monthShort}
                                </span>
                              </div>
                              <span className="text-gray-700">{row.month}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">
                                {row.count}
                              </span>
                              <span className="text-sm text-gray-500">
                                admissions
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                row.count >= 10
                                  ? 'bg-green-100 text-green-800'
                                  : row.count >= 5
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {row.count >= 10
                                ? 'High'
                                : row.count >= 5
                                  ? 'Medium'
                                  : 'Low'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Grid3x3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No monthly data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-500" />
                Performance Metrics
              </CardTitle>
              <CardDescription className="text-gray-600">
                Key performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Radial Chart */}
                <div className="text-center">
                  <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        innerRadius="30%"
                        outerRadius="80%"
                        data={performanceData}
                        startAngle={180}
                        endAngle={0}
                      >
                        <RadialBar
                          label={{ fill: '#111827', position: 'insideStart' }}
                          background
                          dataKey="value"
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Metrics List */}
                <div className="space-y-4">
                  {[
                    {
                      label: 'Admission Rate',
                      value: '85%',
                      color: 'text-green-600',
                    },
                    {
                      label: 'Student Retention',
                      value: '92%',
                      color: 'text-green-600',
                    },
                    {
                      label: 'Teacher Ratio',
                      value: '1:15',
                      color: 'text-blue-600',
                    },
                    {
                      label: 'Class Utilization',
                      value: '78%',
                      color: 'text-amber-600',
                    },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="text-lg font-bold text-gray-900">
                          {metric.value}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${metric.color}`}>
                          Stable
                        </p>
                        <p className="text-xs text-gray-500">Current</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {yearlyData.map((year, index) => (
            <Card key={year.year} className="border border-gray-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index === 0
                          ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                          : index === 1
                            ? 'bg-gradient-to-br from-amber-500 to-yellow-500'
                            : index === 2
                              ? 'bg-gradient-to-br from-yellow-500 to-orange-400'
                              : 'bg-gradient-to-br from-orange-400 to-red-400'
                      }`}
                    >
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {year.year} Summary
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {year.total} Total
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monthly Avg</span>
                    <span className="font-semibold text-gray-900">
                      {year.avg}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Peak Month</span>
                    <span className="font-semibold text-gray-900">
                      {year.maxMonth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth</span>
                    <span
                      className={`font-semibold ${parseFloat(year.growth) > 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {parseFloat(year.growth) > 0 ? '+' : ''}
                      {year.growth}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Data last updated: {currentDate || 'Loading...'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                System Status: Operational
              </div>
              {/* <div className="text-sm text-gray-600">
                Endpoint:{' '}
                <code className="ml-1 bg-gray-100 px-2 py-1 rounded text-xs">
                  /api/admin/analytics
                </code>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
