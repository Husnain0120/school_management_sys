"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  MapPin,
  School,
  User,
  Home,
  Hash,
  Download,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import AdminVerifiedBadge from "@/components/verify-badge/Admin-verified-badge";
import TeacherVerifiedBadge from "@/components/verify-badge/Teacher-verified-badge";

// Add print styles
const printStyles = `
  @media print {
    /* Reset everything for print */
    * {
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      font-size: 10px !important;
      line-height: 1.2 !important;
    }
    
    /* Basic page setup for single page */
    @page {
      size: A4 portrait;
      margin: 0.3cm;
    }
    
    /* Hide navbar and other unnecessary elements */
    nav, header, footer, button, .no-print {
      display: none !important;
    }
    
    /* Force white background */
    body, html {
      background: white !important;
      width: 100% !important;
      height: auto !important;
      overflow: visible !important;
    }
    
    /* Remove min-height to fit on one page */
    .min-h-screen {
      min-height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    
    /* Completely restructure the layout for print */
    .max-w-6xl {
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    
    /* Make profile header smaller */
    .flex.flex-col.items-center.mb-8 {
      margin-bottom: 0.3rem !important;
    }
    
    .h-32.w-32 {
      height: 60px !important;
      width: 60px !important;
    }
    
    .text-3xl {
      font-size: 14px !important;
      font-weight: bold !important;
      margin: 0.2rem 0 !important;
    }
    
    /* Restructure grid layout for print */
    .grid {
      display: block !important;
      width: 100% !important;
      gap: 0 !important;
    }
    
    /* Make cards more compact */
    .card {
      border: 1px solid #eee !important;
      margin-bottom: 0.3rem !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      box-shadow: none !important;
    }
    
    /* Adjust card headers */
    [class*="CardHeader"] {
      padding: 0.2rem 0.5rem !important;
      border-bottom: 1px solid #eee !important;
    }
    
    [class*="CardTitle"] {
      font-size: 12px !important;
      font-weight: bold !important;
    }
    
    [class*="CardContent"] {
      padding: 0.3rem 0.5rem !important;
    }
    
    /* Make document images tiny */
    .aspect-w-3.aspect-h-4 {
      height: auto !important;
    }
    
    .aspect-w-3.aspect-h-4 img {
      max-height: 60px !important;
      width: auto !important;
      margin: 0 auto !important;
    }
    
    /* Restructure document section */
    .lg\\:col-span-3 .grid {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: space-between !important;
    }
    
    .lg\\:col-span-3 .grid > div {
      width: 32% !important;
      margin: 0 !important;
      padding: 0.2rem !important;
    }
    
    /* Adjust spacing in content */
    .space-y-4 {
      display: block !important;
      margin: 0 !important;
    }
    
    .space-y-4 > div {
      margin-bottom: 0.2rem !important;
    }
    
    /* Make text smaller */
    h3 {
      font-size: 10px !important;
      margin: 0 !important;
      color: #666 !important;
    }
    
    p {
      font-size: 10px !important;
      margin: 0 !important;
    }
    
    /* Adjust grid columns */
    .md\\:grid-cols-2, .md\\:grid-cols-3 {
      display: flex !important;
      flex-wrap: wrap !important;
    }
    
    .md\\:grid-cols-2 > div {
      width: 50% !important;
      padding-right: 0.3rem !important;
    }
    
    .md\\:grid-cols-3 > div {
      width: 33.33% !important;
      padding-right: 0.3rem !important;
    }
    
    /* Ensure no page breaks within sections */
    .lg\\:col-span-2, .lg\\:col-span-3 {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    /* Hide icons to save space */
    svg {
      display: none !important;
    }
    
    /* Make badges smaller */
    [class*="Badge"] {
      font-size: 8px !important;
      padding: 0.1rem 0.3rem !important;
    }
    
    /* Compact layout for personal info */
    .grid.grid-cols-1.md\\:grid-cols-2.gap-6 {
      display: flex !important;
      flex-wrap: wrap !important;
    }
    
    .grid.grid-cols-1.md\\:grid-cols-2.gap-6 > div {
      width: 50% !important;
    }
    
    /* Compact layout for account info */
    .grid.grid-cols-1.md\\:grid-cols-3.gap-6 {
      display: flex !important;
      flex-wrap: wrap !important;
    }
    
    .grid.grid-cols-1.md\\:grid-cols-3.gap-6 > div {
      width: 33.33% !important;
    }
  }
`;

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState(null);
  // State to track download progress
  const [downloading, setDownloading] = useState(false);

  // Function to handle printing the profile
  const handlePrintProfile = () => {
    // Create a temporary style element for print-specific styles
    const style = document.createElement("style");
    style.innerHTML = printStyles;
    document.head.appendChild(style);

    // Add a small delay to ensure styles are applied
    setTimeout(() => {
      // Trigger browser print dialog
      window.print();

      // Remove the style element after printing
      setTimeout(() => {
        document.head.removeChild(style);
      }, 1000);
    }, 100);
  };

  /**
   * Downloads a single document from a URL
   *
   * @param {string} url - The URL of the document to download
   * @param {string} filename - The filename to save the document as
   * @returns {Promise<Blob>} - A promise that resolves to the downloaded blob
   */
  const downloadSingleDocument = async (url, filename) => {
    try {
      // Check if URL is valid
      if (!url || url.includes("placeholder")) {
        console.warn(`Document ${filename} not available`);
        return null;
      }

      // Fetch the document from the URL
      const response = await fetch(url);

      // Check if the fetch was successful
      if (!response.ok) {
        throw new Error(
          `Failed to download ${filename}: ${response.statusText}`
        );
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Return the blob for further processing
      return blob;
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
      return null;
    }
  };

  /**
   * Downloads all available documents as a zip file
   *
   * This function:
   * 1. Sets downloading state to show loading indicator
   * 2. Creates a new JSZip instance
   * 3. Downloads each document and adds it to the zip
   * 4. Generates the zip file and triggers download
   * 5. Resets the downloading state
   */
  const handleDownloadDocuments = async () => {
    // Set downloading state to true to show loading indicator
    setDownloading(true);

    try {
      // Create a new JSZip instance
      const zip = new JSZip();

      // Define the documents to download with their URLs and filenames
      const documents = [
        {
          url: profileData.studentPhoto,
          filename: "student-photo.jpg",
          label: "Student Photo",
        },
        {
          url: profileData.idProof,
          filename: "id-proof.jpg",
          label: "ID Proof",
        },
        {
          url: profileData.birthCertificate,
          filename: "birth-certificate.jpg",
          label: "Birth Certificate",
        },
      ];

      // Download each document and add it to the zip
      for (const doc of documents) {
        // Skip if URL is not available or is a placeholder
        if (!doc.url || doc.url.includes("placeholder")) {
          console.warn(`${doc.label} not available for download`);
          continue;
        }

        // Download the document
        const blob = await downloadSingleDocument(doc.url, doc.filename);

        // Add the document to the zip if download was successful
        if (blob) {
          zip.file(doc.filename, blob);
        }
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create a filename for the zip using the student's name
      const zipFilename = `${profileData.fullName
        .replace(/\s+/g, "-")
        .toLowerCase()}-documents.zip`;

      // Trigger the download using FileSaver
      saveAs(zipBlob, zipFilename);

      console.log("Documents downloaded successfully");
    } catch (error) {
      console.error("Error downloading documents:", error);
      alert("Failed to download documents. Please try again later.");
    } finally {
      // Reset downloading state regardless of success or failure
      setDownloading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/user-profile`);
        if (res?.data?.data) {
          setProfile(res?.data?.data);
        }
      } catch (error) {
        console.log("fetch profie in profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Skeleton */}
          <div className="flex flex-col items-center  mb-8 text-center">
            <Skeleton className="h-32 w-32 rounded-full bg-zinc-800 mb-4" />
            <Skeleton className="h-8 w-64 bg-zinc-800 mb-2" />
            <Skeleton className="h-4 w-48 bg-zinc-800" />
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3  ">
            {/* Personal Information Card Skeleton */}
            <div className="lg:col-span-2  space-y-4 bg-zinc-500 rounded-2xl">
              <Skeleton className="h-10 w-full bg-zinc-800" />
              <div className="grid grid-cols-1  md:grid-cols-2 gap-6 p-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                    <Skeleton className="h-6 w-full bg-zinc-800 " />
                  </div>
                ))}
              </div>
            </div>

            {/* Address Information Card Skeleton */}
            <div className="space-y-4 bg-zinc-500 rounded-2xl">
              <Skeleton className="h-10 w-full bg-zinc-800" />
              <div className="space-y-4 p-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                    <Skeleton className="h-6 w-full bg-zinc-800" />
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section Skeleton */}
            <div className="lg:col-span-3 bg-zinc-500 rounded-2xl space-y-4 ">
              <Skeleton className="h-10 w-full bg-zinc-800" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-w-3 bg-zinc-800 aspect-h-4 w-full h-48" />
                    <Skeleton className="h-4 bg-zinc-800 w-24 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Account Information Skeleton */}
            <div className="lg:col-span-3 bg-zinc-500 rounded-2xl space-y-4">
              <Skeleton className="h-10 w-full bg-zinc-800" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                    <Skeleton className="h-6 w-full bg-zinc-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-4">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage
                src={profileData.studentPhoto || "/placeholder.svg"}
              />
              <AvatarFallback>{profileData.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            {profileData.isVerified && (
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                Verified
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {profileData.fullName}
            {profileData.role === "admin" ? (
              <AdminVerifiedBadge size={23} className="mt-2" />
            ) : (
              profileData.role === "teacher" && (
                <TeacherVerifiedBadge size={25} className="mt-2" />
              )
            )}
          </h1>
          <div className="flex items-center mt-2 text-gray-600">
            <span className="flex items-center">
              <School className="h-4 w-4 mr-1" />
              {profileData.role.charAt(0).toUpperCase() +
                profileData.role.slice(1)}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Hash className="h-4 w-4 mr-1" />
              {profileData.portalId}
            </span>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Personal Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1 text-sm">{profileData.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Father's Name
                    </h3>
                    <p className="mt-1 text-sm">{profileData.fatherName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Gender
                    </h3>
                    <p className="mt-1 text-sm capitalize">
                      {profileData.gender}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </h3>
                    <p className="mt-1 text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(profileData.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {profileData.email}
                    </p>
                  </div>
                  {profileData.role === "admin" ||
                  profileData.role === "teacher" ? (
                    ""
                  ) : (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Admission Class
                        </h3>
                        <p className="mt-1 text-sm">
                          Class {profileData.admissionClass}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Current Address
                  </h3>
                  <p className="mt-1 text-sm flex items-start gap-2">
                    <Home className="h-4 w-4 text-gray-400 mt-0.5" />
                    {profileData.currentAddress}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Permanent Address
                  </h3>
                  <p className="mt-1 text-sm flex items-start gap-2">
                    <Home className="h-4 w-4 text-gray-400 mt-0.5" />
                    {profileData.permanentAddress}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">City</h3>
                    <p className="mt-1 text-sm">{profileData.city}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Zip Code
                    </h3>
                    <p className="mt-1 text-sm">{profileData.zipCode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 mb-3">
                    <img
                      src={profileData.studentPhoto || "/placeholder.svg"}
                      alt="Student Photo"
                      className="object-cover rounded-lg w-full h-48"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium text-center">Student Photo</h3>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 mb-3">
                    <img
                      src={profileData.idProof || "/placeholder.svg"}
                      alt="ID Proof"
                      className="object-cover rounded-lg w-full h-48"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium text-center">ID Proof</h3>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 mb-3">
                    <img
                      src={profileData.birthCertificate || "/placeholder.svg"}
                      alt="Birth Certificate"
                      className="object-cover rounded-lg w-full h-48"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium text-center">Birth Certificate</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Account Created
                  </h3>
                  <p className="mt-1 text-sm">
                    {new Date(profileData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Account Status
                  </h3>
                  <div className="mt-1">
                    <Badge
                      variant={profileData.isVerified ? "default" : "secondary"}
                    >
                      {profileData.isVerified ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    User Role
                  </h3>
                  <div className="mt-1">
                    <Badge variant="outline" className="capitalize">
                      {profileData.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={"profile/edit"} className="cursor-pointer">
            <Button variant="outline" className="px-6 ">
              Edit Profile
            </Button>
          </Link>
          {/* Download Documents Button */}
          <Button
            variant="outline"
            className="px-6 flex cursor-pointer items-center gap-2"
            onClick={handleDownloadDocuments}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 " />
                Download Documents
              </>
            )}
          </Button>
          {/* Print Profile Button */}
          <Button
            className="px-6 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={handlePrintProfile}
          >
            Print Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Calendar,
//   Mail,
//   MapPin,
//   School,
//   User,
//   Home,
//   Hash,
//   Download,
//   Printer,
//   FileText,
//   Clock,
//   CheckCircle,
//   Shield,
//   BookOpen,
//   GraduationCap,
//   Building,
//   Phone,
// } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";

// // Add print styles
// const printStyles = `
//   @media print {
//     /* Reset everything for print */
//     * {
//       margin: 0 !important;
//       padding: 0 !important;
//       box-sizing: border-box !important;
//       font-size: 10px !important;
//       line-height: 1.2 !important;
//     }

//     /* Basic page setup for single page */
//     @page {
//       size: A4 portrait;
//       margin: 0.3cm;
//     }

//     /* Hide navbar and other unnecessary elements */
//     nav, header, footer, button, .no-print {
//       display: none !important;
//     }

//     /* Force white background */
//     body, html {
//       background: white !important;
//       width: 100% !important;
//       height: auto !important;
//       overflow: visible !important;
//     }

//     /* Remove min-height to fit on one page */
//     .min-h-screen {
//       min-height: 0 !important;
//       padding: 0 !important;
//       margin: 0 !important;
//     }

//     /* Completely restructure the layout for print */
//     .max-w-6xl {
//       max-width: 100% !important;
//       padding: 0 !important;
//       margin: 0 !important;
//     }

//     /* Make profile header smaller */
//     .flex.flex-col.items-center.mb-8 {
//       margin-bottom: 0.3rem !important;
//     }

//     .h-32.w-32 {
//       height: 60px !important;
//       width: 60px !important;
//     }

//     .text-3xl {
//       font-size: 14px !important;
//       font-weight: bold !important;
//       margin: 0.2rem 0 !important;
//     }

//     /* Restructure grid layout for print */
//     .grid {
//       display: block !important;
//       width: 100% !important;
//       gap: 0 !important;
//     }

//     /* Make cards more compact */
//     .card {
//       border: 1px solid #eee !important;
//       margin-bottom: 0.3rem !important;
//       break-inside: avoid !important;
//       page-break-inside: avoid !important;
//       box-shadow: none !important;
//     }

//     /* Adjust card headers */
//     [class*="CardHeader"] {
//       padding: 0.2rem 0.5rem !important;
//       border-bottom: 1px solid #eee !important;
//     }

//     [class*="CardTitle"] {
//       font-size: 12px !important;
//       font-weight: bold !important;
//     }

//     [class*="CardContent"] {
//       padding: 0.3rem 0.5rem !important;
//     }

//     /* Make document images tiny */
//     .aspect-w-3.aspect-h-4 {
//       height: auto !important;
//     }

//     .aspect-w-3.aspect-h-4 img {
//       max-height: 60px !important;
//       width: auto !important;
//       margin: 0 auto !important;
//     }

//     /* Restructure document section */
//     .lg\\:col-span-3 .grid {
//       display: flex !important;
//       flex-wrap: wrap !important;
//       justify-content: space-between !important;
//     }

//     .lg\\:col-span-3 .grid > div {
//       width: 32% !important;
//       margin: 0 !important;
//       padding: 0.2rem !important;
//     }

//     /* Adjust spacing in content */
//     .space-y-4 {
//       display: block !important;
//       margin: 0 !important;
//     }

//     .space-y-4 > div {
//       margin-bottom: 0.2rem !important;
//     }

//     /* Make text smaller */
//     h3 {
//       font-size: 10px !important;
//       margin: 0 !important;
//       color: #666 !important;
//     }

//     p {
//       font-size: 10px !important;
//       margin: 0 !important;
//     }

//     /* Adjust grid columns */
//     .md\\:grid-cols-2, .md\\:grid-cols-3 {
//       display: flex !important;
//       flex-wrap: wrap !important;
//     }

//     .md\\:grid-cols-2 > div {
//       width: 50% !important;
//       padding-right: 0.3rem !important;
//     }

//     .md\\:grid-cols-3 > div {
//       width: 33.33% !important;
//       padding-right: 0.3rem !important;
//     }

//     /* Ensure no page breaks within sections */
//     .lg\\:col-span-2, .lg\\:col-span-3 {
//       page-break-inside: avoid !important;
//       break-inside: avoid !important;
//     }

//     /* Hide icons to save space */
//     svg {
//       display: none !important;
//     }

//     /* Make badges smaller */
//     [class*="Badge"] {
//       font-size: 8px !important;
//       padding: 0.1rem 0.3rem !important;
//     }

//     /* Compact layout for personal info */
//     .grid.grid-cols-1.md\\:grid-cols-2.gap-6 {
//       display: flex !important;
//       flex-wrap: wrap !important;
//     }

//     .grid.grid-cols-1.md\\:grid-cols-2.gap-6 > div {
//       width: 50% !important;
//     }

//     /* Compact layout for account info */
//     .grid.grid-cols-1.md\\:grid-cols-3.gap-6 {
//       display: flex !important;
//       flex-wrap: wrap !important;
//     }

//     .grid.grid-cols-1.md\\:grid-cols-3.gap-6 > div {
//       width: 33.33% !important;
//     }
//   }
// `;

// export default function EnhancedProfilePage() {
//   const [loading, setLoading] = useState(true);
//   const [profileData, setProfile] = useState(null);
//   const [activeTab, setActiveTab] = useState("personal");
//   const [downloading, setDownloading] = useState(false);

//   // Function to handle printing the profile
//   const handlePrintProfile = () => {
//     // Create a temporary style element for print-specific styles
//     const style = document.createElement("style");
//     style.innerHTML = printStyles;
//     document.head.appendChild(style);

//     // Add a small delay to ensure styles are applied
//     setTimeout(() => {
//       // Trigger browser print dialog
//       window.print();

//       // Remove the style element after printing
//       setTimeout(() => {
//         document.head.removeChild(style);
//       }, 1000);
//     }, 100);
//   };

//   // Function to download documents
//   const handleDownloadDocuments = async () => {
//     setDownloading(true);

//     // Simulate download delay
//     setTimeout(() => {
//       setDownloading(false);
//     }, 2000);
//   };

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       // Mock profile data
//       const mockProfile = {
//         fullName: "Alexander Thompson",
//         fatherName: "Robert Thompson",
//         gender: "male",
//         dateOfBirth: "1998-05-15",
//         email: "alex.thompson@university.edu",
//         role: "student",
//         portalId: "STU-2023-78945",
//         admissionClass: "Computer Science",
//         currentAddress:
//           "456 University Housing, Building B, Room 302, University Campus, New York",
//         permanentAddress: "123 Maple Avenue, Westfield, NY 10001",
//         city: "New York",
//         zipCode: "10001",
//         studentPhoto: "/placeholder.svg?height=200&width=200",
//         idProof: "/placeholder.svg?height=200&width=200",
//         birthCertificate: "/placeholder.svg?height=200&width=200",
//         createdAt: "2022-09-01T00:00:00.000Z",
//         isVerified: true,
//         phoneNumber: "+1 (555) 123-4567",
//         semester: "6th Semester",
//         gpa: "3.85",
//         department: "School of Computer Science",
//         enrollmentYear: "2020",
//         expectedGraduation: "2024",
//         emergencyContact: "Robert Thompson (+1 555-987-6543)",
//       };

//       setProfile(mockProfile);
//       setLoading(false);
//     }, 1500);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Premium Skeleton UI */}
//           <div className="w-full h-64 rounded-3xl bg-gradient-to-r from-slate-200 to-slate-300 mb-8 relative overflow-hidden">
//             <div className="absolute inset-0 bg-shimmer"></div>
//             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
//               <Skeleton className="h-24 w-24 rounded-full bg-slate-300" />
//               <Skeleton className="h-6 w-48 mt-4 bg-slate-300" />
//               <Skeleton className="h-4 w-32 mt-2 bg-slate-300" />
//             </div>
//           </div>

//           {/* Tabs Skeleton */}
//           <div className="flex justify-center mb-8">
//             <Skeleton className="h-10 w-96 rounded-full bg-slate-200" />
//           </div>

//           {/* Content Skeleton */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Skeleton className="h-[400px] rounded-3xl bg-slate-200" />
//             <Skeleton className="h-[400px] rounded-3xl bg-slate-200" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Premium Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-8 overflow-hidden shadow-xl"
//         >
//           <div className="bg-white/10 backdrop-blur-sm p-8">
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               <div className="relative">
//                 <div className="rounded-full p-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
//                   <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
//                     <AvatarImage
//                       src={profileData.studentPhoto || "/placeholder.svg"}
//                       alt={profileData.fullName}
//                     />
//                     <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl">
//                       {profileData.fullName.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                 </div>
//                 {profileData.isVerified && (
//                   <Badge className="absolute -bottom-2 -right-2 bg-green-500 border-2 border-white px-3 py-1">
//                     <CheckCircle className="h-3 w-3 mr-1" /> Verified
//                   </Badge>
//                 )}
//               </div>

//               <div className="text-center md:text-left flex-1">
//                 <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
//                   {profileData.fullName}
//                 </h1>
//                 <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
//                   <Badge
//                     variant="secondary"
//                     className="bg-white/20 text-white hover:bg-white/30 px-3 py-1"
//                   >
//                     <School className="h-3 w-3 mr-1" />
//                     {profileData.role.charAt(0).toUpperCase() +
//                       profileData.role.slice(1)}
//                   </Badge>
//                   <Badge
//                     variant="secondary"
//                     className="bg-white/20 text-white hover:bg-white/30 px-3 py-1"
//                   >
//                     <Hash className="h-3 w-3 mr-1" />
//                     {profileData.portalId}
//                   </Badge>
//                   <Badge
//                     variant="secondary"
//                     className="bg-white/20 text-white hover:bg-white/30 px-3 py-1"
//                   >
//                     <BookOpen className="h-3 w-3 mr-1" />
//                     {profileData.admissionClass}
//                   </Badge>
//                 </div>
//                 <div className="mt-3 text-white/80 flex flex-wrap justify-center md:justify-start gap-4">
//                   <span className="flex items-center">
//                     <Mail className="h-4 w-4 mr-1" />
//                     {profileData.email}
//                   </span>
//                   <span className="flex items-center">
//                     <Phone className="h-4 w-4 mr-1" />
//                     {profileData.phoneNumber}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end gap-2">
//                 <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white">
//                   <p className="text-sm font-medium">Current Semester</p>
//                   <p className="text-lg font-bold flex items-center">
//                     <GraduationCap className="h-4 w-4 mr-1" />
//                     {profileData.semester}
//                   </p>
//                 </div>
//                 <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white">
//                   <p className="text-sm font-medium">GPA</p>
//                   <p className="text-lg font-bold">{profileData.gpa}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs Navigation */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="mb-8"
//         >
//           <Tabs
//             defaultValue="personal"
//             className="w-full"
//             onValueChange={setActiveTab}
//           >
//             <div className="flex justify-center">
//               <TabsList className="grid grid-cols-4 w-full max-w-2xl rounded-full p-1 bg-slate-100">
//                 <TabsTrigger
//                   value="personal"
//                   className="rounded-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
//                 >
//                   <User className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Personal</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="address"
//                   className="rounded-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
//                 >
//                   <MapPin className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Address</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="documents"
//                   className="rounded-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
//                 >
//                   <FileText className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Documents</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="account"
//                   className="rounded-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
//                 >
//                   <Shield className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Account</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             {/* Personal Information Tab */}
//             <TabsContent value="personal">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
//               >
//                 <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
//                   <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2 text-xl">
//                       <User className="h-5 w-5 text-indigo-500" />
//                       Personal Information
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-6">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem
//                           label="Full Name"
//                           value={profileData.fullName}
//                         />
//                         <InfoItem
//                           label="Father's Name"
//                           value={profileData.fatherName}
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem
//                           label="Date of Birth"
//                           value={new Date(
//                             profileData.dateOfBirth
//                           ).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                           icon={
//                             <Calendar className="h-4 w-4 text-indigo-400" />
//                           }
//                         />
//                         <InfoItem
//                           label="Gender"
//                           value={
//                             profileData.gender.charAt(0).toUpperCase() +
//                             profileData.gender.slice(1)
//                           }
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem
//                           label="Email"
//                           value={profileData.email}
//                           icon={<Mail className="h-4 w-4 text-indigo-400" />}
//                         />
//                         <InfoItem
//                           label="Phone Number"
//                           value={profileData.phoneNumber}
//                           icon={<Phone className="h-4 w-4 text-indigo-400" />}
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
//                   <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2 text-xl">
//                       <GraduationCap className="h-5 w-5 text-purple-500" />
//                       Academic Information
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-6">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem
//                           label="Program"
//                           value={profileData.admissionClass}
//                         />
//                         <InfoItem
//                           label="Department"
//                           value={profileData.department}
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem
//                           label="Current Semester"
//                           value={profileData.semester}
//                         />
//                         <InfoItem label="GPA" value={profileData.gpa} />
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem
//                           label="Enrollment Year"
//                           value={profileData.enrollmentYear}
//                         />
//                         <InfoItem
//                           label="Expected Graduation"
//                           value={profileData.expectedGraduation}
//                         />
//                       </div>
//                       <InfoItem
//                         label="Emergency Contact"
//                         value={profileData.emergencyContact}
//                         icon={<Phone className="h-4 w-4 text-purple-400" />}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </TabsContent>

//             {/* Address Information Tab */}
//             <TabsContent value="address">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
//                   <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2 text-xl">
//                       <MapPin className="h-5 w-5 text-indigo-500" />
//                       Address Information
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="bg-indigo-100 p-2 rounded-full">
//                             <Home className="h-4 w-4 text-indigo-600" />
//                           </div>
//                           <h3 className="font-medium text-lg">
//                             Current Address
//                           </h3>
//                         </div>
//                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
//                           <p className="text-slate-700 whitespace-pre-line">
//                             {profileData.currentAddress}
//                           </p>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <InfoItem label="City" value={profileData.city} />
//                           <InfoItem
//                             label="Zip Code"
//                             value={profileData.zipCode}
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="bg-purple-100 p-2 rounded-full">
//                             <Building className="h-4 w-4 text-purple-600" />
//                           </div>
//                           <h3 className="font-medium text-lg">
//                             Permanent Address
//                           </h3>
//                         </div>
//                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
//                           <p className="text-slate-700 whitespace-pre-line">
//                             {profileData.permanentAddress}
//                           </p>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <InfoItem label="City" value={profileData.city} />
//                           <InfoItem
//                             label="Zip Code"
//                             value={profileData.zipCode}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </TabsContent>

//             {/* Documents Tab */}
//             <TabsContent value="documents">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
//                   <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2 text-xl">
//                       <FileText className="h-5 w-5 text-indigo-500" />
//                       Documents
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                       <DocumentCard
//                         title="Student Photo"
//                         image={profileData.studentPhoto}
//                         alt="Student Photo"
//                       />
//                       <DocumentCard
//                         title="ID Proof"
//                         image={profileData.idProof}
//                         alt="ID Proof"
//                       />
//                       <DocumentCard
//                         title="Birth Certificate"
//                         image={profileData.birthCertificate}
//                         alt="Birth Certificate"
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </TabsContent>

//             {/* Account Information Tab */}
//             <TabsContent value="account">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
//                   <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2 text-xl">
//                       <Shield className="h-5 w-5 text-indigo-500" />
//                       Account Information
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="bg-indigo-100 p-2 rounded-full">
//                             <Clock className="h-4 w-4 text-indigo-600" />
//                           </div>
//                           <h3 className="font-medium">Account Created</h3>
//                         </div>
//                         <p className="text-slate-700">
//                           {new Date(profileData.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )}
//                         </p>
//                       </div>

//                       <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="bg-green-100 p-2 rounded-full">
//                             <CheckCircle className="h-4 w-4 text-green-600" />
//                           </div>
//                           <h3 className="font-medium">Account Status</h3>
//                         </div>
//                         <Badge
//                           className={
//                             profileData.isVerified
//                               ? "bg-green-500"
//                               : "bg-yellow-500"
//                           }
//                         >
//                           {profileData.isVerified ? "Active" : "Inactive"}
//                         </Badge>
//                       </div>

//                       <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="bg-purple-100 p-2 rounded-full">
//                             <User className="h-4 w-4 text-purple-600" />
//                           </div>
//                           <h3 className="font-medium">User Role</h3>
//                         </div>
//                         <Badge
//                           variant="outline"
//                           className="capitalize border-purple-200 text-purple-700"
//                         >
//                           {profileData.role}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </TabsContent>
//           </Tabs>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mt-8 flex flex-wrap justify-center gap-4"
//         >
//           <Button
//             variant="outline"
//             className="px-6 rounded-full border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
//           >
//             <User className="h-4 w-4 mr-2" />
//             Edit Profile
//           </Button>

//           <Button
//             variant="outline"
//             className="px-6 rounded-full border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 flex items-center gap-2"
//             onClick={handleDownloadDocuments}
//             disabled={downloading}
//           >
//             {downloading ? (
//               <>
//                 <div className="h-4 w-4 border-2 border-t-transparent border-purple-600 rounded-full animate-spin"></div>
//                 Downloading...
//               </>
//             ) : (
//               <>
//                 <Download className="h-4 w-4" />
//                 Download Documents
//               </>
//             )}
//           </Button>

//           <Button
//             className="px-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all duration-300"
//             onClick={handlePrintProfile}
//           >
//             <Printer className="h-4 w-4 mr-2" />
//             Print Profile
//           </Button>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // Helper Components
// const InfoItem = ({ label, value, icon }) => (
//   <div className="space-y-1">
//     <p className="text-sm font-medium text-slate-500">{label}</p>
//     <p className="flex items-center gap-1 text-slate-800">
//       {icon && icon}
//       {value}
//     </p>
//   </div>
// );

// const DocumentCard = ({ title, image, alt }) => (
//   <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 group">
//     <div className="aspect-w-3 aspect-h-4 relative">
//       <img
//         src={image || "/placeholder.svg"}
//         alt={alt}
//         className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
//         style={{ objectFit: "contain" }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
//         <Button
//           variant="secondary"
//           size="sm"
//           className="bg-white/80 backdrop-blur-sm"
//         >
//           <Download className="h-3 w-3 mr-1" /> Download
//         </Button>
//       </div>
//     </div>
//     <div className="p-4">
//       <h3 className="font-medium text-center">{title}</h3>
//     </div>
//   </div>
// );
