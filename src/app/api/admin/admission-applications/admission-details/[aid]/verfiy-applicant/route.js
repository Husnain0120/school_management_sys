import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import Class from "@/model/classes.model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { aid } = await params;

    // 🧠 Fetch applicant by ID
    const applicant = await AdmissionForm.findById(aid);
    if (!applicant) {
      return NextResponse.json(
        { message: "No applicant found to verify.", success: false },
        { status: 404 }
      );
    }

    // 🎯 Find class by name (findOne returns single doc)
    const admissionClass = applicant.admissionClass;
    const classDoc = await Class.findOne({ name: admissionClass });

    if (!classDoc) {
      return NextResponse.json(
        { message: "Class not found by name!", success: false },
        { status: 404 }
      );
    }

    // 🛠 Assign class if not already in list
    const classId = classDoc._id;
    if (!applicant.class.includes(classId)) {
      applicant.class.push(classId);
    }

    // ✅ Toggle isVerified field
    applicant.isVerified = !applicant.isVerified;

    // 💾 Save updated applicant
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
