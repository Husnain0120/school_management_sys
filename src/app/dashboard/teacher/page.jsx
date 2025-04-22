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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/dashboard-layout";
import {
  BookOpen,
  Users,
  FileText,
  Upload,
  Calendar,
  PlusCircle,
} from "lucide-react";

// Mock data
const assignedClasses = [
  {
    id: 1,
    name: "Class 10-A",
    subject: "Mathematics",
    students: 35,
    schedule: "Mon, Wed, Fri 9:00 AM",
  },
  {
    id: 2,
    name: "Class 10-B",
    subject: "Mathematics",
    students: 32,
    schedule: "Mon, Wed, Fri 11:00 AM",
  },
  {
    id: 3,
    name: "Class 9-A",
    subject: "Mathematics",
    students: 38,
    schedule: "Tue, Thu 10:00 AM",
  },
];

const students = [
  { id: 1, name: "Ahmed Khan", rollNumber: "10A-01", attendance: "present" },
  { id: 2, name: "Sara Ahmed", rollNumber: "10A-02", attendance: "present" },
  { id: 3, name: "Bilal Malik", rollNumber: "10A-03", attendance: "absent" },
  { id: 4, name: "Ayesha Tariq", rollNumber: "10A-04", attendance: "present" },
  { id: 5, name: "Usman Ali", rollNumber: "10A-05", attendance: "leave" },
  { id: 6, name: "Fatima Khan", rollNumber: "10A-06", attendance: "present" },
  { id: 7, name: "Hassan Ahmed", rollNumber: "10A-07", attendance: "present" },
  { id: 8, name: "Zainab Malik", rollNumber: "10A-08", attendance: "absent" },
];

const lectures = [
  {
    id: 1,
    title: "Introduction to Algebra",
    class: "10-A",
    date: "2023-04-10",
    status: "published",
  },
  {
    id: 2,
    title: "Quadratic Equations",
    class: "10-A",
    date: "2023-04-12",
    status: "draft",
  },
  {
    id: 3,
    title: "Linear Equations",
    class: "9-A",
    date: "2023-04-11",
    status: "published",
  },
  {
    id: 4,
    title: "Geometry Basics",
    class: "10-B",
    date: "2023-04-13",
    status: "published",
  },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <DashboardLayout
      userRole="teacher"
      userName="Ms. Amina Teacher"
      userEmail="teacher@edumanage.com"
      navItems={[
        {
          icon: <BookOpen className="h-5 w-5" />,
          label: "Overview",
          value: "overview",
        },
        {
          icon: <Users className="h-5 w-5" />,
          label: "Attendance",
          value: "attendance",
        },
        {
          icon: <FileText className="h-5 w-5" />,
          label: "Lectures",
          value: "lectures",
        },
        {
          icon: <Calendar className="h-5 w-5" />,
          label: "Schedule",
          value: "schedule",
        },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Assigned Classes
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  For current semester
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">105</div>
                <p className="text-xs text-muted-foreground">
                  Across all classes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Uploaded Lectures
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
              <CardDescription>
                Classes assigned to you for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.subject}</TableCell>
                      <TableCell>{classItem.students}</TableCell>
                      <TableCell>{classItem.schedule}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedClass(classItem.name.split("-")[1]);
                              setActiveTab("attendance");
                            }}
                          >
                            Take Attendance
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveTab("lectures")}
                          >
                            Upload Lecture
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance Management</CardTitle>
                <CardDescription>
                  Take and manage student attendance
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="attendanceClass">Class:</Label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger id="attendanceClass" className="w-[120px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-A">Class 10-A</SelectItem>
                      <SelectItem value="10-B">Class 10-B</SelectItem>
                      <SelectItem value="9-A">Class 9-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="attendanceDate">Date:</Label>
                  <Input
                    id="attendanceDate"
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="w-[150px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center">Leave</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="present"
                          defaultChecked={student.attendance === "present"}
                          className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="absent"
                          defaultChecked={student.attendance === "absent"}
                          className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="leave"
                          defaultChecked={student.attendance === "leave"}
                          className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Attendance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lectures" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lecture Materials</CardTitle>
                <CardDescription>
                  Manage and upload lecture materials for your classes
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload New Lecture
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Lecture Material</DialogTitle>
                    <DialogDescription>
                      Add new lecture materials for your students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="lectureTitle">Lecture Title</Label>
                      <Input
                        id="lectureTitle"
                        placeholder="e.g. Introduction to Algebra"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lectureClass">Class</Label>
                      <Select>
                        <SelectTrigger id="lectureClass">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10-A">Class 10-A</SelectItem>
                          <SelectItem value="10-B">Class 10-B</SelectItem>
                          <SelectItem value="9-A">Class 9-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lectureDescription">Description</Label>
                      <Textarea
                        id="lectureDescription"
                        placeholder="Brief description of the lecture content"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lectureFile">Upload File</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="lectureFile"
                          type="file"
                          className="file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <Button type="button" size="icon" variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supported formats: PDF, PPTX, DOCX, MP4 (max 50MB)
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Upload Lecture</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lectures.map((lecture) => (
                    <TableRow key={lecture.id}>
                      <TableCell className="font-medium">
                        {lecture.title}
                      </TableCell>
                      <TableCell>{lecture.class}</TableCell>
                      <TableCell>
                        {new Date(lecture.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            lecture.status === "published"
                              ? "success"
                              : "outline"
                          }
                          className={
                            lecture.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {lecture.status.charAt(0).toUpperCase() +
                            lecture.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {lecture.status === "draft" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                            >
                              Publish
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-yellow-600 hover:text-yellow-700"
                            >
                              Unpublish
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
