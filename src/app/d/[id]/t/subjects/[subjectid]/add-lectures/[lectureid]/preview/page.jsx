"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Youtube,
  Calendar,
  Clock,
  ExternalLink,
  AlertCircle,
  Loader2,
  Play,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const LecturePreviewPage = () => {
  // ... existing imports and logic remains the same ...

  const { subjectid, lectureid } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lecture, setLecture] = useState(null);
  const [error, setError] = useState(null);

  // Function to extract YouTube video ID from URL
  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Fetch lecture data
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try the first endpoint format
        try {
          const response = await axios.get(
            `/api/teacher/subjects/${subjectid}/add-leacture/${lectureid}/preview`
          );

          if (response.data.success) {
            setLecture(response.data.data);
            return;
          }
        } catch (firstError) {
          console.log("First endpoint attempt failed:", firstError);
          // Continue to try alternative formats if needed
        }

        // If we get here, all attempts failed
        throw new Error("Could not fetch lecture data");
      } catch (error) {
        console.error("Error fetching lecture:", error);
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
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (subjectid && lectureid) {
      fetchLecture();
    }
  }, [subjectid, lectureid]);

  // Get YouTube embed URL
  const getYoutubeEmbedUrl = (url) => {
    const videoId = extractYoutubeId(url);
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&showinfo=1`
      : null;
  };

  const embedUrl = lecture ? getYoutubeEmbedUrl(lecture.vedioLink) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-all font-medium group"
          >
            <ArrowLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Lectures
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border-2 border-red-800/50 rounded-xl p-4 text-red-200 backdrop-blur-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        ) : lecture ? (
          <div className="space-y-8">
            {/* Publication Status */}
            <div className="flex items-center gap-4 bg-zinc-800/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-700/50 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-zinc-300 font-medium">
                  {lecture.isPublished ? "Published" : "Unpublished"}
                </span>
                <Switch className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-600" />
              </div>
              <span className="h-4 w-px bg-zinc-600/50" />
              <span className="text-sm text-zinc-400">
                Last updated:{" "}
                {new Date(lecture.updatedAt).toLocaleDateString("en-US", {
                  dateStyle: "medium",
                })}
              </span>
            </div>

            {/* Video Player Section */}
            <div className="bg-zinc-800/70 backdrop-blur-md rounded-2xl border-2 border-zinc-700/50 shadow-2xl overflow-hidden transition-all hover:border-zinc-600/50">
              <div className="p-6 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center gap-3">
                  <Play className="h-7 w-7 text-cyan-400" />
                  {lecture.title}
                </h2>
              </div>

              <div className="p-6">
                {embedUrl ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-black shadow-xl">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={lecture.title}
                    />

                    <div className="absolute inset-0 ring-inset ring-1 ring-white/5 pointer-events-none" />
                  </div>
                ) : (
                  <div className="bg-zinc-700/50 rounded-xl aspect-video flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full">
                        <Youtube className="h-12 w-12 text-red-500" />
                      </div>
                      <p className="text-zinc-300 font-medium">
                        Invalid YouTube URL
                      </p>
                      {lecture.vedioLink && (
                        <a
                          href={lecture.vedioLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-zinc-600/50 rounded-lg transition-colors text-zinc-200"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open External Link
                        </a>
                      )}
                    </div>
                  </div>
                )}
                <div className=" bg-white p-2 rounded-b-xl">
                  <img src="/y-t.png" className="w-30 h-7 " />
                  <Link
                    className="text-indigo-500 hover:underline"
                    href={"https://www.youtube.com/t/terms"}
                    target="_blank"
                  >
                    Terms Of Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Lecture Details Section */}
            <div className="bg-zinc-800/70 backdrop-blur-md rounded-2xl border-2 border-zinc-700/50 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center gap-3">
                  <BookOpen className="h-7 w-7 text-cyan-400" />
                  Lecture Details
                </h2>
              </div>

              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-200 mb-3">
                    Description
                  </h3>
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-line bg-zinc-900/30 p-6 rounded-xl border border-zinc-700/50">
                    {lecture.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Calendar className="h-5 w-5" />,
                      label: "Created Date",
                      value: new Date(lecture.createdAt).toLocaleDateString(
                        "en-US",
                        { dateStyle: "long" }
                      ),
                    },
                    {
                      icon: <Clock className="h-5 w-5" />,
                      label: "Created Time",
                      value: new Date(lecture.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      ),
                    },
                    {
                      icon: <Youtube className="h-5 w-5 text-red-500" />,
                      label: "YouTube Link",
                      value: lecture.vedioLink,
                      link: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 hover:border-zinc-600/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-zinc-700/30 rounded-lg">
                          {item.icon}
                        </div>
                        <span className="text-zinc-400 text-sm">
                          {item.label}
                        </span>
                      </div>
                      {item.link ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <span className="truncate">
                            {item.value.slice(0, 25)}...
                          </span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <p className="text-zinc-300 font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-700/30 rounded-xl border-2 border-zinc-600/50">
            <AlertCircle className="h-12 w-12 text-zinc-500 mx-auto mb-3 animate-pulse" />
            <h3 className="text-zinc-300 font-medium text-xl mb-1">
              Lecture Not Found
            </h3>
            <p className="text-zinc-500 text-sm">
              The requested lecture could not be loaded
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturePreviewPage;
