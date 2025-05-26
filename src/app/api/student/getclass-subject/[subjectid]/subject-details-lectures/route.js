import dbConnect from "@/DataBase/db";
import Subject from "@/model/subject.model";
import AdmissionForm from "@/model/admissionForm.model";
import Lecture from "@/model/lecture.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { subjectid } = await params;

    // First get the subject
    const subject = await Subject.findById(subjectid);

    if (!subject) {
      return NextResponse.json(
        {
          message: "Subject not found!",
          success: false,
        },
        { status: 404 }
      );
    }

    // Then populate it separately (like your working route pattern)
    const subjectWithData = await Subject.findById(subjectid)
      .populate({
        path: "teacher",
        model: "AdmissionForm",
        select: "fullName email studentPhoto ",
      })
      .populate({
        path: "lectures",
        model: "Lecture",
        select: "title",
      });

    return NextResponse.json(
      {
        message: "Subject found successfully",
        success: true,
        subjectDetails: subjectWithData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get subject details:", error);
    return NextResponse.json(
      {
        message: "Failed to get subject details",
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
