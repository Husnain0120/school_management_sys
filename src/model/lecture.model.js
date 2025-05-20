import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    vedioLink: { type: String },
    isPublished: { type: Boolean, default: true },
  },

  { timestamps: true }
);

const Lecture =
  mongoose.models.Lecture || mongoose.model("Lecture", lectureSchema);

export default Lecture;
