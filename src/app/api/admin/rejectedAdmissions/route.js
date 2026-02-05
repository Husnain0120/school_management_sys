import dbConnect from '@/DataBase/db';
import AdmissionForm from '@/model/admissionForm.model';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect(); // ✅ DB connect

    // ✅ password ko exclude karne ke liye .select('-password') aur .lean()
    const studentsRejectedAdmission = await AdmissionForm.find({
      status: 'rejected',
    })
      .select('fullName status email studentPhoto')
      .lean();

    // ❌ Yahaan tu "studentsRejectedAdmission < 1" likh raha hai,
    // lekin ye array hai, length check karni chahiye.
    if (!studentsRejectedAdmission || studentsRejectedAdmission.length < 1) {
      return NextResponse.json(
        { message: 'Rejected admissions empty.' },
        { status: 404 } // ⚙️ optional: better HTTP code
      );
    }

    // ✅ Final response
    return NextResponse.json(
      {
        message: 'GET rejected admissions successfully.',
        users: studentsRejectedAdmission, // plural naming zyada clear hai
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error while fetching rejected admissions:', error.message);

    // ⚙️ Proper error response
    return NextResponse.json(
      {
        message: 'Failed to get rejected admissions',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
