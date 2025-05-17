import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String }, // Can be text or file path/URL
    resources: [{ type: String }], // Additional files/links

    duration: { type: Number }, // in minutes
    isPublished: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Lecture =
  mongoose.models.Lecture || mongoose.model("Lecture", lectureSchema);

export default Lecture;
