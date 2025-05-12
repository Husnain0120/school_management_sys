import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const res = NextResponse.json(
      {
        success: true,
        message: "Logout Successfully",
      },
      { status: 200 }
    );

    res.cookies.set("token", "", {
      httpOnly: true, // Cannot be accessed via JS
      secure: true, // Works only over HTTPS
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });
    return res;
  } catch (error) {
    console.log(error, "faild to logout user");
    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 400 }
    );
  }
}
