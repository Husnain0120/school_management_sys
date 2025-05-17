import mongoose, { Schema } from "mongoose";

export const subjectSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    subCode: { type: String },
    className: { type: String },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "AdmissionForm",
      required: true,
    },

    lectures: [{ lecture: { type: Schema.Types.ObjectId, ref: "Lecture" } }],
  },

  { timestamps: true }
);

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
export default Subject;
