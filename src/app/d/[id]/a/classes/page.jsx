"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Pencil, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

export default function ClassesPage() {
  // States for form inputs
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // States for data and loading
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  // Function to fetch classes from API
  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/classes-mange/create-class");
      if (response.data.classes) {
        setClasses(response.data.classes);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to load classes");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle description change and word count
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescription(text);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!className.trim()) {
      toast.error("Class name is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (wordCount > 500) {
      toast.error("Description exceeds 500 word limit");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/admin/classes-mange/create-class", {
        name: className,
        description: description,
      });

      // Success - clear form and refetch classes
      toast.success(res.data?.message || "Class created successfully");
      setClassName("");
      setDescription("");
      setWordCount(0);
      fetchClasses();
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error(error.response?.data?.message || "Failed to create class");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to truncate description
  const truncateDescription = (text, wordCount = 10) => {
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <>
      {/* Form Card Skeleton */}
      <Card className="mb-8 border-black/10 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-black/10">
          <Skeleton className="h-6 w-48 bg-zinc-500" />
          <Skeleton className="h-4 w-72 mt-1 bg-zinc-500" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-zinc-500" />
                <Skeleton className="h-10 w-full bg-zinc-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 bg-zinc-500" />
                  <Skeleton className="h-3 w-16 bg-zinc-500" />
                </div>
                <Skeleton className="h-[120px] w-full bg-zinc-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-28 bg-zinc-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Card Skeleton */}
      <Card className="border-black/10 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-black/10">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-6 w-40 bg-zinc-500" />
              <Skeleton className="h-4 w-60 mt-1 bg-zinc-500" />
            </div>
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-500" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            {/* Table Header Skeleton */}
            <div className="border-b border-gray-200">
              <div className="flex py-3">
                <Skeleton className="h-5 w-10 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-40 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 flex-1 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-32 mr-4 bg-zinc-500" />
                <Skeleton className="h-5 w-24 bg-zinc-500" />
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center py-4 border-b border-gray-100"
              >
                <Skeleton className="h-5 w-6 mr-4 bg-zinc-500" />
                <div className="w-40 mr-4">
                  <Skeleton className="h-5 w-32 bg-zinc-500" />
                </div>
                <div className="flex-1 mr-4">
                  <Skeleton className="h-5 w-full bg-zinc-500" />
                </div>
                <div className="w-32 mr-4">
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 rounded-full mr-2 bg-zinc-500" />
                    <Skeleton className="h-5 w-24 bg-zinc-500" />
                  </div>
                </div>
                <div className="w-24 flex justify-end">
                  <Skeleton className="h-8 w-20 bg-zinc-500" />
                </div>
              </div>
            ))}

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <Skeleton className="h-8 w-24 bg-zinc-500" />
              <div className="flex gap-1">
                {[1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="h-8 w-8 rounded-md bg-zinc-500"
                  />
                ))}
              </div>
              <Skeleton className="h-8 w-24 bg-zinc-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Class Management
          </h1>
          <p className="text-gray-600">
            Create and manage classes for your educational institution
          </p>
        </div>

        {/* Show loading skeleton or actual content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Form Card */}
            <Card className="mb-8 border-black/10 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-black/10">
                <CardTitle className="text-xl font-semibold text-black">
                  Add New Class
                </CardTitle>
                <CardDescription>
                  Create a new class by filling out the form below
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="className"
                        className="text-black font-medium"
                      >
                        Class Name
                      </Label>
                      <Input
                        id="className"
                        placeholder="Enter class name"
                        className="border-gray-300 focus-visible:ring-black"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="description"
                          className="text-black font-medium"
                        >
                          Description
                        </Label>
                        <span
                          className={`text-xs ${
                            wordCount > 500
                              ? "text-red-500 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {wordCount}/500 words
                        </span>
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Enter class description (max 500 words)"
                        className={`min-h-[120px] border-gray-300 focus-visible:ring-black ${
                          wordCount > 500
                            ? "border-red-300 focus-visible:ring-red-500"
                            : ""
                        }`}
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Add Class"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Table Card */}
            <Card className="border-black/10 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-black/10">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-black">
                      Existing Classes
                    </CardTitle>
                    <CardDescription>
                      View and manage all your classes
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {classes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow className="hover:bg-gray-50">
                          <TableHead className="w-[50px] text-black">
                            #
                          </TableHead>
                          <TableHead className="w-[200px] text-black">
                            Class Name
                          </TableHead>
                          <TableHead className="text-black">
                            Description
                          </TableHead>
                          <TableHead className="w-[150px] text-black">
                            Date Created
                          </TableHead>
                          <TableHead className="w-[100px] text-black text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classes.map((classItem, index) => (
                          <TableRow
                            key={classItem._id}
                            className="hover:bg-gray-50/50 border-b border-gray-100"
                          >
                            <TableCell className="font-medium text-gray-900">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium text-gray-900">
                              {classItem.name}
                            </TableCell>
                            <TableCell className="text-gray-700">
                              {truncateDescription(classItem.description)}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                                <span>{formatDate(classItem.createdAt)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link
                                href={`classes/${classItem._id}/create-subject`}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 hover:bg-gray-100 hover:text-black"
                                >
                                  <Pencil className="h-3.5 w-3.5 mr-1" />
                                  Update
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <svg
                        className="h-8 w-8 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Classes Found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      You haven't created any classes yet.
                    </p>
                    <Button
                      className="bg-black hover:bg-gray-800 text-white"
                      onClick={() =>
                        document.getElementById("className").focus()
                      }
                    >
                      Create Your First Class
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
