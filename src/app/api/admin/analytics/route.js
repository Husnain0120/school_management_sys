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

    const User_id = await getUserFromToken(req);
    if (!User_id) {
      return NextResponse.json(
        { message: 'Invalid or missing token' },
        { status: 401 }
      );
    }

    const AccessUser = await AdmissionForm.findById(User_id);
    if (!AccessUser || AccessUser.role !== 'admin') {
      return NextResponse.json(
        { message: 'Access denied. Only admins can access this route.' },
        { status: 403 }
      );
    }

    // === Counts ===
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

    // === Monthly Admissions per Year ===
    const monthlyAdmissions = await AdmissionForm.aggregate([
      {
        $match: {
          role: 'student',
          createdAt: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const formattedAdmissions = monthlyAdmissions.map(m => ({
      year: m._id.year,
      month: monthNames[m._id.month - 1],
      count: m.count,
    }));

    const metaData = {
      newAdmissions,
      verifyStudent,
      teachers,
      totalClasses,
      totalSubjects,
      totalLectures,
      monthlyAdmissions: formattedAdmissions,
    };

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
