import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "AdmissionForm",
      required: true, // ✅ Added required
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
    reason: {
      type: String,
      default: "...",
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt & updatedAt
  }
);

// ✅ Prevent model overwrite issue in dev mode
const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
