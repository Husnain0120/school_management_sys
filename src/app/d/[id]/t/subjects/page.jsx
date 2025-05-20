"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  Loader2,
  AlertCircle,
  ChevronRight,
  Calendar,
  Clock,
  FileText,
  BookMarked,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TeacherSubjectsPage() {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);

  useEffect(() => {
    const fetchTeacherSubjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/teacher/subjects");
        if (response.data.success) {
          setTeacherData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch subjects");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "An error occurred while fetching data"
        );
        console.error("Error fetching teacher subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherSubjects();
  }, []);

  const handleAddLecture = (subjectId) => {
    console.log("Add lecture for subject:", subjectId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-white">
            Loading your subjects...
          </h2>
          <p className="text-indigo-200 mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-200" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">
            Something went wrong
          </h2>
          <p className="text-pink-200 mt-2 text-center mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-xl text-white font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!teacherData) {
    return null;
  }

  const { fullName, studentPhoto, subjects = [] } = teacherData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <main className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-indigo-600/40 to-indigo-800/40 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30 shadow-xl"
          >
            <div className="flex items-center">
              <div className="bg-indigo-500/30 p-3 rounded-xl mr-4">
                <BookOpen className="h-6 w-6 text-indigo-200" />
              </div>
              <div>
                <p className="text-indigo-300 text-sm">Total Subjects</p>
                <h3 className="text-3xl font-bold text-white">
                  {subjects.length}
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gradient-to-br from-purple-600/40 to-purple-800/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 shadow-xl"
          >
            <div className="flex items-center">
              <div className="bg-purple-500/30 p-3 rounded-xl mr-4">
                <FileText className="h-6 w-6 text-purple-200" />
              </div>
              <div>
                <p className="text-purple-300 text-sm">Total Lectures</p>
                <h3 className="text-3xl font-bold text-white">
                  {subjects.reduce(
                    (total, subject) => total + (subject.lectures?.length || 0),
                    0
                  )}
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-600/40 to-blue-800/40 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 shadow-xl"
          >
            <div className="flex items-center">
              <div className="bg-blue-500/30 p-3 rounded-xl mr-4">
                <Calendar className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <p className="text-blue-300 text-sm">Today's Date</p>
                <h3 className="text-xl font-bold text-white">
                  {new Date().toLocaleDateString()}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subjects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <BookMarked className="mr-2 h-6 w-6" />
              Your Subjects
            </h2>
            <Link
              href="/teacher/subjects/create"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-lg"
            >
              <Plus className="h-4 w-4 mr-1" />
              Request New Subject
            </Link>
          </div>

          {subjects.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
              <div className="bg-indigo-500/20 p-4 rounded-full inline-flex mb-4">
                <BookOpen className="h-8 w-8 text-indigo-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Subjects Assigned
              </h3>
              <p className="text-indigo-300 mb-6">
                You don't have any subjects assigned to you yet.
              </p>
              <Link
                href="/teacher/subjects/request"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                Request Subject Assignment
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-xl ${
                    activeSubject === subject._id
                      ? "bg-gradient-to-br from-indigo-600/80 to-purple-700/80 border-indigo-400/50"
                      : "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-white/10 hover:border-indigo-400/30"
                  }`}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                  <div className="p-6 backdrop-blur-sm relative z-10 h-full flex flex-col">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setActiveSubject(
                          subject._id === activeSubject ? null : subject._id
                        )
                      }
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-indigo-200">
                          {subject.subCode}
                        </div>
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            activeSubject === subject._id
                              ? "bg-white text-indigo-600"
                              : "bg-indigo-600/30 text-white"
                          }`}
                        >
                          <ChevronRight
                            className={`h-5 w-5 transition-transform duration-300 ${
                              activeSubject === subject._id ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-indigo-200 text-sm mb-4">
                        {subject.className}
                      </p>

                      <div className="flex items-center text-indigo-300 text-sm mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{subject.lectures?.length || 0} lectures</span>
                      </div>
                    </div>

                    <div
                      className={`flex-1 transition-all duration-500 overflow-hidden ${
                        activeSubject === subject._id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-white/10 mb-4">
                        <h4 className="text-white font-medium mb-2">
                          Subject Details
                        </h4>
                        <ul className="space-y-2 text-sm text-indigo-200">
                          <li className="flex items-center">
                            <span className="w-24 text-indigo-300">Code:</span>
                            <span>{subject.subCode}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-indigo-300">Class:</span>
                            <span>{subject.className}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-indigo-300">
                              Created:
                            </span>
                            <span>
                              {new Date(subject.createdAt).toLocaleDateString()}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddLecture(subject._id);
                      }}
                      className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-medium flex items-center justify-center ${
                        activeSubject === subject._id ? "mt-4" : "mt-0"
                      }`}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lecture
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
