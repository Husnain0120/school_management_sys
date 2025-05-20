"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Save,
  Youtube,
  Play,
  Calendar,
  Clock,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";

const LecturePage = () => {
  const { subjectid } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [subjectData, setSubjectData] = useState(null);
  const [error, setError] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    vedioLink: "",
    isPublished: true,
  });

  // Function to extract YouTube video ID from various YouTube URL formats
  const extractYoutubeId = (url) => {
    if (!url) return null;

    // Match patterns like youtube.com/watch?v=ID or youtu.be/ID or youtube.com/embed/ID
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  // Fetch lectures data
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        setError(null);

        // Log the API endpoint for debugging
        console.log(
          `Fetching from: /api/teacher/subjects/${subjectid}/add-lecture`
        );

        // Try the first endpoint format
        try {
          const response = await axios.get(
            `/api/teacher/subjects/${subjectid}/add-lecture`
          );

          if (response.data.success) {
            console.log("API Response:", response.data);
            setSubjectData(response.data.data);
            setLectures(response.data.data.lectures || []);
            return; // Exit if successful
          }
        } catch (firstError) {
          console.log("First endpoint attempt failed:", firstError);
          // Continue to try the second format
        }

        // Try the second endpoint format if the first one failed
        try {
          const response = await axios.get(
            `/api/teacher/subjects/${subjectid}/add-leacture`
          );

          if (response.data.success) {
            console.log("API Response (second attempt):", response.data);
            setSubjectData(response.data.data);
            setLectures(response.data.data.lectures || []);
            return; // Exit if successful
          }
        } catch (secondError) {
          console.log("Second endpoint attempt failed:", secondError);
          throw new Error("Both API endpoint attempts failed");
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);

        // More detailed error message
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          setError(
            `Server error: ${
              error.response.data.message ||
              error.response.statusText ||
              "Unknown server error"
            }`
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          setError(
            "No response from server. Please check your internet connection."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Request error:", error.message);
          setError(`Request error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (subjectid) {
      fetchLectures();
    }
  }, [subjectid]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form data
    if (!formData.title.trim()) {
      setError("Lecture title is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Lecture description is required");
      return;
    }

    if (!formData.vedioLink.trim()) {
      setError("Video link is required");
      return;
    }

    try {
      setSubmitting(true);
      console.log("Submitting lecture data:", formData);

      // First try to create the lecture using POST
      let response;
      try {
        response = await axios.post(
          `/api/teacher/subjects/${subjectid}/add-lecture`,
          formData
        );
      } catch (firstError) {
        console.log("First endpoint attempt failed:", firstError);
        // Try the alternative endpoint if first one fails
        response = await axios.post(
          `/api/teacher/subjects/${subjectid}/add-leacture`,
          formData
        );
      }

      if (response.data.success) {
        console.log("Lecture added successfully:", response.data);

        // Reset form
        setFormData({
          title: "",
          description: "",
          vedioLink: "",
          isPublished: true,
        });

        // Now refetch the updated lectures list using GET
        try {
          const getResponse = await axios.get(
            `/api/teacher/subjects/${subjectid}/add-lecture`
          );

          if (getResponse.data.success) {
            console.log("Refetched lectures:", getResponse.data);
            setSubjectData(getResponse.data.data);
            setLectures(getResponse.data.data.lectures || []);
          }
        } catch (getError) {
          console.log("First GET endpoint attempt failed:", getError);

          // Try the alternative GET endpoint if first one fails
          try {
            const altGetResponse = await axios.get(
              `/api/teacher/subjects/${subjectid}/add-leacture`
            );

            if (altGetResponse.data.success) {
              console.log(
                "Refetched lectures (alternative endpoint):",
                altGetResponse.data
              );
              setSubjectData(altGetResponse.data.data);
              setLectures(altGetResponse.data.data.lectures || []);
            }
          } catch (altGetError) {
            console.log("Both GET endpoints failed:", altGetError);
            // Even if refetch fails, we can show success message
          }
        }

        // alert("Lecture added successfully!");
      }
    } catch (error) {
      console.error("Error adding lecture:", error);
      if (error.response) {
        setError(
          `Server error: ${
            error.response.data.message ||
            error.response.statusText ||
            "Unknown server error"
          }`
        );
      } else if (error.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        setError(`Request error: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 to-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/teacher/subjects"
            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Subjects
          </Link>
        </div>

        {/* Subject Info */}
        {loading ? (
          <div className="bg-zinc-800/70 backdrop-blur-md rounded-2xl p-6 border border-zinc-700/50 shadow-xl mb-8">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-zinc-500 rounded-xl mr-4 animate-pulse"></div>
              <div>
                <div className="h-7 w-48 bg-zinc-500 rounded-md mb-2 animate-pulse"></div>
                <div className="h-5 w-32 bg-zinc-500 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-800/70 backdrop-blur-md rounded-2xl p-6 border border-zinc-700/50 shadow-xl mb-8">
            <div className="flex items-center">
              <div className="bg-zinc-700/70 p-3 rounded-xl mr-4">
                <BookOpen className="h-6 w-6 text-zinc-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {subjectData?.name || "Subject"}
                </h1>
                <p className="text-zinc-400">
                  {subjectData?.subCode || "Code"} •{" "}
                  {subjectData?.className || "Class"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-800/50 rounded-xl p-4 text-red-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Add Lecture Form */}
        <div className="bg-zinc-800/70 backdrop-blur-md rounded-2xl border border-zinc-700/50 shadow-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-zinc-700/50">
            <h2 className="text-xl font-bold text-white">Add New Lecture</h2>
            <p className="text-zinc-400">
              Fill in the details to create a new lecture
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-zinc-300 mb-2 font-medium"
                >
                  Lecture Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="Enter lecture title"
                />
              </div>

              <div>
                <label
                  htmlFor="vedioLink"
                  className="block text-zinc-300 mb-2 font-medium"
                >
                  YouTube Video Link <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="vedioLink"
                    name="vedioLink"
                    value={formData.vedioLink}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                </div>
                <p className="text-zinc-500 text-xs mt-1">
                  Paste any YouTube URL format (youtube.com/watch, youtu.be, or
                  embed link)
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-zinc-300 mb-2 font-medium"
              >
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="Enter lecture description and topics covered..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white rounded-xl transition-all duration-300 font-medium flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Lecture
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Lectures List */}
        <div className="bg-zinc-800/70 backdrop-blur-md rounded-2xl border border-zinc-700/50 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-700/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Play className="h-5 w-5 mr-2" />
              Lectures ({lectures?.length || 0})
            </h2>
          </div>

          <div className="p-6">
            {loading ? (
              // Skeleton loading
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-zinc-700/40 rounded-xl overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto bg-zinc-500 animate-pulse"></div>
                      <div className="p-5 flex-1">
                        <div className="h-7 w-3/4 bg-zinc-500 rounded-md mb-4 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-zinc-500 rounded-md mb-6 animate-pulse"></div>
                        <div className="h-4 w-full bg-zinc-500 rounded-md mb-2 animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-zinc-500 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !lectures || lectures.length === 0 ? (
              <div className="text-center py-12 bg-zinc-700/30 rounded-xl">
                <BookOpen className="h-12 w-12 text-zinc-500 mx-auto mb-3" />
                <h3 className="text-zinc-300 font-medium mb-1">
                  No lectures yet
                </h3>
                <p className="text-zinc-500 text-sm">
                  Add your first lecture using the form above
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {lectures.map((lecture) => {
                  const videoId = extractYoutubeId(lecture.vedioLink);

                  return (
                    <div
                      key={lecture._id}
                      className="bg-zinc-700/40 hover:bg-zinc-700/60 border border-zinc-600/30 hover:border-zinc-600/50 rounded-xl overflow-hidden transition-all duration-300 group"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Video Thumbnail */}
                        <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
                          {videoId ? (
                            <>
                              <Link
                                href={`add-lectures/${lecture?._id}/preview`}
                              >
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                  alt={lecture.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-all duration-300">
                                  <div className="h-14 w-14 rounded-full bg-red-600/80 flex items-center justify-center">
                                    <Play
                                      className="h-7 w-7 text-white ml-1"
                                      fill="white"
                                    />
                                  </div>
                                </div>
                              </Link>
                            </>
                          ) : (
                            <div className="w-full h-full bg-zinc-600 flex items-center justify-center">
                              <Youtube className="h-10 w-10 text-zinc-400" />
                            </div>
                          )}
                        </div>

                        {/* Lecture Info */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Link
                                href={`add-lectures/${lecture?._id}/preview`}
                              >
                                {" "}
                                <h3 className="text-xl font-bold text-white hover:underline group-hover:text-zinc-200">
                                  {lecture.title}
                                </h3>
                              </Link>

                              <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
                            </div>
                            <p className="text-zinc-400 mb-4 line-clamp-2">
                              {lecture.description}
                            </p>
                          </div>

                          <div className="flex items-center text-zinc-500 text-sm space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(
                                  lecture.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(lecture.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                            <a
                              href={lecture.vedioLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-zinc-400 hover:text-zinc-200 transition-colors ml-auto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              <span>YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturePage;
