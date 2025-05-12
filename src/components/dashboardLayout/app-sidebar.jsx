"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
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
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Admissions",
      url: "/admissions",
      icon: BookOpen,
      isActive: true,
    },
    {
      title: "Classes",
      url: "/classes",
      icon: Frame,
    },
    {
      title: "Students",
      url: "/students",
      icon: Map,
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: AudioWaveform,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Exams & Results",
      url: "/exams",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "System Config",
          url: "/settings/system",
        },
      ],
    },
  ],
  projects: [], // optional
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* If you ever want to show projects later, add <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
