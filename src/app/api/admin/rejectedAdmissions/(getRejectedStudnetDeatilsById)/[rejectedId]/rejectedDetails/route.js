import dbConnect from '@/DataBase/db';
import AdmissionForm from '@/model/admissionForm.model'; // ye line missing thi
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    // 1️⃣ Database connect
    await dbConnect();

    // 2️⃣ Params se rejectedId nikalna
    const { rejectedId } = await params; // yahan 'await' nahi lagana chahiye
    console.log('Rejected ID:', rejectedId);

    // 3️⃣ MongoDB query by ID
    const studentInfo =
      await AdmissionForm.findById(rejectedId).select('-password');

    // 4️⃣ Agar studentInfo na mile to error response
    if (!studentInfo) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      );
    }

    // 5️⃣ Success response
    return NextResponse.json(
      {
        message: 'Get Details Successfully',
        info: studentInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    // 6️⃣ Error handling (yahan hamesha response return karna zaroori hai)
    console.error('Error fetching student details:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
