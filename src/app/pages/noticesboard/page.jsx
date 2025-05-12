"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Info,
  Search,
  AlertCircle,
  CalendarDays,
  DollarSign,
} from "lucide-react";

// Enhanced notice data with additional fields for visual richness
const noticesData = [
  {
    id: 1,
    title: "Exam Schedule",
    description: "Midterm exams will start from 15th May.",
    details:
      "All students are advised to check the exam timetable on the student portal. No changes will be entertained after 10th May.\n\nExam timings will be from 9:00 AM to 12:00 PM for morning sessions and 1:00 PM to 4:00 PM for afternoon sessions.\n\nStudents must bring their ID cards and admit cards to the examination hall. No student will be allowed to enter without proper identification.\n\nMobile phones and other electronic devices are strictly prohibited in the examination hall.",
    date: "2025-05-05",
    type: "academic",
    priority: "high",
    icon: CalendarDays,
  },
  {
    id: 2,
    title: "Holiday Notice",
    description: "Campus will remain closed on 20th May.",
    details:
      "On account of public holiday, the campus will remain closed. Classes will resume from 21st May (Tuesday).\n\nAll scheduled assignments and submissions will be postponed to the next working day.\n\nOnline resources and library digital access will remain available during the holiday.\n\nFor any emergencies, students can contact the administration through the emergency helpline.",
    date: "2025-05-08",
    type: "administrative",
    priority: "medium",
    icon: Info,
  },
  {
    id: 3,
    title: "Fee Submission",
    description: "Last date for fee is 25th May.",
    details:
      "Students must submit their dues by 25th May to avoid late fine. Payments can be made online or at the accounts office.\n\nA late fine of $50 will be charged after the due date.\n\nStudents facing financial difficulties can apply for installment plans by submitting an application to the financial aid office before the due date.\n\nFor online payments, please ensure that you keep the transaction receipt for future reference.",
    date: "2025-05-10",
    type: "financial",
    priority: "high",
    icon: DollarSign,
  },
  {
    id: 4,
    title: "Library Hours Extended",
    description: "Extended hours during exam period",
    details:
      "The main library will extend its operating hours during the examination period from 10th May to 30th May.\n\nNew timings: 7:00 AM to 11:00 PM (Monday to Saturday) and 9:00 AM to 8:00 PM (Sunday).\n\nAdditional study rooms have been arranged to accommodate more students during this period.\n\nPlease maintain silence and follow library rules.",
    date: "2025-05-07",
    type: "facility",
    priority: "medium",
    icon: Clock,
  },
  {
    id: 5,
    title: "Workshop on Research Methods",
    description: "Mandatory for final year students",
    details:
      "A workshop on Advanced Research Methods will be conducted on 18th May for all final year students.\n\nVenue: Auditorium A\nTime: 10:00 AM to 3:00 PM\n\nAttendance is mandatory for all final year students working on research projects.\n\nGuest speakers from various research institutions will be present to guide students on research methodologies and paper writing.",
    date: "2025-05-12",
    type: "academic",
    priority: "medium",
    icon: FileText,
  },
];

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const colors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border `}>
      {priority}
    </span>
  );
};

// Type badge component
const TypeBadge = ({ type }) => {
  const colors = {
    academic: "bg-indigo-100 text-indigo-800 border-indigo-200",
    administrative: "bg-purple-100 text-purple-800 border-purple-200",
    financial: "bg-emerald-100 text-emerald-800 border-emerald-200",
    facility: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border `}>{type}</span>
  );
};

const NoticeBoardPage = () => {
  const [selectedNotice, setSelectedNotice] = useState(noticesData[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter notices based on search query
  const filteredNotices = noticesData.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            Notice Board
          </span>
        </h1>
        <p className="text-gray-500 mt-2">
          Stay updated with the latest announcements and information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Notice List with Search */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Announcements
                </h2>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {filteredNotices.length} Notices
              </span>
            </div>

            {/* Search box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[500px] overflow-auto">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <motion.div
                  key={notice.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedNotice(notice)}
                  className={`cursor-pointer p-4 hover:bg-gray-50 transition-colors duration-150 ${
                    selectedNotice.id === notice.id
                      ? "bg-indigo-50 border-l-4 border-indigo-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        notice.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : notice.priority === "medium"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      <notice.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                          {notice.title}
                        </h3>
                        <ChevronRight
                          className={`h-4 w-4 ${
                            selectedNotice.id === notice.id
                              ? "text-indigo-500"
                              : "text-gray-300"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {notice.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <PriorityBadge priority={notice.priority} />
                        <TypeBadge type={notice.type} />
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(notice.date), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No notices found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Notice Details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedNotice.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 h-full overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedNotice.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : selectedNotice.priority === "medium"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <selectedNotice.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedNotice.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedNotice.description}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end">
                  <div className="flex gap-2 mb-1">
                    <PriorityBadge priority={selectedNotice.priority} />
                    <TypeBadge type={selectedNotice.type} />
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(selectedNotice.date), "MMMM dd, yyyy")}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[500px] overflow-auto">
              <div className="prose prose-indigo max-w-none">
                {selectedNotice.details
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>
                      Posted{" "}
                      {format(new Date(selectedNotice.date), "MMMM dd, yyyy")}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg transition-colors">
                    <FileText className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardPage;
