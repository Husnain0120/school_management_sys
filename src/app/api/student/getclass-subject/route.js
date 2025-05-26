import dbConnect from "@/DataBase/db";
import { getUserFromToken } from "@/lib/getUserFromToken";
import AdmissionForm from "@/model/admissionForm.model";
import Class from "@/model/classes.model";
import Subject from "@/model/subject.model"; // Import the Subject model if needed
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const userid = await getUserFromToken(req);

    // First, get the student info
    const studentinfo = await AdmissionForm.findById(userid).select(
      "-password -subjects"
    );

    if (!studentinfo) {
      return NextResponse.json(
        { message: "Student Not Found!", success: false },
        { status: 404 }
      );
    }

    // Get the class ID
    const classId = studentinfo.class;

    // Now separately fetch the class with populated subjects and teachers
    if (classId) {
      const classData = await Class.findById(classId).populate({
        path: "subjects",
        model: "Subject",
        populate: {
          path: "teacher",
          model: "AdmissionForm",
          select: "fullName email studentPhoto",
        },
      });

      // Replace the class ID with the full class object
      const studentResponse = studentinfo.toObject(); // Convert to plain object
      studentResponse.class = classData;

      return NextResponse.json(
        {
          message: "Get Student Successfully!",
          success: true,
          data: studentResponse,
        },
        { status: 200 }
      );
    } else {
      // If no class is assigned
      return NextResponse.json(
        {
          message: "Get Student Successfully!",
          success: true,
          data: studentinfo,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Failed to get student info!", error);
    return NextResponse.json(
      {
        message: "Failed to get student info!",
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}
