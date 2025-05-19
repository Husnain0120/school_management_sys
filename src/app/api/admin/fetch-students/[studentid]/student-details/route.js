import dbConnect from "@/DataBase/db";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    await dbConnect();
    const { studentid } = await params;
    console.log(studentid);
    if (!studentid) {
      return NextResponse.json(
        {
          message: "invaild student ID!",
          success: false,
        },
        { status: 400 }
      );
    }
    const student = await AdmissionForm.findById({ _id: studentid }).select(
      "-password -subjects"
    );
    if (!student) {
      return NextResponse.json(
        { message: "no student deatils found !", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "deatils fetch successfully!",
        success: true,
        data: student,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to get student details!", error);
    return NextResponse.json(
      { message: "failed to get students deatils!", success: false },
      { status: 400 }
    );
  }
}
