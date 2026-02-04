import dbConnect from '@/DataBase/db';
import AdmissionForm from '@/model/admissionForm.model';
import Class from '@/model/classes.model';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { aid } = await params; // Removed await since params is not a promise

    // Fetch applicant by ID
    const applicant = await AdmissionForm.findById(aid);
    if (!applicant) {
      return NextResponse.json(
        { message: 'No applicant found to verify.', success: false },
        { status: 404 }
      );
    }

    // Find class by name
    const admissionClass = applicant.admissionClass;
    const classDoc = await Class.findOne({ name: admissionClass });

    if (!classDoc) {
      return NextResponse.json(
        { message: 'Class not found by name!', success: false },
        { status: 404 }
      );
    }

    const classId = classDoc._id;

    // Toggle isVerified field
    applicant.isVerified = !applicant.isVerified;

    if (applicant.isVerified) {
      // If now verified, set the single class reference
      applicant.class = classId;
    } else {
      // If now unverified, remove the class reference
      applicant.class = null;
    }

    // Save updated applicant
    await applicant.save();

    const statusMessage = applicant.isVerified ? 'verified' : 'unverified';
    return NextResponse.json(
      {
        message: `Applicant ${statusMessage} successfully. Class ${
          applicant.isVerified ? 'assigned' : 'removed'
        }.`,
        success: true,
        data: {
          isVerified: applicant.isVerified,
          class: applicant.class,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to verify applicant:', error);
    return NextResponse.json(
      {
        message: 'Failed to verify applicant.',
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
