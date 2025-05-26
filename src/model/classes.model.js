import mongoose, { Schema } from "mongoose";

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "AdmissionForm",
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // This will auto-manage createdAt and updatedAt
  }
);

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);
export default Class;
