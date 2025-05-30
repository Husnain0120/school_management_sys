"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  MessageSquareDot,
  PieChart,
  Settings2,
  CalendarDays,
  Mail,
  FileText,
  ListTodo,
  Library,
  ReceiptText,
  LineChart,
  Grid3x3,
  UserRoundCog,
  ClipboardCheck,
  Phone,
  HelpCircle,
  BookMarked,
} from "lucide-react";

import { NavMain } from "@/components/adminDashboardLayout/nav-man";
import { NavUser } from "@/components/adminDashboardLayout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import axios from "axios";

export function AppSidebar({ ...props }) {
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/auth/user-profile`);
        setProfile(res.data?.data);
      } catch (error) {
        console.log("Failed to load user profile", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  // 🧠 Role-based route generator
  const generateNavRoutes = (role, id) => {
    const base = `d/${id}`;

    if (role === "admin") {
      return [
        { title: "Home", url: `${base}/a/home`, icon: Home },
        { title: "Admissions", url: `${base}/a/admissions`, icon: BookOpen },
        { title: "Classes", url: `${base}/a/classes`, icon: Frame },
        { title: "Students", url: `${base}/a/students`, icon: Map },
        // { title: "Teachers", url: `${base}/a/teachers`, icon: AudioWaveform },
        // {
        //   title: "Courses",
        //   url: `${base}/a/courses`,
        //   icon: GalleryVerticalEnd,
        // },
        // { title: "Exams & Results", url: `${base}/a/exams`, icon: PieChart },
        // {
        //   title: "Notices board",
        //   url: `${base}/a/noticesboard`,
        //   icon: MessageSquareDot,
        // },
        { title: "Settings", url: `${base}/a/settings`, icon: Settings2 },
      ];
    }

    if (role === "teacher") {
      return [
        { title: "Home", url: `${base}/t/home`, icon: Home },
        { title: "My Subjects", url: `${base}/t/subjects`, icon: Frame },
        // { title: "Students", url: `${base}/t/students`, icon: Map },
        // {
        //   title: "Courses",
        //   url: `${base}/t/courses`,
        //   icon: GalleryVerticalEnd,
        // },
        // { title: "Exams", url: `${base}/t/exams`, icon: PieChart },
        // {
        //   title: "Announcements",
        //   url: `${base}/t/announcements`,
        //   icon: MessageSquareDot,
        // },
        // {
        //   title: "Lecture Schedule",
        //   url: `${base}/t/lecture-schedule`,
        //   icon: CalendarDays,
        // },
        // { title: "Grade Book", url: `${base}/t/grade-book`, icon: Library },
        // { title: "Mail", url: `${base}/t/mail`, icon: Mail },
        // { title: "Notes", url: `${base}/t/notes`, icon: FileText },
        // { title: "Progress", url: `${base}/t/progress`, icon: LineChart },
        // {
        //   title: "Course Management",
        //   url: `${base}/t/course-management`,
        //   icon: BookMarked,
        // },
        // { title: "Settings", url: `${base}/t/settings`, icon: Settings2 },
      ];
    }

    if (role === "student") {
      return [
        { title: "Home", url: `${base}/s/home`, icon: Home },
        { title: "Attendance", url: `${base}/s/attendance`, icon: ListTodo },
        // { title: "Grade Book", url: `${base}/s/grade-book`, icon: Library },
        // {
        //   title: "Account Book",
        //   url: `${base}/s/account-book`,
        //   icon: ReceiptText,
        // },
        // { title: "Progress", url: `${base}/s/progress`, icon: LineChart },
        // {
        //   title: "Lecture Schedule",
        //   url: `${base}/s/lecture-schedule`,
        //   icon: CalendarDays,
        // },
        // { title: "Mail", url: `${base}/s/mail`, icon: Mail },
        // { title: "Notes", url: `${base}/s/notes`, icon: FileText },
        // {
        //   title: "My Study Scheme",
        //   url: `${base}/s/study-scheme`,
        //   icon: Settings2,
        // },
        // {
        //   title: "My Studied Courses",
        //   url: `${base}/s/studied-courses`,
        //   icon: Grid3x3,
        // },
        // {
        //   title: "Student Services",
        //   url: `${base}/s/student-services`,
        //   icon: UserRoundCog,
        // },
        // {
        //   title: "Course Selection",
        //   url: `${base}/s/course-selection`,
        //   icon: ClipboardCheck,
        // },
        // { title: "Contact Us", url: `${base}/s/contact`, icon: Phone },
        // { title: "Help", url: `${base}/s/help`, icon: HelpCircle },
      ];
    }

    return [];
  };

  const navMain = profile ? generateNavRoutes(profile.role, profile._id) : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-zinc-700 text-white">
        <TeamSwitcher user={profile} loading={isLoading} />
      </SidebarHeader>
      <SidebarContent className="bg-zinc-700 text-white">
        <NavMain items={navMain} loading={isLoading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile} loading={isLoading} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
