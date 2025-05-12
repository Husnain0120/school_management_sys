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

// This is sample data.
const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "#",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Admissions",
      url: `d/681e29c3de82381806943021/admissions`,
      icon: BookOpen,
      isActive: true,
    },
    {
      title: "Classes",
      url: "classes",
      icon: Frame,
    },
    {
      title: "Students",
      url: "students",
      icon: Map,
    },
    {
      title: "Teachers",
      url: "teachers",
      icon: AudioWaveform,
    },
    {
      title: "Courses",
      url: "courses",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Exams & Results",
      url: "exams",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "settings/profile",
        },
        {
          title: "System Config",
          url: "settings/system",
        },
      ],
    },
  ],
  projects: [], // optional
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={"bg-zinc-700 text-white"}>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className={"bg-zinc-700 text-white "}>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
