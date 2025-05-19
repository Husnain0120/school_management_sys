"use server";

import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UploadImage } from "@/lib/upload-image";
import dbConnect from "@/DataBase/db";

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(req) {
  try {
    // Connect to database
    await dbConnect();

    // Parse form data
    const form = await req.formData();

    // Extract text fields from formData
    const fullName = form.get("fullName")?.trim();
    const fatherName = form.get("fatherName")?.trim();
    const email = form.get("email")?.trim();
    const gender = form.get("gender");
    const dateOfBirth = form.get("dateOfBirth");
    const currentAddress = form.get("currentAddress")?.trim();
    const permanentAddress = form.get("permanentAddress")?.trim();
    const city = form.get("city")?.trim();
    const zipCode = form.get("zipCode")?.trim();
    const admissionClass = form.get("admissionClass");
    const previousSchool = form.get("previousSchool")?.trim() || "";

    // Validate required fields
    const requiredFields = {
      fullName,
      fatherName,
      email,
      gender,
      dateOfBirth,
      currentAddress,
      permanentAddress,
      city,
      zipCode,
      admissionClass,
    };

    // Check for missing fields
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingUser = await AdmissionForm.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered. Use another email.",
        },
        { status: 400 }
      );
    }

    // Handle image uploads
    const studentPhotoFile = form.get("studentPhoto");
    const idProofFile = form.get("idProof");
    const birthCertificateFile = form.get("birthCertificate");

    // Validate required files
    if (!studentPhotoFile || !idProofFile || !birthCertificateFile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All document uploads are required (photo, ID proof, and birth certificate)",
        },
        { status: 400 }
      );
    }

    // Validate file sizes (10MB limit)
    if (
      studentPhotoFile.size > MAX_FILE_SIZE ||
      idProofFile.size > MAX_FILE_SIZE ||
      birthCertificateFile.size > MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "File size exceeds the maximum limit of 10MB (Cloudinary restriction)",
        },
        { status: 400 }
      );
    }

    // Upload images to cloud storage
    const uploadPromises = [];
    const uploadResults = {};

    try {
      if (studentPhotoFile && typeof studentPhotoFile === "object") {
        uploadPromises.push(
          UploadImage(studentPhotoFile, "admission/studentPhoto").then(
            (result) => {
              uploadResults.studentPhoto = result.secure_url;
            }
          )
        );
      }

      if (idProofFile && typeof idProofFile === "object") {
        uploadPromises.push(
          UploadImage(idProofFile, "admission/idProof").then((result) => {
            uploadResults.idProof = result.secure_url;
          })
        );
      }

      if (birthCertificateFile && typeof birthCertificateFile === "object") {
        uploadPromises.push(
          UploadImage(birthCertificateFile, "admission/birthCertificate").then(
            (result) => {
              uploadResults.birthCertificate = result.secure_url;
            }
          )
        );
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
    } catch (uploadError) {
      console.error("Error uploading files:", uploadError);

      // Check if the error is related to file size
      if (
        uploadError.message &&
        uploadError.message.includes("File size too large")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "File size exceeds Cloudinary's 10MB limit. Please upload smaller files.",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Failed to upload documents. Please try again.",
        },
        { status: 500 }
      );
    }

    // Generate unique portal ID
    function generateUniqueId() {
      const yearPrefix = new Date().getFullYear().toString().slice(2); // e.g. "25" for 2025
      const randomDigits = Math.floor(1000000 + Math.random() * 9000000); // 7-digit number
      return `edu${yearPrefix}${randomDigits}`;
    }

    const portalId = generateUniqueId();
    const rawPassword = "edu@123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Create new admission record using create() instead of save()
    await AdmissionForm.create({
      fullName,
      fatherName,
      email,
      gender,
      dateOfBirth,
      currentAddress,
      permanentAddress,
      city,
      zipCode,
      admissionClass,
      previousSchool,
      studentPhoto: uploadResults.studentPhoto,
      idProof: uploadResults.idProof,
      birthCertificate: uploadResults.birthCertificate,
      portalId,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Admission application submitted successfully! We will review your application and contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error during admission submission:", error);

    // Handle specific error types
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Validation error: " +
            Object.values(error.errors)
              .map((e) => e.message)
              .join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit admission application. Please try again later.",
      },
      { status: 500 }
    );
  }
}
