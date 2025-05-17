import dbConnect from "@/DataBase/db";
import Class from "@/model/classes.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, description } = await req.json();
    if (!name || !description) {
      return NextResponse.json(
        { message: "All filed are required ", success: false },
        { status: 400 }
      );
    }

    const existClass = await Class.findOne({ name });
    if (existClass) {
      return NextResponse.json(
        {
          message: "class is already exist!",
          success: false,
        },
        { status: 400 }
      );
    }

    const newClass = new Class({
      name,
      description,
    });
    await newClass.save();
    return NextResponse.json(
      {
        message: `New class (${name}) created successfully.`,
        // Optional: remove if not to be returned
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to create class", error);
    return NextResponse.json(
      {
        message: "Failed to create class",
        success: false,
      },
      { status: 400 }
    );
  }
}

/// get all classes
export async function GET(req) {
  try {
    await dbConnect();
    const classes = await Class.find();

    if (!classes) {
      return NextResponse.json(
        { message: "no class found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "classes get successfully",
        success: true,
        classes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to get Classes!", error);
    return NextResponse.json(
      { message: "failed to get classes!", success: false },
      { status: 400 }
    );
  }
}
