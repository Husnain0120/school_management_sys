import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  console.log(
    "PUT /api/admin/admission-applications/admission-details/[aid]/verfiy-applicant called"
  );

  try {
    console.log("Attempting to connect to database...");
    await dbConnect();
    console.log("Database connected successfully");
  } catch (dbError) {
    console.error("Database connection failed:", dbError);
    return NextResponse.json(
      {
        message: "Database connection failed",
        success: false,
        error: dbError.message,
      },
      { status: 500 }
    );
  }

  try {
    const { aid } = params;
    console.log("Applicant ID:", aid);

    if (!aid || typeof aid !== "string") {
      console.log("Invalid applicant ID received");
      return NextResponse.json(
        { message: "Invalid applicant ID", success: false },
        { status: 400 }
      );
    }

    console.log("Finding and updating applicant...");
    const applicant = await AdmissionForm.findById(aid);
    console.log("Found applicant:", applicant);

    if (!applicant) {
      console.log("No applicant found with ID:", aid);
      return NextResponse.json(
        { message: "No applicant found", success: false },
        { status: 404 }
      );
    }

    console.log("Current verification status:", applicant.isVerified);
    applicant.isVerified = !applicant.isVerified;

    console.log("Saving updated applicant...");
    await applicant.save();
    console.log("Applicant saved successfully");

    const statusMessage = applicant.isVerified ? "verified" : "unverified";
    console.log("Operation successful, new status:", statusMessage);

    return NextResponse.json(
      {
        message: `Applicant ${statusMessage} successfully`,
        success: true,
        isVerified: applicant.isVerified,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Full error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      {
        message: "Failed to verify applicant",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
