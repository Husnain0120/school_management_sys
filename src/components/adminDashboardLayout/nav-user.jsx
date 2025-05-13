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

  // = =
  const router = useRouter();

  //hadel logout
  const handelLogout = async () => {
    try {
      const res = await axios.get(`/api/auth/logout`);
      toast.success(res.data.messahe || "Logout Successfully!");
      if (res.status === 200) {
        router.push("/pages/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message);
    }
  };

  if (loading) {
    return <SidebarUserSkeleton />;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full border-[2px] ">
                <AvatarImage src={user.studentPhoto} alt={"photo"} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.fullName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <Link href={`/d/${user._id}/profile`}>
              <DropdownMenuLabel className=" font-normal cursor-pointer hover:bg-zinc-300  rounded-xl p-0.5">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  {" "}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.fullName || (
                        <>
                          <Skeleton className="h-4 w-20 bg-gray-200" />
                          <Skeleton className="mt-1 h-3 w-12 bg-gray-200" />
                        </>
                      )}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </Link>
            <DropdownMenuSeparator className={"bg-zinc-800"} />
            <DropdownMenuGroup>
              <DropdownMenuItem className={"hover:bg-zinc-200 cursor-pointer"}>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={"hover:bg-zinc-200 cursor-pointer"}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className={"hover:bg-zinc-200 cursor-pointer"}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className={"hover:bg-zinc-200 cursor-pointer"}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={"hover:bg-red-200 cursor-pointer"}>
              <Button variant={"ghost"} onClick={handelLogout}>
                <LogOut />
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
