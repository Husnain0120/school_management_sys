import dbConnect from "@/DataBase/db";
import AttendanceSetting from "@/model/attendanceSetting/AttendanceSetting.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { startDate, openingTime, closingTime, gracePeriod } =
      await req.json();

    if (!startDate || !openingTime || !closingTime || !gracePeriod) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Check if setting already exists
    const setting = await AttendanceSetting.findOne();

    if (setting) {
      // Update existing
      setting.startDate = startDate;
      setting.openingTime = openingTime;
      setting.closingTime = closingTime;
      setting.gracePeriod = gracePeriod;
      await setting.save();

      return NextResponse.json(
        {
          message: "Setting updated successfully!",
          success: true,
          data: setting,
        },
        { status: 200 }
      );
    } else {
      // Create new
      const newSetting = await AttendanceSetting.create({
        startDate,
        openingTime,
        closingTime,
        gracePeriod,
      });

      return NextResponse.json(
        {
          message: "Setting created successfully!",
          success: true,
          data: newSetting,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Failed to create/update AttendanceSetting!", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}

// create PUT FOR UPDATE isSystemEnabled......
export async function PUT() {
  try {
    await dbConnect();
    const updateisSystemEnabled = await AttendanceSetting.findOne();
    if (!updateisSystemEnabled) {
      return NextResponse.json(
        {
          message: "not found isSystemEnabled!",
          success: false,
        },
        { status: 404 }
      );
    }

    updateisSystemEnabled.isSystemEnabled =
      !updateisSystemEnabled.isSystemEnabled;
    await updateisSystemEnabled.save();
    const message = updateisSystemEnabled.isSystemEnabled
      ? "Enabled"
      : "Disabled";
    return NextResponse.json(
      {
        message: `attendanceSetting ${message} successfully `,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update isSystemEnabled!", error);
    return NextResponse.json(
      {
        message: "failed to update isSystemEnabled",
        success: false,
      },
      { status: 500 }
    );
  }
}

// GET settings details

export async function GET() {
  try {
    await dbConnect();
    const getSettings = await AttendanceSetting.findOne();
    if (!getSettings) {
      return NextResponse.json(
        {
          message: "Setting Details not Found!",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Setting Details get successfully! ",
        success: true,
        data: getSettings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed  to Get Settings Details!", error);
    return NextResponse.json(
      {
        message: "Failed  to Get Settings Details!",
        success: false,
      },
      { status: 500 }
    );
  }
}
