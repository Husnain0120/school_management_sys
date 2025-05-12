"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronUp,
  Clock,
  Download,
  FileText,
  GraduationCap,
  MoreHorizontal,
  PenTool,
  Plus,
  Search,
  Settings,
  Users,
  UserCheck,
  BookMarked,
  School,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for the LMS dashboard
const enrollmentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 150 },
  { month: "Mar", students: 180 },
  { month: "Apr", students: 210 },
  { month: "May", students: 250 },
  { month: "Jun", students: 280 },
];

const recentActivities = [
  {
    id: "A12345",
    student: "Sarah Johnson",
    action: "Submitted assignment",
    course: "Advanced Mathematics",
    time: "Today, 2:30 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "A12346",
    student: "Michael Chen",
    action: "Enrolled in course",
    course: "Introduction to Physics",
    time: "Today, 11:15 AM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "A12347",
    student: "Emily Rodriguez",
    action: "Completed quiz",
    course: "World History",
    time: "Yesterday, 3:40 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "A12348",
    student: "David Kim",
    action: "Posted in forum",
    course: "Computer Science 101",
    time: "Yesterday, 9:20 AM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

const upcomingClasses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Robert Smith",
    time: "Today, 10:00 AM - 11:30 AM",
    students: 28,
    room: "Room 101",
  },
  {
    id: 2,
    title: "Introduction to Physics",
    instructor: "Prof. Maria Garcia",
    time: "Today, 1:00 PM - 2:30 PM",
    students: 35,
    room: "Lab 3B",
  },
  {
    id: 3,
    title: "World History",
    instructor: "Dr. James Wilson",
    time: "Tomorrow, 9:00 AM - 10:30 AM",
    students: 42,
    room: "Room 205",
  },
];

const coursePerformance = [
  {
    id: 1,
    course: "Computer Science 101",
    enrollment: 120,
    completion: 85,
    satisfaction: 92,
  },
  {
    id: 2,
    course: "Business Administration",
    enrollment: 95,
    completion: 78,
    satisfaction: 88,
  },
  {
    id: 3,
    course: "Graphic Design Fundamentals",
    enrollment: 65,
    completion: 92,
    satisfaction: 95,
  },
];

export default function LMSAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Top Navigation */}
      {/* <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-4">
          <School className="h-6 w-6 text-indigo-600" />
          <h1 className="text-lg font-semibold">LMS Admin Dashboard</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search courses, students..."
              className="rounded-md border border-gray-200 bg-gray-50 pl-8 pr-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Notifications</span>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              5
            </span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Settings</span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@edulearn.com</p>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome to EduLearn LMS
              </h2>
              <p className="text-gray-500">
                Manage your educational institution efficiently.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button className="h-9">
                <Plus className="mr-2 h-4 w-4" />
                Add New Course
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Students
                </CardTitle>
                <div className="rounded-full bg-blue-100 p-1 text-blue-600">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  <span>+15.3% from last semester</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Active Courses
                </CardTitle>
                <div className="rounded-full bg-indigo-100 p-1 text-indigo-600">
                  <BookOpen className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  <span>+4 from last semester</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Faculty Members
                </CardTitle>
                <div className="rounded-full bg-purple-100 p-1 text-purple-600">
                  <GraduationCap className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  <span>+3 new this semester</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Completion Rate
                </CardTitle>
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <UserCheck className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  <span>+2.4% from last semester</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs and Charts */}
          <Tabs
            defaultValue="overview"
            className="space-y-4"
            onValueChange={setActiveTab}
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Current Semester
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-7">
                {/* Enrollment Chart */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Student Enrollment</CardTitle>
                    <CardDescription>
                      Monthly enrollment for the current year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <div className="flex h-full items-end gap-2">
                        {enrollmentData.map((item) => (
                          <div
                            key={item.month}
                            className="relative flex w-full flex-col items-center"
                          >
                            <div
                              className="w-full rounded-t bg-indigo-600"
                              style={{
                                height: `${(item.students / 300) * 100}%`,
                              }}
                            ></div>
                            <span className="mt-2 text-xs">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="md:col-span-3">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-1">
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>
                        Latest student activities
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-4"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={activity.avatar || "/placeholder.svg"}
                              alt={activity.student}
                            />
                            <AvatarFallback>
                              {activity.student.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.student}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.action} in{" "}
                              <span className="font-medium">
                                {activity.course}
                              </span>
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activities
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Upcoming Classes and Course Performance */}
              <div className="grid gap-4 md:grid-cols-7">
                {/* Upcoming Classes */}
                <Card className="md:col-span-3">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-1">
                      <CardTitle>Upcoming Classes</CardTitle>
                      <CardDescription>
                        Classes scheduled for today and tomorrow
                      </CardDescription>
                    </div>
                    <Button size="sm" className="ml-auto">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className="rounded-lg border border-gray-100 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {cls.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {cls.students} students
                            </Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-3.5 w-3.5" />
                              <span>{cls.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{cls.time}</span>
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Location: {cls.room}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Performance */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>
                      Enrollment, completion, and satisfaction rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {coursePerformance.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {course.course}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {course.enrollment} students
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Completion Rate</span>
                              <span className="font-medium">
                                {course.completion}%
                              </span>
                            </div>
                            <Progress
                              value={course.completion}
                              className="h-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Satisfaction Rate</span>
                              <span className="font-medium">
                                {course.satisfaction}%
                              </span>
                            </div>
                            <Progress
                              value={course.satisfaction}
                              className="h-2"
                              indicatorClassName="bg-green-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Courses
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Frequently used administrative actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <Button
                      variant="outline"
                      className="h-auto flex-col items-center justify-center py-4"
                    >
                      <Users className="mb-2 h-6 w-6" />
                      <span>Manage Students</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex-col items-center justify-center py-4"
                    >
                      <BookMarked className="mb-2 h-6 w-6" />
                      <span>Course Catalog</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex-col items-center justify-center py-4"
                    >
                      <FileText className="mb-2 h-6 w-6" />
                      <span>Grade Reports</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex-col items-center justify-center py-4"
                    >
                      <PenTool className="mb-2 h-6 w-6" />
                      <span>Create Assignment</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="courses"
              className="h-[400px] rounded-lg border border-dashed flex items-center justify-center"
            >
              <div className="text-center">
                <BookOpen className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Courses Management</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Course listings and management would appear here
                </p>
              </div>
            </TabsContent>
            <TabsContent
              value="students"
              className="h-[400px] rounded-lg border border-dashed flex items-center justify-center"
            >
              <div className="text-center">
                <Users className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Student Management</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Student listings and profiles would appear here
                </p>
              </div>
            </TabsContent>
            <TabsContent
              value="faculty"
              className="h-[400px] rounded-lg border border-dashed flex items-center justify-center"
            >
              <div className="text-center">
                <GraduationCap className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Faculty Management</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Faculty listings and profiles would appear here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
