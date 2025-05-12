import AdmissionForm from "@/model/admissionForm.model";
import dbConnect from "@/DataBase/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  try {
    // 1. Parse body
    const { portalId, password } = await req.json();

    // 2. Validate inputs
    if (!portalId || !password) {
      return NextResponse.json(
        { message: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    // 3. Find user by portalId
    const userExist = await AdmissionForm.findOne({ portalId });
    if (!userExist) {
      return NextResponse.json(
        {
          message: "Portal ID or Password  not found. Please contact support.",
          success: false,
        },
        { status: 404 }
      );
    }

    // 4. Compare password
    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Portal ID or Password.",
        },
        { status: 401 }
      );
    }

    // 5. Check verification and access
    if (!userExist.isVerified || !userExist.userAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Please contact the support center.",
        },
        { status: 403 }
      );
    }

    // 6. Prepare JWT payload
    const payload = {
      id: userExist._id,
      role: userExist.role,
    };

    // 7. Sign JWT token
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    // 8. Send response and set token cookie
    const response = NextResponse.json(
      {
        message: `Login successful. Welcome back!`,
        success: true,
        payload,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Cannot be accessed via JS
      secure: true, // Works only over HTTPS
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict", // No cross-site requests
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error during login. Please try again later.",
      },
      { status: 500 }
    );
  }
}
