import { getUserFromToken } from "@/lib/getUserFromToken";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/DataBase/db";

export async function PUT(req) {
  try {
    await dbConnect();
    const userid = await getUserFromToken(req);
    const { oldPassword, newPassword, confirmPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        {
          message: "All fields are required!",
          success: false,
        },
        { status: 400 }
      );
    }

    // Find existing user
    const user = await AdmissionForm.findById(userid);
    if (!user) {
      return NextResponse.json({
        message: "User not found!",
        success: false,
      });
    }

    // Match old password
    const matchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchPassword) {
      return NextResponse.json(
        {
          message: "Invalid current password!",
          success: false,
        },
        { status: 404 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          message: "confirmPassword is not match with New Password!",
          success: false,
        },
        { status: 400 }
      );
    }

    // Hash new password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    // Update only the password field using findByIdAndUpdate to avoid full document validation
    await AdmissionForm.findByIdAndUpdate(
      userid,
      { $set: { password: hashNewPassword } },
      {
        runValidators: false, // Skip validation to avoid the class field issue
        new: true,
      }
    );

    return NextResponse.json(
      {
        message: "Password updated successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update password!", error);
    return NextResponse.json(
      {
        message: "Failed to update password!",
        success: false,
      },
      { status: 400 }
    );
  }
}
