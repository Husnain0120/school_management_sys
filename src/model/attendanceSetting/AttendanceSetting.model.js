import mongoose, { Schema } from "mongoose";

const AttendanceSettingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    gracePeriod: {
      type: Number,
      required: true,
    },
    isSystemEnabled: {
      type: Boolean,
      default: false, // ✅ Default is false
    },
  },
  { timestamps: true }
);

const AttendanceSetting =
  mongoose.models.AttendanceSetting ||
  mongoose.model("AttendanceSetting", AttendanceSettingSchema);

export default AttendanceSetting;
