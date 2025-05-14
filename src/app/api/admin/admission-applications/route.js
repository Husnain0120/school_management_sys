import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

/**
 * @desc Get new (unverified) admission applications
 * @route GET /api/your-endpoint
 */
export async function GET(req) {
  try {
    // ✅ Connect to MongoDB
    await dbConnect();

    // ✅ Find all new admission applications (isVerified: false)
    const applications = await AdmissionForm.find({ isVerified: false }).select(
      "-password"
    );

    // ✅ If no new applications found
    if (!applications || applications.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No new admission applications found.",
          applications: [],
        },
        { status: 404 } // Not Found
      );
    }

    // ✅ Return the list of new applications
    return NextResponse.json(
      {
        success: true,
        message: "New admission applications fetched successfully.",
        total: applications.length,
        applications,
      },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("❌ Error fetching new admission applications:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error while fetching new admission applications.",
        error: error.message || "Unknown error",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
