"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data
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
    avatar: "/placeholder.svg",
  },
  {
    id: "A12346",
    student: "Michael Chen",
    action: "Enrolled in course",
    course: "Introduction to Physics",
    time: "Today, 11:15 AM",
    avatar: "/placeholder.svg",
  },
  {
    id: "A12347",
    student: "Emily Rodriguez",
    action: "Completed quiz",
    course: "World History",
    time: "Yesterday, 3:40 PM",
    avatar: "/placeholder.svg",
  },
  {
    id: "A12348",
    student: "David Kim",
    action: "Posted in forum",
    course: "Computer Science 101",
    time: "Yesterday, 9:20 AM",
    avatar: "/placeholder.svg",
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

const semesters = [
  { id: 1, name: "Fall 2023", active: false },
  { id: 2, name: "Spring 2024", active: true },
  { id: 3, name: "Summer 2024", active: false },
  { id: 4, name: "Fall 2024", active: false },
];

export default function LMSAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentSemester, setCurrentSemester] = useState(
    semesters.find((sem) => sem.active)
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome to EduLearn LMS
              </h2>
              <p className="text-gray-600">
                Manage your educational institution efficiently
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="h-9 gap-1">
                <Download className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
              <Button className="h-9 gap-1">
                <Plus className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">New Course</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Students",
                value: "1,245",
                change: "+15.3%",
                icon: Users,
                color: "blue",
              },
              {
                title: "Active Courses",
                value: "42",
                change: "+4",
                icon: BookOpen,
                color: "indigo",
              },
              {
                title: "Faculty Members",
                value: "38",
                change: "+3",
                icon: GraduationCap,
                color: "purple",
              },
              {
                title: "Completion Rate",
                value: "87.5%",
                change: "+2.4%",
                icon: UserCheck,
                color: "green",
              },
            ].map((stat, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`rounded-full bg-${stat.color}-100 p-2 text-${stat.color}-600`}
                  >
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center pt-1 text-xs text-green-600">
                    <ChevronUp className="mr-1 h-3 w-3" />
                    <span>{stat.change} from last semester</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs and Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
              </TabsList>

              {/* Enhanced Current Semester Selector */}
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{currentSemester.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {semesters.map((semester) => (
                      <DropdownMenuItem
                        key={semester.id}
                        onClick={() => setCurrentSemester(semester)}
                        className={semester.active ? "bg-gray-100" : ""}
                      >
                        {semester.name}
                        {semester.active && (
                          <span className="ml-2 text-xs text-green-600">
                            Current
                          </span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-7">
                {/* Enrollment Chart */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Student Enrollment</CardTitle>
                    <CardDescription>
                      Monthly enrollment for {currentSemester.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] sm:h-[300px]">
                      <div className="flex h-full items-end gap-2">
                        {enrollmentData.map((item) => (
                          <div
                            key={item.month}
                            className="flex flex-1 flex-col items-center"
                          >
                            <div
                              className="w-full rounded-t bg-indigo-600 transition-all hover:bg-indigo-700"
                              style={{
                                height: `${(item.students / 300) * 100}%`,
                              }}
                            />
                            <span className="mt-2 text-xs text-gray-500">
                              {item.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Latest student activities in {currentSemester.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <Avatar className="h-9 w-9 mt-1">
                          <AvatarImage src={activity.avatar} />
                          <AvatarFallback>
                            {activity.student.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.student}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.action} in {activity.course}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activities
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Upcoming Classes and Performance */}
              <div className="grid gap-4 md:grid-cols-7">
                {/* Upcoming Classes */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>
                      Classes scheduled this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="rounded-lg border p-3 hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{cls.title}</h3>
                            <p className="text-sm text-gray-600">
                              {cls.instructor}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700"
                          >
                            {cls.students} students
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {cls.time}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Location: {cls.room}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Course Performance */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>
                      Key metrics for {currentSemester.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {coursePerformance.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{course.course}</h3>
                          <span className="text-sm text-gray-500">
                            {course.enrollment} enrolled
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Completion</span>
                            <span>{course.completion}%</span>
                          </div>
                          <Progress value={course.completion} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Satisfaction</span>
                            <span>{course.satisfaction}%</span>
                          </div>
                          <Progress
                            value={course.satisfaction}
                            className="h-2"
                            indicatorClassName="bg-green-500"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Frequently used administrative functions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { icon: Users, label: "Students" },
                      { icon: BookMarked, label: "Catalog" },
                      { icon: FileText, label: "Reports" },
                      { icon: PenTool, label: "Assignments" },
                    ].map((action, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="h-auto flex-col gap-2 py-4"
                      >
                        <action.icon className="h-5 w-5" />
                        <span>{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other Tabs */}
            {["courses", "students", "faculty"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <Card className="flex h-[400px] flex-col items-center justify-center">
                  <div className="text-center">
                    {tab === "courses" && (
                      <BookOpen className="mx-auto h-10 w-10 text-gray-400" />
                    )}
                    {tab === "students" && (
                      <Users className="mx-auto h-10 w-10 text-gray-400" />
                    )}
                    {tab === "faculty" && (
                      <GraduationCap className="mx-auto h-10 w-10 text-gray-400" />
                    )}
                    <h3 className="mt-4 text-lg font-medium capitalize">
                      {tab} Management
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {tab} listings and management would appear here
                    </p>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
