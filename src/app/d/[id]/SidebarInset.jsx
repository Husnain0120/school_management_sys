"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Menu, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavbarSkeleton } from "@/components/skeleton/Navbar-skeleton";
import axios from "axios";
import Link from "next/link";

const SideNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  if (isLoading || !profile.fullName || !profile.portalId) {
    return <NavbarSkeleton />;
  }
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      {/* Green top border */}
      <div className="absolute top-0 left-0 right-0 h-1 "></div>

      <div className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-zinc-200 backdrop-blur-md transition-all duration-200">
        {/* Left Section */}
        <div className="flex items-center gap-3 md:gap-4">
          <SidebarTrigger className="h-9 w-9 rounded-full hover:bg-zinc-100 transition-colors duration-200  md:flex text-indigo-500 " />

          {/* Mobile menu button */}
          <button
            className="h-9 w-9 rounded-full flex md:hidden items-center justify-center hover:bg-zinc-100 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Separator
            orientation="vertical"
            className="h-6 bg-zinc-300 hidden md:block"
          />

          {/* LMS Logo */}
          <div className="flex items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <img src="/lms.png" className="w-10 h-6" />
                  <BreadcrumbLink
                    href="/"
                    className="text-lg md:text-xl font-semibold tracking-tight text-gray-800 hover:text-gray-600 transition-colors duration-200 hidden md:block"
                  >
                    Learning Management System
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Right Section - User Profile and Notification */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Notification Bell */}
          <Link href={"/pages/noticesboard"}>
            <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-rose-500 rounded-full"></span>
            </button>
          </Link>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium text-gray-800">{profile.fullName}</p>
              <p className="text-sm text-gray-500">
                ({profile.portalId.toUpperCase()})
              </p>
            </div>
          </div>

          {/* User Profile - Mobile */}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-zinc-200 shadow-sm"
        >
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500">User:</span>
              <span className="font-semibold text-zinc-900">
                {profile.fullName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500">ID:</span>
              <span className="font-semibold text-zinc-900">
                {profile.portalId}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default SideNavbar;
