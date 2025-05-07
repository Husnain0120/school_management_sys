import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const {
    fullName,
    fatherName,
    email,
    gender,
    dateOfBirth,
    currentAddress,
    permanentAddress,
    city,
    zipCode,
    admissionClass,
    previousSchool,
    portalId,
    password,
  } = await req.json();

  try {
  } catch (error) {
    return NextResponse(
      { message: "Failed to submit Admission pleace Try Again" },
      { status: 400 }
    );
  }
}
