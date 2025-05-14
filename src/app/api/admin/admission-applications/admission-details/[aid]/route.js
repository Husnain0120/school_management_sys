import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

// ✅ GET Student Admission Details by ID
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { aid } = await params;

    // 🔍 Fetch admission details by ID (excluding password)
    const details = await AdmissionForm.findById(aid).select("-password");

    if (!details) {
      return NextResponse.json(
        {
          message: "Invalid details: Application not found",
          success: false,
        },
        { status: 404 } // ❌ Not Found
      );
    }

    return NextResponse.json(
      {
        message: `${details.fullName}'s details fetched successfully.`,
        success: true,
        details,
      },
      { status: 200 } // ✅ OK
    );
  } catch (error) {
    console.error("Failed to get application details:", error);
    return NextResponse.json(
      {
        message: "Failed to get application details",
        success: false,
        error: error.message,
      },
      { status: 500 } // ❗ Internal Server Error
    );
  }
}
