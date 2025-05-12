"use server";

import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UploadImage } from "@/lib/upload-image";
import dbConnect from "@/DataBase/db";

export async function POST(req) {
  await dbConnect();

  try {
    // ✅ Use formData for multipart/form-data requests
    const form = await req.formData();

    // ✅ Get text fields from formData
    const fullName = form.get("fullName");
    const fatherName = form.get("fatherName");
    const email = form.get("email");
    const gender = form.get("gender");
    const dateOfBirth = form.get("dateOfBirth");
    const currentAddress = form.get("currentAddress");
    const permanentAddress = form.get("permanentAddress");
    const city = form.get("city");
    const zipCode = form.get("zipCode");
    const admissionClass = form.get("admissionClass");
    const previousSchool = form.get("previousSchool") || "";

    // ✅ Validate all required fields
    if (
      !fullName ||
      !fatherName ||
      !email ||
      !gender ||
      !dateOfBirth ||
      !currentAddress ||
      !permanentAddress ||
      !city ||
      !zipCode ||
      !admissionClass
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Check for duplicate email
    const existingUser = await AdmissionForm.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered. Use another email." },
        { status: 400 }
      );
    }

    // ✅ Handle image uploads
    const studentPhotoFile = form.get("studentPhoto");
    const idProofFile = form.get("idProof");
    const birthCertificateFile = form.get("birthCertificate");

    let studentPhotoUrl = "";
    let idProofUrl = "";
    let birthCertificateUrl = "";

    if (studentPhotoFile && typeof studentPhotoFile === "object") {
      const uploaded = await UploadImage(
        studentPhotoFile,
        "admission/studentPhoto"
      );
      studentPhotoUrl = uploaded.secure_url;
    }

    if (idProofFile && typeof idProofFile === "object") {
      const uploaded = await UploadImage(idProofFile, "admission/idProof");
      idProofUrl = uploaded.secure_url;
    }

    if (birthCertificateFile && typeof birthCertificateFile === "object") {
      const uploaded = await UploadImage(
        birthCertificateFile,
        "admission/birthCertificate"
      );
      birthCertificateUrl = uploaded.secure_url;
    }

    // ✅ Generate unique portal ID
    function generateUniqueId() {
      const yearPrefix = new Date().getFullYear().toString().slice(2); // e.g. "25" for 2025
      const randomDigits = Math.floor(1000000 + Math.random() * 9000000); // 7-digit number
      return `edu${yearPrefix}${randomDigits}`;
    }

    const portalId = generateUniqueId();
    const rawPassword = "edu@123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // ✅ Create and save document using .save() for control
    const newAdmission = new AdmissionForm({
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
      studentPhoto: studentPhotoUrl,
      idProof: idProofUrl,
      birthCertificate: birthCertificateUrl,
      portalId,
      password: hashedPassword,
    });

    await newAdmission.save();

    return NextResponse.json(
      {
        message: "Admission form submitted successfully.",
        // Optional: remove if not to be returned
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error during admission submission:", error);
    return NextResponse.json(
      { message: "Failed to submit admission. Please try again." },
      { status: 500 }
    );
  }
}
