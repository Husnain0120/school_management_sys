import dbConnect from "@/DataBase/db";
import { getUserFromToken } from "@/lib/getUserFromToken";
import AdmissionForm from "@/model/admissionForm.model";
import Subject from "@/model/subject.model"; // Make sure this import is correct
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const userId = await getUserFromToken(req);
    console.log(userId, "id");

    // First check if the Subject model is properly loaded
    if (!Subject) {
      console.error("Subject model is not properly defined");
      return NextResponse.json(
        { message: "Internal server error", success: false },
        { status: 500 }
      );
    }

    // Use lean() for better performance and explicitly select fields
    const teacher = await AdmissionForm.findById(userId).populate({
      path: "subjects",
    });

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher Not Found!", success: false },
        { status: 404 }
      );
    }

    // // Log the populated data for debugging
    // console.log("Populated subjects:", teacher.subjects);

    return NextResponse.json(
      {
        message: "Teacher subjects fetched successfully",
        success: true,
        data: teacher,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to get subjects:", error);
    return NextResponse.json(
      {
        message: "Failed to get subjects!",
        success: false,
        error: error.message, // Include the error message for debugging
      },
      { status: 500 }
    );
  }
}
