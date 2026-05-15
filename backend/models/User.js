// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Enter a valid 10-digit phone"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // never return password in queries by default
    },
    role: {
      type: String,
      enum: ["candidate", "employer", "admin"],
      default: "candidate",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Candidate-specific
    resumeUrl: { type: String, default: null },
    skills: [{ type: String }],
    currentCompany: { type: String, default: null },
    expectedSalary: { type: String, default: null },
    preferredCategory: { type: String, default: null },

    // Employer-specific
    companyName: { type: String, default: null },
    companySize: { type: String, default: null },
    gstNumber: { type: String, default: null },
    isVerified: { type: Boolean, default: false }, // Admin verifies employers

    // Timestamps
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// ── Hash password before saving ──────────────────────────────────
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Instance method: compare passwords ──────────────────────────
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ── Instance method: safe user object (no password) ─────────────
UserSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    isActive: this.isActive,
    isVerified: this.isVerified,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("User", UserSchema);
