"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/dashboard-layout";
import {
  BookOpen,
  Calendar,
  FileText,
  Clock,
  Download,
  CheckCircle,
  XCircle,
  BarChart,
} from "lucide-react";

// Mock data
const subjects = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Ms. Amina Siddiqui",
    progress: 75,
    lectures: 12,
  },
  {
    id: 2,
    name: "Physics",
    teacher: "Mr. Tariq Jameel",
    progress: 60,
    lectures: 10,
  },
  {
    id: 3,
    name: "Chemistry",
    teacher: "Ms. Saima Nawaz",
    progress: 85,
    lectures: 14,
  },
  {
    id: 4,
    name: "English",
    teacher: "Mr. Fahad Khan",
    progress: 70,
    lectures: 8,
  },
  {
    id: 5,
    name: "Computer Science",
    teacher: "Mr. Ali Ahmed",
    progress: 90,
    lectures: 15,
  },
];

const attendance = [
  { id: 1, date: "2023-04-15", status: "present" },
  { id: 2, date: "2023-04-14", status: "present" },
  { id: 3, date: "2023-04-13", status: "absent" },
  { id: 4, date: "2023-04-12", status: "present" },
  { id: 5, date: "2023-04-11", status: "present" },
  { id: 6, date: "2023-04-10", status: "leave" },
  { id: 7, date: "2023-04-07", status: "present" },
];

const lectures = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    date: "2023-04-10",
    type: "pdf",
  },
  {
    id: 2,
    title: "Quadratic Equations",
    subject: "Mathematics",
    date: "2023-04-12",
    type: "ppt",
  },
  {
    id: 3,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    date: "2023-04-11",
    type: "pdf",
  },
  {
    id: 4,
    title: "Chemical Bonding",
    subject: "Chemistry",
    date: "2023-04-13",
    type: "pdf",
  },
  {
    id: 5,
    title: "Essay Writing",
    subject: "English",
    date: "2023-04-09",
    type: "doc",
  },
];

