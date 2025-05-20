import dbConnect from "@/DataBase/db";
import Lecture from "@/model/lecture.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { lectureid } = await params;
    const lectureById = await Lecture.findById(lectureid);
    if (!lectureById) {
      return NextResponse.json(
        { message: " lecture not found!", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "lecture Get successfully!",
        success: true,
        data: lectureById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get lecture !", error);
    return NextResponse.json(
      { message: "Failed to get lecture !", success: false },
      { status: 400 }
    );
  }
}
