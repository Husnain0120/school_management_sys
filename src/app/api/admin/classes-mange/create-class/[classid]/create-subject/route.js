import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import Class from "@/model/classes.model";
import Subject from "@/model/subject.model";
import { NextResponse } from "next/server";

/// create  subjects...

// ✅ Generate a random subject code using name
function generateSubjectCode(name) {
  const prefix = name.slice(0, 3).toUpperCase();
  const randomDigits = Math.floor(100 + Math.random() * 900);
  return `${prefix}${randomDigits}`; // e.g., MTH231
}

export async function POST(req, { params }) {
  try {
    // ✅ Connect to database
    await dbConnect();

    // ✅ Get classid from params
    const { classid } = await params;

    // ✅ Get body values
    const { name, teacher } = await req.json();

    // ✅ Check if required values are missing
    if (!name || !teacher) {
      return NextResponse.json(
        { message: "Name and teacher are required!", success: false },
        { status: 400 }
      );
    }

    // ✅ Find the class by ID
    const classById = await Class.findById(classid);
    if (!classById) {
      return NextResponse.json(
        { message: "Class not found!", success: false },
        { status: 404 }
      );
    }

    // ✅ Create subject
    const subjectCode = generateSubjectCode(name);
    const subject = await Subject.create({
      name,
      teacher,
      subCode: subjectCode,
      className: classById.name, // optional field, if subject schema has it
    });

    // ✅ Add subject to class
    classById.subjects.push({ subject: subject._id });
    await classById.save();

    // ✅ Add subject to teacher
    const teacherById = await AdmissionForm.findById(teacher);
    if (teacherById) {
      teacherById.subjects.push(subject._id); // make sure teacher schema has `subjects` field
      await teacherById.save();
    }

    // ✅ Success response
    return NextResponse.json(
      {
        message:
          "Subject created and linked to class and teacher successfully.",
        success: true,
        subject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("❌ Failed to create subject:", error);
    return NextResponse.json(
      { message: "Server error while creating subject", success: false },
      { status: 500 }
    );
  }
}

// get Subject by classid;

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { classid } = await params;
    if (!classid) {
      return NextResponse.json(
        { message: "invaild class id!", success: false },
        { status: 400 }
      );
    }

    const subjects = await Class.findById(classid).populate("subjects.subject");

    if (!subjects) {
      return NextResponse.json(
        {
          message: "No Subject found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "subject found successfully!", success: true, subjects },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to get subjects!");
    return NextResponse.json(
      { message: "failed to get subjects!", success: false },
      { status: 400 }
    );
  }
}
