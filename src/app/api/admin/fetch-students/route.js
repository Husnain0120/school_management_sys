import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const allStudents = await AdmissionForm.find({
      role: "student",
      isVerified: true,
    }).select("-password -subjects");

    if (allStudents.length === 0) {
      return NextResponse.json(
        {
          message: "No Students Found!",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Students fetched successfully!",
        success: true,
        students: allStudents,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to get students!", error);
    return NextResponse.json(
      {
        message: "Failed to get students!",
        success: false,
        error: error.message, // Include error message for debugging
      },
      { status: 400 }
    );
  }
}
