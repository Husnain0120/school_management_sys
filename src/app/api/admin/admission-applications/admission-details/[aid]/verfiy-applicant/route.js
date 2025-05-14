import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

// This function updates the isVerified status of an applicant by toggling it
export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const { aid } = await params; // ✅ Correct destructuring
    console.log(aid, "<:applicant id");

    // 🛠 Fetch applicant first
    const applicant = await AdmissionForm.findById(aid);
    if (!applicant) {
      return NextResponse.json(
        {
          message: "No applicant found to verify.",
          success: false,
        },
        { status: 404 }
      );
    }

    // ✅ Toggle verification
    applicant.isVerified = !applicant.isVerified;
    await applicant.save();

    const statusMessage = applicant.isVerified ? "verified" : "unverified";
    return NextResponse.json(
      {
        message: `Applicant ${statusMessage} successfully.`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to verify applicant:", error);
    return NextResponse.json(
      {
        message: "Failed to verify applicant.",
        success: false,
      },
      { status: 500 }
    );
  }
}
