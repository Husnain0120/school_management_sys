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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/dashboard-layout";
import {
  UserPlus,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
  Settings,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock data
const admissionApplications = [
  {
    id: 1,
    name: "Ahmed Khan",
    grade: "10",
    date: "2023-04-15",
    status: "pending",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    grade: "8",
    date: "2023-04-14",
    status: "approved",
  },
  {
    id: 3,
    name: "Bilal Malik",
    grade: "5",
    date: "2023-04-13",
    status: "pending",
  },
  {
    id: 4,
    name: "Ayesha Tariq",
    grade: "12",
    date: "2023-04-12",
    status: "rejected",
  },
  {
    id: 5,
    name: "Usman Ali",
    grade: "7",
    date: "2023-04-11",
    status: "pending",
  },
];

const classes = [
  { id: 1, name: "Class 5-A", students: 32, teacher: "Mr. Fahad Khan" },
  { id: 2, name: "Class 7-B", students: 28, teacher: "Ms. Amina Siddiqui" },
  { id: 3, name: "Class 10-C", students: 35, teacher: "Mr. Tariq Jameel" },
  { id: 4, name: "Class 12-A", students: 30, teacher: "Ms. Saima Nawaz" },
];

const teachers = [
  {
    id: 1,
    name: "Fahad Khan",
    subject: "Mathematics",
    classes: ["5-A", "6-B"],
    status: "active",
  },
  {
    id: 2,
    name: "Amina Siddiqui",
    subject: "Science",
    classes: ["7-B", "8-A"],
    status: "active",
  },
  {
    id: 3,
    name: "Tariq Jameel",
    subject: "English",
    classes: ["10-C", "9-A"],
    status: "on leave",
  },
  {
    id: 4,
    name: "Saima Nawaz",
    subject: "Physics",
    classes: ["12-A", "11-B"],
    status: "active",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      userRole="admin"
      userName="Muhammad Admin"
      userEmail="admin@edumanage.com"
      navItems={[
        {
          icon: <GraduationCap className="h-5 w-5" />,
          label: "Overview",
          value: "overview",
        },
        {
          icon: <UserPlus className="h-5 w-5" />,
          label: "Admissions",
          value: "admissions",
        },
        {
          icon: <BookOpen className="h-5 w-5" />,
          label: "Classes",
          value: "classes",
        },
        {
          icon: <Users className="h-5 w-5" />,
          label: "Teachers",
          value: "teachers",
        },
        {
          icon: <FileText className="h-5 w-5" />,
          label: "Reports",
          value: "reports",
        },
        {
          icon: <Settings className="h-5 w-5" />,
          label: "Settings",
          value: "settings",
        },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Teachers
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Classes
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">
                  Across all grades
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Admissions
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Requires review</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Admission Applications</CardTitle>
                <CardDescription>
                  Latest applications requiring your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admissionApplications.slice(0, 5).map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">
                          {application.name}
                        </TableCell>
                        <TableCell>{application.grade}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              application.status === "approved"
                                ? "success"
                                : application.status === "rejected"
                                ? "destructive"
                                : "outline"
                            }
                            className={
                              application.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : application.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {application.status.charAt(0).toUpperCase() +
                              application.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("admissions")}
                  >
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Class Distribution</CardTitle>
                <CardDescription>
                  Student distribution across grades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Primary (Grades 1-5)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        425 students
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-black"
                        style={{ width: "34%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Middle (Grades 6-8)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        312 students
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-black"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Secondary (Grades 9-10)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        286 students
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-black"
                        style={{ width: "23%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Higher Secondary (Grades 11-12)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        225 students
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-black"
                        style={{ width: "18%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("classes")}
                  >
                    Manage Classes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admissions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Admission Applications</CardTitle>
                <CardDescription>
                  Review and manage student admission applications
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search applications..."
                    className="w-[250px] pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Applied Grade</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admissionApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.name}
                      </TableCell>
                      <TableCell>{application.grade}</TableCell>
                      <TableCell>
                        {new Date(application.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "success"
                              : application.status === "rejected"
                              ? "destructive"
                              : "outline"
                          }
                          className={
                            application.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : application.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {application.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Class Management</CardTitle>
                <CardDescription>
                  Create, edit and manage school classes
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Class</DialogTitle>
                    <DialogDescription>
                      Add a new class to the school system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="className">Class Name</Label>
                      <Input id="className" placeholder="e.g. Class 8-A" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classTeacher">Class Teacher</Label>
                      <Select>
                        <SelectTrigger id="classTeacher">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Fahad Khan</SelectItem>
                          <SelectItem value="2">Amina Siddiqui</SelectItem>
                          <SelectItem value="3">Tariq Jameel</SelectItem>
                          <SelectItem value="4">Saima Nawaz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classCapacity">Maximum Capacity</Label>
                      <Input
                        id="classCapacity"
                        type="number"
                        placeholder="e.g. 40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classRoom">Room Number</Label>
                      <Input id="classRoom" placeholder="e.g. 101" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Class</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Class Teacher</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.students}</TableCell>
                      <TableCell>{classItem.teacher}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View Students
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
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

        <TabsContent value="teachers" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Teacher Management</CardTitle>
                <CardDescription>
                  Manage teacher profiles and assignments
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogDescription>
                      Create a new teacher profile in the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="First name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject Specialization</Label>
                      <Select>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="geography">Geography</SelectItem>
                          <SelectItem value="computer">
                            Computer Science
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Teacher</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Assigned Classes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32`}
                              alt={teacher.name}
                            />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{teacher.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.classes.join(", ")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher.status === "active" ? "success" : "outline"
                          }
                          className={
                            teacher.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {teacher.status.charAt(0).toUpperCase() +
                            teacher.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Assign Classes
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
