"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SidebarUserSkeleton } from "../skeleton/Sidebar-user-skeleton";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export function NavUser({ user, loading }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handelLogout = async () => {
    try {
      const res = await axios.get(`/api/auth/logout`);
      toast.success(res.data.message || "Logout Successfully!");
      if (res.status === 200) {
        router.push("/pages/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message);
    }
  };

  if (loading || !user || !user._id || !user.fullName || !user.email) {
    return <SidebarUserSkeleton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-full border-2 border-primary">
                <AvatarImage
                  src={user.studentPhoto}
                  alt={user.fullName}
                  className="object-cover w-full h-full" // Ensure image covers properly
                />
                <AvatarFallback className="bg-primary text-white text-sm">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.fullName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
            alignOffset={8}
          >
            <Link href={`/d/${user._id}/profile`} className="cursor-pointer">
              <DropdownMenuLabel className="font-normal hover:bg-accent rounded-lg p-0.5 transition-colors">
                <div className="flex items-center gap-3 p-2 hover:underline">
                  <Avatar className="h-12 w-12 rounded-full border-2 border-primary">
                    <AvatarImage
                      src={user.studentPhoto}
                      alt={user.fullName}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-primary text-white">
                      {user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1">
                    <span className="truncate font-semibold">
                      {user.fullName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </Link>

            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-100 focus:bg-accent">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-100 focus:bg-zinc-200">
                <BadgeCheck className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-100 focus:bg-zinc-200">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-100 focus:bg-zinc-200">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuItem
              className="cursor-pointer hover:bg-red-100 focus:bg-red-100 text-red-600"
              onClick={handelLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
