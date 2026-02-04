import dbConnect from '@/DataBase/db';
import { getUserFromToken } from '@/lib/getUserFromToken';
import AdmissionForm from '@/model/admissionForm.model';
import Class from '@/model/classes.model';
import Lecture from '@/model/lecture.model';
import Subject from '@/model/subject.model';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();

    // 🔐 1. Verify user from token
    const User_id = await getUserFromToken(req);
    if (!User_id) {
      return NextResponse.json(
        { message: 'Invalid or missing token' },
        { status: 401 }
      );
    }

    // 🔍 2. Fetch user and check role
    const AccessUser = await AdmissionForm.findById(User_id);
    if (!AccessUser || AccessUser.role !== 'admin') {
      return NextResponse.json(
        { message: 'Access denied. Only admins can access this route.' },
        { status: 403 }
      );
    }

    // 📊 3. Analytics Queries
    const newAdmissions = await AdmissionForm.countDocuments({
      role: 'student',
      isVerified: false,
    });

    const verifyStudent = await AdmissionForm.countDocuments({
      role: 'student',
      isVerified: true,
    });

    const teachers = await AdmissionForm.countDocuments({
      role: 'teacher',
      isVerified: true,
    });

    const totalClasses = await Class.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalLectures = await Lecture.countDocuments();

    const metaData = {
      newAdmissions,
      verifyStudent,
      teachers,
      totalClasses,
      totalSubjects,
      totalLectures,
    };

    // ✅ 4. Return response
    return NextResponse.json(
      { message: 'Analytics fetched successfully', metaData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in admin analytics:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
