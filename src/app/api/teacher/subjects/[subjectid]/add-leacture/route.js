import dbConnect from "@/DataBase/db";
import Lecture from "@/model/lecture.model";
import Subject from "@/model/subject.model";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    // 1. Connect to DB
    await dbConnect();

    // 2. Get subject ID from route params
    const { subjectid } = await params; // ✅ FIXED: removed await

    // 3. Parse body
    const { title, description, vedioLink } = await req.json();

    // 4. Validate
    if (!title || !description || !vedioLink) {
      return NextResponse.json(
        { message: "All fields are required!", success: false },
        { status: 400 }
      );
    }
    // cheack this vedio link is already uploaded..
    const cheackVedio = await Lecture.findOne({ vedioLink });
    if (cheackVedio) {
      return NextResponse.json(
        { message: "vedio link is already uploaded", success: false },
        { status: 400 }
      );
    }
    // 5. Create and save new lecture
    const newLecture = new Lecture({
      title,
      description,
      vedioLink,
    });
    await newLecture.save();

    // 6. Find subject and push lecture ID
    const subjectById = await Subject.findById(subjectid);
    if (!subjectById) {
      return NextResponse.json(
        { message: "Subject not found!", success: false },
        { status: 404 }
      );
    }

    subjectById.lectures.push(newLecture._id);
    await subjectById.save();

    // 7. Respond success
    return NextResponse.json(
      {
        message: "Lecture created successfully!",
        success: true,
        lecture: newLecture,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create lecture!", error);
    return NextResponse.json(
      { message: "Failed to create lecture!", success: false },
      { status: 500 }
    );
  }
}

// GET lecters by subjects...
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { subjectid } = await params;
    const leacturesbySubjects = await Subject.findById(subjectid).populate({
      path: "lectures",
      model: "Lecture",
    });

    if (!leacturesbySubjects) {
      return NextResponse.json(
        { message: "subject or leactures no found!", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "get All leactures successfully!",
        success: true,
        data: leacturesbySubjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to get leactures!", error);
    return NextResponse.json(
      { message: "failed to get leactures!", success: false },
      { status: 400 }
    );
  }
}
