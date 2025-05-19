import mongoose, { Schema } from "mongoose";

// Define schema
const admissionFormSchema = new Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: [true, "Student's full name is required"],
      minlength: [2, "Full name must be at least 2 characters"],
      trim: true,
    },
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      minlength: [2, "Father's name must be at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Gender must be either 'male' or 'female'",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    // Address Information
    currentAddress: {
      type: String,
      required: [true, "Current address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    zipCode: {
      type: String,
      required: [true, "Zip Code is required"],
      match: [/^\d{4,6}$/, "Zip Code must be 4 to 6 digits"],
    },

    // Document Uploads (store URLs or file paths)
    studentPhoto: {
      type: String,
      default: "",
      //required: [true, "Student photo is required"],
    },
    idProof: {
      type: String,
      default: "",
      // required: [true, "ID proof is required"],
    },
    birthCertificate: {
      type: String,
      default: "",
      // required: [true, "Birth certificate is required"],
    },

    // Academic Information
    admissionClass: {
      type: String,
      required: [true, "Admission class is required"],
    },
    previousSchool: {
      type: String,
      default: "",
    },

    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],

    // User Role and Verification
    role: {
      type: String,
      enum: {
        values: ["admin", "teacher", "student"],
        message: "Role must be admin, teacher, or student",
      },
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    //login setup
    portalId: {
      type: String,
      unique: true,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    //Access
    userAccess: {
      type: Boolean,
      default: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      default: null, // Starts empty
    },
  },
  { timestamps: true }
);

// Exporting the model
const AdmissionForm =
  mongoose.models.AdmissionForm ||
  mongoose.model("AdmissionForm", admissionFormSchema);

export default AdmissionForm;
