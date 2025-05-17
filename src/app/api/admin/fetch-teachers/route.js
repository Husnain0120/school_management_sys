import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    // ✅ Fetch all verified teachers
    const teachers = await AdmissionForm.find({
      role: "teacher",
      isVerified: true,
    }).select("-class -password");

    if (!teachers || teachers === "") {
      return NextResponse.json(
        { message: "Teachers Not Found!", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Teachers fetched successfully!",
        success: true,
        teachers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get teachers", error);
    return NextResponse.json(
      { message: "Failed to get Teachers!", success: fasle },
      { status: 400 }
    );
  }
}
