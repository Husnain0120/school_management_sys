"use client";

import * as React from "react";
import { GraduationCap } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarHeaderSkeleton } from "../skeleton/Sidebar-header-skeleton";
import AdminVerifiedBadge from "../verify-badge/Admin-verified-badge";
import TeacherVerifiedBadge from "../verify-badge/Teacher-verified-badge";

export function TeamSwitcher({ user, loading }) {
  if (loading || !user || !user.role) {
    return <SidebarHeaderSkeleton />;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="!bg-transparent !hover:bg-transparent !focus:bg-transparent !text-white !hover:text-white !focus:text-white"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-white bg-indigo-600">
                <GraduationCap />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">EDU LMS</span>
                <span className="truncate text-xs flex items-center gap-1">
                  {user.role.toUpperCase()}
                  {user.role === "admin" ? (
                    <AdminVerifiedBadge size={12} />
                  ) : (
                    user.role === "teacher" && (
                      <TeacherVerifiedBadge size={12} />
                    )
                  )}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
