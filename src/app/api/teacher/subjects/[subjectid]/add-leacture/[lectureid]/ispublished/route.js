import dbConnect from "@/DataBase/db";
import Lecture from "@/model/lecture.model";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { lectureid } = await params;
    const lecture = await Lecture.findById(lectureid);
    if (!lecture) {
      return NextResponse.json(
        {
          message: "Lecture not found!",
          success: false,
        },
        { status: 404 }
      );
    }
    lecture.isPublished = !lecture.isPublished;

    await lecture.save();
    const message = lecture.isPublished ? "published" : "unPublished";

    return NextResponse.json(
      { message: `lecture ${message} successfully`, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update published lecture!", error);
    return NextResponse.json(
      {
        message: "failed to published lectures!",
        success: false,
      },
      { status: 400 }
    );
  }
}
