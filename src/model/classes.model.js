import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  students: [
    {
      student: { type: Schema.Types.ObjectId, ref: "AdmissionForm" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);
export default Class;
