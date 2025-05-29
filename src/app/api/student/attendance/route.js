import dbConnect from "@/DataBase/db";
import { getUserFromToken } from "@/lib/getUserFromToken";
import Attendance from "@/model/attendance.model";
import AttendanceSetting from "@/model/attendanceSetting/AttendanceSetting.model";
// Make sure this path is correct
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

    // ✅ Get attendance settings from database
    const settings = await AttendanceSetting.findOne();

    if (!settings) {
      return NextResponse.json(
        {
          message: "Attendance settings not configured. Please contact admin.",
          success: false,
        },
        { status: 500 }
      );
    }

    // ✅ Check if attendance system is enabled
    if (!settings.isSystemEnabled) {
      return NextResponse.json(
        {
          message:
            "Attendance system is currently disabled. Please try again later.",
          success: false,
        },
        { status: 403 }
      );
    }

    // ✅ Get current Pakistan time and date
    const nowPKT = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
    });
    const now = new Date(nowPKT);

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // ✅ Parse opening and closing times from settings
    const [openingHour, openingMinute] = settings.openingTime
      .split(":")
      .map(Number);
    const [closingHour, closingMinute] = settings.closingTime
      .split(":")
      .map(Number);

    const openingTimeInMinutes = openingHour * 60 + openingMinute;
    const closingTimeInMinutes =
      closingHour * 60 + closingMinute + (settings.gracePeriod || 0);

    // ✅ Check if current time is within attendance window (including grace period)
    if (
      currentTimeInMinutes < openingTimeInMinutes ||
      currentTimeInMinutes > closingTimeInMinutes
    ) {
      const graceText = settings.gracePeriod
        ? ` (${settings.gracePeriod} minutes grace period included)`
        : "";
      return NextResponse.json(
        {
          message: `Attendance can only be marked between ${settings.openingTime} to ${settings.closingTime} (PKT)${graceText}`,
          success: false,
        },
        { status: 403 }
      );
    }

    // ✅ Check if current date is after start date (using Pakistan timezone)
    const currentDatePKT = new Date(nowPKT);
    const startDate = new Date(settings.startDate);

    // Reset time to compare only dates
    currentDatePKT.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    if (currentDatePKT < startDate) {
      return NextResponse.json(
        {
          message: `Attendance system will start from ${startDate.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}`,
          success: false,
        },
        { status: 403 }
      );
    }

    // ✅ Get today's Pakistan date (YYYY-MM-DD) - Fixed timezone issue
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    console.log("Today's date (PKT):", today); // Debug log

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

    // ✅ Auto-mark all previous missed dates as "absent" using dynamic start date
    const sessionStartDate = new Date(settings.startDate);
    const currentDateTime = new Date(nowPKT);
    let loopDate = new Date(sessionStartDate);

    // Reset time for proper date comparison
    currentDateTime.setHours(23, 59, 59, 999);

    while (loopDate < currentDateTime) {
      // ✅ Get formatted date for Pakistan timezone
      const formatted = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(loopDate);

      // ✅ Check if it's Sunday (0 = Sunday, 6 = Saturday)
      const isSunday = loopDate.getDay() === 0;
      if (isSunday) {
        loopDate.setDate(loopDate.getDate() + 1);
        continue;
      }

      // ✅ Skip today's date (already handled above)
      if (formatted === today) {
        loopDate.setDate(loopDate.getDate() + 1);
        continue;
      }

      // ✅ Check if attendance already exists
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
    console.error("Attendance POST Error:", error);
    return NextResponse.json(
      {
        message: "Failed to create attendance!",
        success: false,
        error: error.message, // Add error details for debugging
      },
      { status: 500 }
    );
  }
}

/// Get Attendance by user
export async function GET(req) {
  try {
    await dbConnect();

    const userid = await getUserFromToken(req);
    console.log("User ID:", userid); // Debug log

    // ✅ Get attendance settings - with error handling
    let settings = null;
    try {
      settings = await AttendanceSetting.findOne();
      console.log("Settings found:", settings ? "Yes" : "No"); // Debug log
    } catch (settingsError) {
      console.error("Error fetching settings:", settingsError);
      // Continue without settings for now
    }

    // ✅ Fetch attendance records
    const findAttendanceById = await Attendance.find({
      studentId: userid,
    }).sort({ date: -1 });
    console.log("Attendance records found:", findAttendanceById.length); // Debug log

    // ✅ Prepare settings data (with fallbacks)
    const settingsData = settings
      ? {
          isSystemEnabled: settings.isSystemEnabled,
          startDate: settings.startDate,
          openingTime: settings.openingTime,
          closingTime: settings.closingTime,
          gracePeriod: settings.gracePeriod,
        }
      : {
          isSystemEnabled: false,
          startDate: null,
          openingTime: "09:00",
          closingTime: "18:00",
          gracePeriod: 15,
        };

    // ✅ Return response (even if no records found)
    return NextResponse.json(
      {
        message:
          findAttendanceById.length > 0
            ? "Student attendance fetched successfully!"
            : "No attendance records found!",
        success: true,
        data: findAttendanceById,
        settings: settingsData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to get student attendance:", error);
    console.error("Error stack:", error.stack); // More detailed error logging

    return NextResponse.json(
      {
        message: "Internal server error while fetching attendance!",
        success: false,
        error: error.message, // Add error details for debugging
      },
      { status: 500 }
    );
  }
}
