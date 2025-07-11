"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  UserPlus,
  LogIn,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    dashboards: false,
  });
  const [profile, setProfile] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const dashboardsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroRef.current) {
          setIsVisible((prev) => ({ ...prev, hero: entry.isIntersecting }));
        } else if (entry.target === featuresRef.current) {
          setIsVisible((prev) => ({ ...prev, features: entry.isIntersecting }));
        } else if (entry.target === dashboardsRef.current) {
          setIsVisible((prev) => ({
            ...prev,
            dashboards: entry.isIntersecting,
          }));
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (dashboardsRef.current) observer.observe(dashboardsRef.current);

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-pink-50">
      {/* Hero Section with Abstract Background */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-10"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="a" gradientTransform="rotate(150 .5 .5)">
                <stop offset="0%" stopColor="#5865F2" />
                <stop offset="100%" stopColor="#EB459E" />
              </linearGradient>
              <linearGradient id="b" gradientTransform="rotate(45 .5 .5)">
                <stop offset="0%" stopColor="#57CAF4" />
                <stop offset="100%" stopColor="#5865F2" />
              </linearGradient>
            </defs>
            <path
              d="M600,300 Q900,100 800,500 T600,800 Q300,900 200,500 T600,300"
              fill="url(#a)"
              opacity="0.6"
            />
            <path
              d="M400,200 Q100,300 200,600 T500,800 Q800,700 700,400 T400,200"
              fill="url(#b)"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Enhanced Fixed Header - Replace the existing header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b shadow-lg bg-white/95 backdrop-blur-md">
          <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-2 relative">
                <div className="relative">
                  <div className="absolute inset-0 blur-sm bg-gradient-to-r from-[#5865F2] to-[#EB459E] rounded-full"></div>
                  <GraduationCap className="h-8 w-8 text-white relative z-10" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 z-10">
                  Edu<span className="text-gradient">Manage</span>
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <ul className="flex items-center gap-6 text-base">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant="outline"
                      className="transition-all hover:shadow-md bg-transparent"
                    >
                      {profile ? (
                        <Link href="#">Dashboard</Link>
                      ) : (
                        <Link href="/pages/login">Login</Link>
                      )}
                    </Button>
                  </li>
                </ul>
              </nav>

              {/* Mobile Menu Button */}
              <div className="lg:hidden mobile-menu-container">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={mobileMenuVariants}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Navigation
                        </p>
                      </div>
                      <nav className="py-2">
                        <ul className="space-y-1">
                          <li>
                            <Link
                              href="/"
                              className="block px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#features"
                              className="block px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Features
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#contact"
                              className="block px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Contact
                            </Link>
                          </li>
                          <li className="px-4 py-2">
                            <Button
                              asChild
                              variant="outline"
                              className="w-full transition-all hover:shadow-md bg-transparent"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {profile ? (
                                <Link href="#">Dashboard</Link>
                              ) : (
                                <Link href="/pages/login">Login</Link>
                              )}
                            </Button>
                          </li>
                        </ul>
                      </nav>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Main Section - Add top padding for fixed header */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={isVisible.hero ? "visible" : "hidden"}
          variants={containerVariants}
          className="container relative z-10 mx-auto pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16 xl:gap-20">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h2
                variants={itemVariants}
                className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                Modern School <br />
                <span className="text-gradient">Management System</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mb-6 text-sm sm:text-base lg:text-lg text-gray-700 max-w-lg mx-auto lg:mx-0"
              >
                A comprehensive platform for students, teachers, and admins to
                manage everything efficiently.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white transition-all hover:shadow-lg w-full sm:w-auto"
                >
                  <Link href="/pages/admission">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Apply for Admission
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="transition-all hover:shadow-md group w-full sm:w-auto bg-transparent"
                >
                  <Link href="/pages/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login as Student
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#EB459E] rounded-lg blur-md opacity-20"></div>
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-1 bg-gradient-to-r from-[#5865F2] to-[#EB459E]"></div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-[#5865F2] to-[#EB459E] flex items-center justify-center">
                          <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                          Student Dashboard
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500"></div>
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-yellow-500"></div>
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="h-6 sm:h-8 bg-gray-100 rounded-md w-full animate-pulse"></div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="h-16 sm:h-24 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="h-16 sm:h-24 bg-gray-100 rounded-md animate-pulse"></div>
                      </div>
                      <div className="h-24 sm:h-32 bg-gray-100 rounded-md animate-pulse"></div>
                      <div className="flex justify-between">
                        <div className="h-6 sm:h-8 w-16 sm:w-20 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="h-6 sm:h-8 w-16 sm:w-20 bg-black rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 h-16 w-16 sm:h-24 sm:w-24 bg-gradient-to-r from-[#57CAF4] to-[#5865F2] rounded-full blur-xl opacity-20"></div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <div className="bg-gradient-to-r from-blue-200 to-pink-300 h-1 m-1.5"></div>

      <main className="container mx-auto py-8 sm:py-12 px-4">
        <motion.section
          id="features"
          ref={featuresRef}
          initial="hidden"
          animate={isVisible.features ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16 sm:mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="mb-4 text-center text-2xl sm:text-3xl font-bold text-gray-900"
          >
            Premium <span className="text-gradient">Features</span>
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="mb-8 sm:mb-10 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Our platform offers a comprehensive suite of tools designed to
            streamline educational management and enhance the learning
            experience.
          </motion.p>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              variants={cardVariants}
              className="premium-card rounded-xl"
            >
              <div className="p-4 sm:p-6">
                <div className="mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-r from-[#5865F2] to-[#EB459E] flex items-center justify-center">
                  <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h4 className="mb-2 text-lg sm:text-xl font-semibold">
                  Admission Management
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Streamlined admission process with online form submission and
                  document uploads.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Online applications
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Document verification
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Status tracking</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="premium-card rounded-xl"
            >
              <div className="p-4 sm:p-6">
                <div className="mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-r from-[#57CAF4] to-[#5865F2] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white sm:w-6 sm:h-6"
                  >
                    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2" />
                    <path d="M18 8h4v4" />
                    <path d="m15 15 7-7" />
                  </svg>
                </div>
                <h4 className="mb-2 text-lg sm:text-xl font-semibold">
                  Attendance Tracking
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Digital attendance system for teachers to mark and track
                  student attendance.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Real-time tracking
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Automated reports
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Parent notifications
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="premium-card rounded-xl md:col-span-2 lg:col-span-1"
            >
              <div className="p-4 sm:p-6">
                <div className="mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-r from-[#EB459E] to-[#57CAF4] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white sm:w-6 sm:h-6"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h4 className="mb-2 text-lg sm:text-xl font-semibold">
                  Learning Materials
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Access to subject-specific lectures and learning resources for
                  students.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Digital library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Video lectures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Interactive quizzes
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          ref={dashboardsRef}
          initial="hidden"
          animate={isVisible.dashboards ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16 sm:mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="mb-4 text-center text-2xl sm:text-3xl font-bold text-gray-900"
          >
            User <span className="text-gradient">Dashboards</span>
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="mb-8 sm:mb-10 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Tailored interfaces for different user roles, providing the tools
            and information needed for each specific function.
          </motion.p>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              variants={cardVariants}
              className="premium-card rounded-xl overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-[#5865F2] to-[#EB459E]"></div>
              <div className="p-4 sm:p-6">
                <h4 className="mb-2 text-lg sm:text-xl font-semibold">
                  Admin Dashboard
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Comprehensive tools for school administrators to manage all
                  aspects of the institution.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Manage classes and subjects
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Assign teacher roles
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Review admission applications
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Manage student enrollments
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group text-sm bg-transparent"
                  >
                    <Link href="/pages/login">
                      Login as Admin
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="premium-card rounded-xl overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-[#57CAF4] to-[#5865F2]"></div>
              <div className="p-4 sm:p-6">
                <h4 className="mb-2 text-lg sm:text-xl font-semibold">
                  Teacher Dashboard
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Efficient tools for teachers to manage classes, attendance,
                  and student performance.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Take and manage attendance
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Upload lecture materials
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Manage assigned subjects
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      View student performance
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group text-sm bg-transparent"
                  >
                    <Link href="/pages/login">
                      Login as Teacher
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="premium-card rounded-xl overflow-hidden md:col-span-2 lg:col-span-1"
            >
              <div className="h-2 bg-gradient-to-r from-[#EB459E] to-[#57CAF4]"></div>
              <div className="p-4 sm:p-6">
                <h4 className="mb-2 text-lg sm:text-xl font-semibold">
                  Student Dashboard
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  User-friendly interface for students to access learning
                  materials and track progress.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Access subject materials
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      View attendance records
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Download lecture notes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Track academic progress
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group text-sm bg-transparent"
                  >
                    <Link href="/pages/login">
                      Login as Student
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <section className="mb-12 sm:mb-16 lg:mb-20 py-8 sm:py-12 lg:py-16 from-gray-200 via-black/60 text-white to-gray-300 bg-gradient-to-tl rounded-2xl border shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="mb-8 sm:mb-10 lg:mb-12 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-50">
              Trusted by{" "}
              <span className="text-gradient">Educational Institutions</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
              {/* Schools */}
              <div className="animate-fade-in">
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 text-gradient">
                  500+
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-200">
                  Schools
                </p>
              </div>
              {/* Students */}
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 text-gradient">
                  50,000+
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-200">
                  Students
                </p>
              </div>
              {/* Teachers */}
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 text-gradient">
                  5,000+
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-200">
                  Teachers
                </p>
              </div>
              {/* Countries */}
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 text-gradient">
                  20+
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-200">
                  Countries
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-gray-900 py-8 sm:py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 blur-sm bg-gradient-to-r from-[#5865F2] to-[#EB459E] rounded-full"></div>
                  <GraduationCap className="h-8 w-8 text-white relative z-10" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold">
                  Edu<span className="text-gradient">Manage</span>
                </h4>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                A comprehensive school management system designed to streamline
                educational processes.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg sm:text-xl font-bold">Contact Us</h4>
              <address className="not-italic text-gray-300 text-sm sm:text-base">
                <p>123 Education Street</p>
                <p>Learning City, ED 12345</p>
                <p className="mt-2">Email: info@edumanage.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
              <Link
                className="hover:border-b text-blue-400 border-blue-400 italic text-sm"
                href={"/pages/contact"}
              >
                contact support center{" "}
                <span className="text-red-400 text-[10px] sm:text-[12px]">
                  24/7
                </span>{" "}
              </Link>
            </div>
            <div>
              <h4 className="mb-4 text-lg sm:text-xl font-bold">Quick Links</h4>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li>
                  <Link
                    href="/pages/admission"
                    className="hover:text-white transition-colors"
                  >
                    Apply for Admission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/login"
                    className="hover:text-white transition-colors"
                  >
                    Student Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/login"
                    className="hover:text-white transition-colors"
                  >
                    Teacher Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/login"
                    className="hover:text-white transition-colors"
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} EduManage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #5865f2 0%, #eb459e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .premium-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .premium-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
