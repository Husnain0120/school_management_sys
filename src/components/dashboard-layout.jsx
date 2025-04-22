"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  GraduationCap,
  Menu,
  Bell,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useMobile } from "@/hook/use-mobile";

export default function DashboardLayout({
  children,
  userRole,
  userName,
  userEmail,
  navItems,
  activeTab,
  setActiveTab,
}) {
  const isMobile = useMobile();
  const [notifications, setNotifications] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  <div className="flex items-center gap-2 py-4">
                    <div className="relative">
                      <GraduationCap className="h-6 w-6 text-gray-800" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      EduManage
                    </span>
                  </div>
                  <nav className="mt-8 flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.value}
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={`justify-start ${
                          activeTab === item.value
                            ? "bg-black text-white hover:bg-gray-800"
                            : ""
                        }`}
                        onClick={() => setActiveTab(item.value)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <GraduationCap className="h-6 w-6 text-gray-800" />
              </div>
              <span className="text-lg font-bold text-gray-900">EduManage</span>
            </Link>
            <div className="hidden md:flex">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                      {notifications}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">New lecture uploaded</span>
                    <span className="text-xs text-muted-foreground">
                      Mathematics: Quadratic Equations
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Attendance marked</span>
                    <span className="text-xs text-muted-foreground">
                      Your attendance has been marked for today
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Upcoming exam</span>
                    <span className="text-xs text-muted-foreground">
                      Mid-term exams start next week
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotifications(0)}
                  >
                    Mark all as read
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full overflow-hidden"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32`}
                      alt={userName}
                    />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{userName}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {userEmail}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {!isMobile && mounted && (
          <aside className="w-64 border-r bg-background">
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-auto py-6">
                <nav className="grid gap-2 px-2">
                  {navItems.map((item) => (
                    <div key={item.value}>
                      <Button
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={`justify-start w-full ${
                          activeTab === item.value
                            ? "bg-black text-white hover:bg-gray-800"
                            : ""
                        }`}
                        onClick={() => setActiveTab(item.value)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={userName}
                    />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {userEmail}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
        <main className="flex-1 overflow-auto bg-muted/10 p-4 md:p-6">
          {mounted && <div className="mx-auto max-w-7xl">{children}</div>}
        </main>
      </div>
    </div>
  );
}
