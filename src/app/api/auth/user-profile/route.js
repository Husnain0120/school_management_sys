import dbConnect from "@/DataBase/db";
import { getUserFromToken } from "@/lib/getUserFromToken";
import AdmissionForm from "@/model/admissionForm.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect(); // ✅ Ensure DB is connected before any operation

  try {
    // ✅ Get user ID from JWT token stored in cookies (or headers)
    const userId = await getUserFromToken(req);

    if (!userId) {
      // ❌ Unauthorized: Token is missing or invalid
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Missing or invalid token.",
        },
        { status: 401 }
      );
    }

    // ✅ Look up the user in the database by their ID, excluding password
    const user = await AdmissionForm.findById(userId).select("-password");

    if (!user) {
      // ❌ Not Found: No user matched with the provided ID
      return NextResponse.json(
        {
          success: false,
          message: "User not found. Please try again.",
        },
        { status: 404 }
      );
    }

    // ✅ Successfully found and returned user
    return NextResponse.json(
      {
        success: true,
        message: "User profile retrieved successfully.",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    // ❌ Internal Server Error: Something unexpected happened
    console.error("GET /api/auth/user-profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