const schedule = [
  {
    id: 1,
    subject: "Mathematics",
    day: "Monday",
    time: "9:00 AM - 10:00 AM",
    room: "101",
  },
  {
    id: 2,
    subject: "Physics",
    day: "Monday",
    time: "11:00 AM - 12:00 PM",
    room: "102",
  },
  {
    id: 3,
    subject: "Chemistry",
    day: "Tuesday",
    time: "9:00 AM - 10:00 AM",
    room: "103",
  },
  {
    id: 4,
    subject: "English",
    day: "Tuesday",
    time: "11:00 AM - 12:00 PM",
    room: "104",
  },
  {
    id: 5,
    subject: "Computer Science",
    day: "Wednesday",
    time: "9:00 AM - 10:00 AM",
    room: "105",
  },
  {
    id: 6,
    subject: "Mathematics",
    day: "Wednesday",
    time: "11:00 AM - 12:00 PM",
    room: "101",
  },
  {
    id: 7,
    subject: "Physics",
    day: "Thursday",
    time: "9:00 AM - 10:00 AM",
    room: "102",
  },
  {
    id: 8,
    subject: "Chemistry",
    day: "Thursday",
    time: "11:00 AM - 12:00 PM",
    room: "103",
  },
  {
    id: 9,
    subject: "English",
    day: "Friday",
    time: "9:00 AM - 10:00 AM",
    room: "104",
  },
  {
    id: 10,
    subject: "Computer Science",
    day: "Friday",
    time: "11:00 AM - 12:00 PM",
    room: "105",
  },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      userRole="student"
      userName="Ahmed Student"
      userEmail="student@edumanage.com"
      navItems={[
        {
          icon: <BookOpen className="h-5 w-5" />,
          label: "Overview",
          value: "overview",
        },
        {
          icon: <FileText className="h-5 w-5" />,
          label: "Subjects & Lectures",
          value: "subjects",
        },
        {
          icon: <Calendar className="h-5 w-5" />,
          label: "Attendance",
          value: "attendance",
        },
        {
          icon: <Clock className="h-5 w-5" />,
          label: "Schedule",
          value: "schedule",
        },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="premium-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Current semester
                </p>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  Overall attendance
                </p>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Lectures</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">59</div>
                <p className="text-xs text-muted-foreground">
                  Available materials
                </p>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Progress
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground">
                  Across all subjects
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="premium-card col-span-4">
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>
                  Your progress in each subject this semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {subject.progress}%
                        </div>
                      </div>
                      <Progress
                        value={subject.progress}
                        className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[rgba(var(--rgb-accent-1),0.7)] [&>div]:to-[rgba(var(--rgb-accent-3),0.7)]"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card col-span-3">
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>
                  Your attendance for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendance.slice(0, 5).map((day) => (
                    <div
                      key={day.id}
                      className="flex items-center justify-between"
                    >
                      <div className="font-medium">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      {day.status === "present" ? (
                        <Badge className="bg-green-100 text-green-800">
                          Present
                        </Badge>
                      ) : day.status === "absent" ? (
                        <Badge className="bg-red-100 text-red-800">
                          Absent
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          On Leave
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("attendance")}
                  >
                    View Full Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your class schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Mathematics</div>
                    <Badge className="bg-gray-100 text-gray-800">
                      9:00 AM - 10:00 AM
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Room 101 • Ms. Amina Siddiqui
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Physics</div>
                    <Badge className="bg-gray-100 text-gray-800">
                      9:00 AM - 10:00 AM
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Room 102 • Mr. Tariq Jameel
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Chemistry Lab</div>
                    <Badge className="bg-gray-100 text-gray-800">
                      9:00 AM - 10:00 AM
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Lab 201 • Ms. Saima Nawaz
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("schedule")}
                >
                  View Full Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>My Subjects</CardTitle>
              <CardDescription>
                Subjects you are enrolled in this semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="premium-card overflow-hidden"
                  >
                    <div className="h-2 bg-blue-600"></div>
                    <CardHeader>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>
                        Taught by {subject.teacher}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {subject.progress}%
                          </span>
                        </div>
                        <Progress
                          value={subject.progress}
                          className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[rgba(var(--rgb-accent-1),0.7)] [&>div]:to-[rgba(var(--rgb-accent-3),0.7)]"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {subject.lectures} lectures available
                        </div>
                        <Button variant="outline" size="sm">
                          View Materials
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Lecture Materials</CardTitle>
              <CardDescription>
                Access your lecture materials and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lectures.map((lecture) => (
                    <TableRow key={lecture.id}>
                      <TableCell className="font-medium">
                        {lecture.title}
                      </TableCell>
                      <TableCell>{lecture.subject}</TableCell>
                      <TableCell>
                        {new Date(lecture.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            lecture.type === "pdf"
                              ? "bg-red-100 text-red-800"
                              : lecture.type === "ppt"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {lecture.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rgb-border rgb-border-subtle rgb-border-hover"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Attendance Record</CardTitle>
              <CardDescription>
                Your attendance record for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Present: 85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Absent: 10%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Leave: 5%</span>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Download Report
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((day) => (
                    <TableRow key={day.id}>
                      <TableCell>
                        {new Date(day.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </TableCell>
                      <TableCell>
                        {day.status === "present" ? (
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>Present</span>
                          </div>
                        ) : day.status === "absent" ? (
                          <div className="flex items-center">
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                            <span>Absent</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-yellow-500" />
                            <span>On Leave</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
              <CardDescription>
                Your attendance breakdown by subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjects.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm">
                        {Math.floor(Math.random() * 15) + 80}% Present
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${Math.floor(Math.random() * 15) + 80}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>
                        Total Classes: {Math.floor(Math.random() * 10) + 20}
                      </div>
                      <div>Present: {Math.floor(Math.random() * 10) + 15}</div>
                      <div>Absent: {Math.floor(Math.random() * 3) + 1}</div>
                      <div>On Leave: {Math.floor(Math.random() * 2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Your class schedule for the current week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-3">
                  <div className="text-center font-medium">Monday</div>
                  {schedule
                    .filter((item) => item.day === "Monday")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-3">
                        <div className="font-medium">{item.subject}</div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Room {item.room}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-3">
                  <div className="text-center font-medium">Tuesday</div>
                  {schedule
                    .filter((item) => item.day === "Tuesday")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-3">
                        <div className="font-medium">{item.subject}</div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Room {item.room}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-3">
                  <div className="text-center font-medium">Wednesday</div>
                  {schedule
                    .filter((item) => item.day === "Wednesday")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-3">
                        <div className="font-medium">{item.subject}</div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Room {item.room}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-3">
                  <div className="text-center font-medium">Thursday</div>
                  {schedule
                    .filter((item) => item.day === "Thursday")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-3">
                        <div className="font-medium">{item.subject}</div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Room {item.room}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-3">
                  <div className="text-center font-medium">Friday</div>
                  {schedule
                    .filter((item) => item.day === "Friday")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-3">
                        <div className="font-medium">{item.subject}</div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Room {item.room}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Important dates and events for your academic calendar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Mid-Term Examinations</h4>
                    <p className="text-sm text-muted-foreground">
                      May 15 - May 25, 2023
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Upcoming
                  </Badge>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Science Project Submission</h4>
                    <p className="text-sm text-muted-foreground">May 5, 2023</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Due Soon</Badge>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Parent-Teacher Meeting</h4>
                    <p className="text-sm text-muted-foreground">
                      May 30, 2023
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Summer Break</h4>
                    <p className="text-sm text-muted-foreground">
                      June 15 - August 15, 2023
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Holiday</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
