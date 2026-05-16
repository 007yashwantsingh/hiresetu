import mongoose from "mongoose";

const CandidateProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    name: { type: String, default: "" },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, default: "" },

    skills: [{ type: String }],
    currentCompany: { type: String, default: "" },
    expectedSalary: { type: String, default: "" },
    preferredCategory: { type: String, default: "" },
    experience: { type: String, default: "" },
    summary: { type: String, default: "" },

    resumeUrl: { type: String, default: "" },
    resumePublicId: { type: String, default: "" },
    resumeFileName: { type: String, default: "" },

    profileStrength: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CandidateProfile", CandidateProfileSchema);