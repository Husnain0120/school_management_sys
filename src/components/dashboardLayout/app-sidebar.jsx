"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/dashboardLayout/nav-man";

import { NavUser } from "@/components/dashboardLayout/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import axios from "axios";
import LMSSkeleton from "../Lms-skeleton";

export function AppSidebar({ ...props }) {
  // This is sample data.

  const [profile, setProfile] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const profile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/auth/user-profile`);
        const path = res.data?.data;
        setProfile(path);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    profile();
  }, []);

  const data = {
    user: {
      name: "Admin User",
      email: "admin@example.com",
      avatar: "/avatars/admin.jpg",
    },

    navMain: [
      {
        title: "Home",
        url: `d/${profile?._id}/a/home`,
        icon: BookOpen,
        isActive: true,
      },
      {
        title: "Admissions",
        url: `d/${profile?._id}/a/admissions`,
        icon: BookOpen,
        isActive: true,
      },
      {
        title: "Classes",
        url: `d/${profile?._id}/a/classes`,
        icon: Frame,
      },
      {
        title: "Students",
        url: `d/${profile?._id}/a/students`,
        icon: Map,
      },
      {
        title: "Teachers",
        url: `d/${profile?._id}/a/teachers`,
        icon: AudioWaveform,
      },
      {
        title: "Courses",
        url: `d/${profile?._id}/a/courses`,
        icon: GalleryVerticalEnd,
      },
      {
        title: "Exams & Results",
        url: `d/${profile?._id}/a/exams`,
        icon: PieChart,
      },
      {
        title: "Settings",
        url: `d/${profile?._id}/a/settings`,
        icon: Settings2,
      },
    ],
    projects: [], // optional
  };

  return (
    <div>
      {isLoading ? (
        <>
          <p>Loading....</p>
        </>
      ) : (
        <>
          <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className={"bg-zinc-700 text-white"}>
              <TeamSwitcher user={profile} loading={isLoading} />
            </SidebarHeader>
            <SidebarContent className={"bg-zinc-700 text-white "}>
              <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
              <NavUser user={profile} />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        </>
      )}
    </div>
  );
}
