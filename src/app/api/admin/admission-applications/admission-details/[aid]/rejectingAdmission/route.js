import dbConnect from '@/DataBase/db';
import { getUserFromToken } from '@/lib/getUserFromToken';
import AdmissionForm from '@/model/admissionForm.model';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const adminCheck_id = await getUserFromToken(req);

    const ADMIN = await AdmissionForm.findById(adminCheck_id);

    if (ADMIN.role != 'admin')
      return NextResponse.json(
        { message: 'UnAuthurized User Access api' },
        { status: 401 }
      );
    const { aid } = await params;

    // ✅ find applicant by ID
    const applicant = await AdmissionForm.findOne({ _id: aid });

    if (!applicant) {
      return NextResponse.json(
        { message: 'Applicant not found or invalid ID' },
        { status: 400 }
      );
    }

    // ✅ toggle logic between 'pending' and 'rejected'
    if (applicant.status === 'pending' || applicant.status === 'approved') {
      applicant.status = 'rejected'; // fixed '='
      applicant.isVerified = null;
    } else if (applicant.status === 'rejected') {
      applicant.status = 'pending'; // fixed '='
      applicant.isVerified = false;
    }

    await applicant.save(); // ✅ important: save changes

    return NextResponse.json(
      { message: `Status updated to ${applicant.status}`, applicant },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
