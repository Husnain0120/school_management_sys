import dbConnect from "@/DataBase/db";
import { getUserFromToken } from "@/lib/getUserFromToken";
import Attendance from "@/model/attendance.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const userid = await getUserFromToken(req);
    const { status, reason } = await req.json();

    if (!status) {
      return NextResponse.json(
        {
          message: "Please provide attendance status (present/absent)",
          success: false,
        },
        { status: 400 }
      );
    }

    // ✅ Get current Pakistan time (in hours and minutes)
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })
    );

    const currentHour = now.getHours(); // returns 0-23
    const currentMinute = now.getMinutes();

    // ✅ Allow attendance ONLY from 9:00 to 10:59 AM
    if (currentHour < 9 || currentHour >= 11) {
      return NextResponse.json(
        {
          message:
            "Attendance can only be marked between 9:00 AM to 11:00 AM (PKT)",
          success: false,
        },
        { status: 403 }
      );
    }

    // ✅ Get today's Pakistan date (YYYY-MM-DD)
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    // ✅ Check if attendance is already marked
    const existing = await Attendance.findOne({
      studentId: userid,
      date: today,
    });

    if (existing) {
      if (existing.status === status) {
        return NextResponse.json(
          {
            message: `Attendance already marked as ${status} for today.`,
            success: false,
          },
          { status: 400 }
        );
      } else {
        existing.status = status;
        existing.reason = reason || "...";
        await existing.save();
        return NextResponse.json(
          {
            message: `Attendance updated to ${status}`,
            success: true,
          },
          { status: 200 }
        );
      }
    }

    // ✅ Create attendance
    await Attendance.create({
      studentId: userid,
      date: today,
      status,
      reason: reason || "...",
    });

    // // ✅ Auto-mark all previous missed dates as "absent"
    const start = new Date("2025-05-05"); // Session start date
    const now01 = new Date();
    let loopDate = new Date(start);

    while (loopDate < now01) {
      const formatted = loopDate.toISOString().split("T")[0];

      // ✅ Check if it's Sunday (0 = Sunday, 6 = Saturday)
      const isSunday = loopDate.getDay() === 0;
      if (isSunday) {
        loopDate.setDate(loopDate.getDate() + 1); // ⏩ skip to next day
        continue;
      }

      // ✅ Check attendance already exists
      const alreadyExists = await Attendance.findOne({
        studentId: userid,
        date: formatted,
      });

      if (!alreadyExists) {
        await Attendance.create({
          studentId: userid,
          date: formatted,
          status: "absent",
          reason: "Auto marked due to no attendance",
        });
      }

      // Move to next day
      loopDate.setDate(loopDate.getDate() + 1);
    }

    return NextResponse.json(
      {
        message: `Student marked as ${status}`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Attendance Error:", error);
    return NextResponse.json(
      {
        message: "Failed to create attendance!",
        success: false,
      },
      { status: 500 }
    );
  }
}

/// Get Attendance by user

export async function GET(req) {
  try {
    await dbConnect(); // ✅ Connect to MongoDB

    const userid = await getUserFromToken(req); // ✅ Get user ID from JWT token

    // ✅ Correct usage of find with condition object
    const findAttendanceById = await Attendance.find({ studentId: userid });

    // ✅ If no attendance found, return 404
    if (!findAttendanceById || findAttendanceById.length === 0) {
      return NextResponse.json(
        {
          message: "No attendance records found!",
          success: false,
        },
        { status: 404 }
      );
    }

    // ✅ Return all attendance records
    return NextResponse.json(
      {
        message: "Student attendance fetched successfully!",
        success: true,
        data: findAttendanceById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to get student attendance:", error); // ✅ Log error to server console
    return NextResponse.json(
      {
        message: "Internal server error while fetching attendance!",
        success: false,
      },
      { status: 500 }
    );
  }
}
