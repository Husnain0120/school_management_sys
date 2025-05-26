"use client";

// Import necessary libraries and components
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import {
  Book,
  Users,
  HelpCircle,
  RefreshCw,
  Megaphone,
  AlertCircle,
  X,
} from "lucide-react";

export default function CoursesPage() {
  // Step 1: Set up state variables
  const [loading, setLoading] = useState(true); // Controls loading state
  const [studentData, setStudentData] = useState(null); // Stores API response data
  const [error, setError] = useState(null); // Stores any error messages

  // Step 2: Fetch data when component mounts
  useEffect(() => {
    // Create a function to fetch data
    const fetchData = async () => {
      try {
        // Step 2.1: Start loading
        setLoading(true);

        // Step 2.2: Make API request
        const response = await axios.get("/api/student/getclass-subject");

        // Step 2.3: Check if request was successful
        if (response.data.success) {
          // Store the data if successful
          setStudentData(response.data.data);
        } else {
          // If API returns success: false, throw an error
          throw new Error(response.data.message || "Failed to fetch data");
        }
      } catch (err) {
        // Step 2.4: Handle any errors
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data");

        // Show error message
        toast.error(err.message);
      } finally {
        // Step 2.5: End loading after 5 seconds (for demo purposes)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array means this runs once when component mounts

  // Current semester for display
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentTerm = `${currentYear}`;

  // Step 3: Render the UI
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-6 md:mb-8">
          My Courses{" "}
          <span className="text-white rounded-r-2xl italic bg-purple-500 px-2 font-semibold text-xs ">
            {currentTerm}
          </span>
        </h1>

        {/* Show error message if there's an error and we're not loading */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Course cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Step 3.1: Show skeleton loading while data is being fetched */}
          {loading ? (
            // Create 3 skeleton cards
            Array(6)
              .fill(0)
              .map((_, index) => <CourseCardSkeleton key={index} />)
          ) : studentData?.class?.subjects?.length > 0 ? (
            // Step 3.2: If we have subjects, map them to CourseCard components
            studentData.class.subjects.map((subject) => (
              <CourseCard
                key={subject._id}
                subject={subject}
                className={studentData.class.name}
              />
            ))
          ) : (
            // Step 3.3: If no subjects found, show empty state
            <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <Book className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-500">
                  You are not enrolled in any courses for this term.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 4: Course Card Component
function CourseCard({ subject, className }) {
  // Extract data from the subject object
  const { name: title, subCode: code, _id, teacher, lectures = [] } = subject;

  // Add state for dialog
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);

  // Create random notification counts for demo purposes
  const notifications = {
    assignments: Math.floor(Math.random() * 2),
    gdb: Math.floor(Math.random() * 2),
    quiz: Math.floor(Math.random() * 2),
    activity: Math.floor(Math.random() * 2),
    announcements: Math.floor(Math.random() * 2),
  };

  return (
    <div className="bg-white shadow-[_10px_10px_8px_rgba(0,0,0,0.2)] overflow-hidden">
      {/* Course Header - Links to course detail page */}
      <Link href={`home/${_id}/subject-details-lectures`}>
        <div
          className="p-5 text-white relative"
          style={{
            background: `linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='pattern' width='100%25' height='100%25' viewBox='0 0 800 800' patternUnits='userSpaceOnUse' patternTransform='rotate(25)'%3E%3Cpath d='M-200 150 C 400 150 400 -150 1200 -150 L 1200 550 C 400 550 400 850 -200 850 Z' fill='%23ffffff10'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%238e44ad'/%3E%3Crect width='100%25' height='100%25' fill='url(%23pattern)'/%3E%3C/svg%3E")`,
          }}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-1">
            Subject:{" "}
            <span className="font-extralight">{title.toUpperCase()}</span>
          </h2>
          <p className="text-white/90 text-sm md:text-base">{className}</p>
          <p className="mt-2 text-sm md:text-base bg-white w-fit text-purple-500 px-1 rounded-r-2xl font-semibold">
            {code}
          </p>
        </div>
      </Link>

      {/* Instructor Information Section */}
      <div className="p-4 md:p-6 flex items-start border-b">
        {/* Instructor Photo - Now clickable */}
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden flex-shrink-0 border-2 border-gray-200 cursor-pointer transition-transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            setShowTeacherDialog(true);
          }}
        >
          <img
            src={
              teacher?.studentPhoto || "/placeholder.svg?height=120&width=120"
            }
            alt={teacher?.fullName || "Instructor"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Instructor Details */}
        <div className="ml-4 md:ml-6 flex-grow">
          <h3 className="text-base md:text-lg font-bold text-gray-900">
            {teacher?.fullName || "Instructor Name"}
          </h3>
          <p className="text-sm md:text-base text-gray-700">Ph.D.</p>
          <p className="text-sm md:text-base text-gray-700">
            {teacher?.email || "instructor@example.com"}
          </p>
        </div>

        {/* Lecture Count Badge - Only show if there are lectures */}
        {lectures.length > 0 ? (
          <div className="flex-shrink-0 bg-blue-100 text-blue-600 text-xl md:text-2xl font-bold h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center border border-blue-200">
            {lectures.length}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Navigation Icons */}
      <div className="grid grid-cols-6 border-t">
        <NavItem
          icon={<Book className="h-5 w-5 md:h-6 md:w-6" />}
          label="Assignments"
          notificationCount={notifications.assignments}
        />
        <NavItem
          icon={<Users className="h-5 w-5 md:h-6 md:w-6" />}
          label="GDB"
          notificationCount={notifications.gdb}
        />
        <NavItem
          icon={<HelpCircle className="h-5 w-5 md:h-6 md:w-6" />}
          label="Quiz"
          notificationCount={notifications.quiz}
        />
        <NavItem
          icon={<RefreshCw className="h-5 w-5 md:h-6 md:w-6" />}
          label="Activity"
          notificationCount={notifications.activity}
        />
        <NavItem
          icon={<Megaphone className="h-5 w-5 md:h-6 md:w-6" />}
          label="Announcements"
          notificationCount={notifications.announcements}
        />
      </div>

      {/* Teacher Dialog */}
      {showTeacherDialog && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowTeacherDialog(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header with gradient */}
            <div className="relative h-32 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-end justify-center">
              <button
                className="absolute top-3 right-3 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                onClick={() => setShowTeacherDialog(false)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Teacher Avatar - Positioned to overlap header and content */}
              <div className="absolute -bottom-16 w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img
                  src={
                    teacher?.studentPhoto ||
                    "/placeholder.svg?height=120&width=120"
                  }
                  alt={teacher?.fullName || "Instructor"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Dialog Content */}
            <div className="pt-20 pb-8 px-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {teacher?.fullName || "Instructor Name"}
              </h2>
              <p className="text-purple-600 font-medium mb-2">Professor</p>
              <p className="text-gray-600 mb-6">
                {teacher?.email || "instructor@example.com"}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-700">
                    {lectures.length || 0}
                  </p>
                  <p className="text-xs text-gray-600">Lectures</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-indigo-700">
                    {Math.floor(Math.random() * 10) + 1}
                  </p>
                  <p className="text-xs text-gray-600">Years</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-violet-700">
                    {Math.floor(Math.random() * 5) + 1}
                  </p>
                  <p className="text-xs text-gray-600">Courses</p>
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-6 rounded-full font-medium hover:shadow-lg transition-shadow">
                Contact Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Step 5: Navigation Item Component
function NavItem({ icon, label, notificationCount }) {
  return (
    <div className="flex flex-col items-center justify-center py-3 md:py-4 px-1 md:px-2 relative cursor-pointer hover:bg-gray-50 transition-colors">
      {/* Notification Badge - Only show if count is greater than 0 */}
      {notificationCount > 0 && (
        <span className="absolute top-1 md:top-2 right-1 md:right-6 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
          {notificationCount}
        </span>
      )}

      {/* Icon */}
      <div className="text-gray-700">{icon}</div>

      {/* Label */}
      <span className="text-[10px] md:text-xs text-gray-600 mt-1 text-center">
        {label}
      </span>
    </div>
  );
}

// Step 6: Skeleton Loading Component
function CourseCardSkeleton() {
  return (
    <div className="bg-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] overflow-hidden animate-pulse">
      {/* Course Header Skeleton */}
      <div className="p-5 bg-purple-300 h-[100px]">
        <div className="h-6 bg-purple-200 rounded-md w-3/4 mb-2"></div>
        <div className="h-4 bg-purple-200 rounded-md w-1/2 mb-2"></div>
        <div className="h-4 bg-purple-200 rounded-md w-1/4"></div>
      </div>

      {/* Instructor Info Skeleton */}
      <div className="p-4 md:p-6 flex items-start border-b">
        {/* Instructor Photo Placeholder */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-md bg-gray-200 flex-shrink-0"></div>

        {/* Instructor Details Placeholders */}
        <div className="ml-4 md:ml-6 flex-grow">
          <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
        </div>

        {/* Badge Placeholder */}
        <div className="flex-shrink-0 bg-gray-200 h-10 w-10 md:h-12 md:w-12 rounded-full"></div>
      </div>

      {/* Navigation Icons Skeleton */}
      <div className="grid grid-cols-5  border-t h-16">
        {/* Create 5 placeholder icons */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-3 md:py-4"
          >
            <div className="w-6 h-6 bg-gray-200 rounded-full mb-1"></div>
            <div className="w-12 h-3 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
