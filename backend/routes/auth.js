// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { protect } = require("../middleware/auth");

// ─── POST /api/auth/register ──────────────────────────────────────
// Public — create new account
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // ── Validation ──────────────────────────────────────────────
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        ok: false,
        message: "Name, email, phone and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Only allow candidate or employer from public register
    const allowedRoles = ["candidate", "employer"];
    const userRole = allowedRoles.includes(role) ? role : "candidate";

    // ── Check duplicate email ────────────────────────────────────
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        ok: false,
        message: "An account with this email already exists. Please login.",
      });
    }

    // ── Create user (password auto-hashed by pre-save hook) ──────
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role: userRole,
    });

    // ── Generate JWT ─────────────────────────────────────────────
    const token = generateToken({
      id: user._id,
      role: user.role,
      email: user.email,
    });

    return res.status(201).json({
      ok: true,
      message: "Account created successfully!",
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    console.error("Register error:", err);

    // Mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        message: "Email already registered. Please login.",
      });
    }

    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ ok: false, message: messages.join(". ") });
    }

    return res.status(500).json({ ok: false, message: "Server error. Please try again." });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────
// Public — sign in with email + password
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Basic validation ─────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email and password are required.",
      });
    }

    // ── Find user (include password for comparison) ──────────────
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "No account found with this email. Please register.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        ok: false,
        message: "Your account has been deactivated. Contact support.",
      });
    }

    // ── Compare password ─────────────────────────────────────────
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // ── Update last login ────────────────────────────────────────
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // ── Generate JWT ─────────────────────────────────────────────
    const token = generateToken({
      id: user._id,
      role: user.role,
      email: user.email,
    });

    return res.status(200).json({
      ok: true,
      message: "Login successful!",
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ ok: false, message: "Server error. Please try again." });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────
// Protected — get current logged-in user
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found." });
    }
    return res.status(200).json({ ok: true, user: user.toSafeObject() });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ ok: false, message: "Server error." });
  }
});

// ─── POST /api/auth/logout ────────────────────────────────────────
// Public — client-side logout (clear localStorage)
// JWT is stateless so we just confirm; client must delete token
router.post("/logout", (req, res) => {
  return res.status(200).json({ ok: true, message: "Logged out successfully." });
});

// ─── PATCH /api/auth/change-password ─────────────────────────────
// Protected — change password
router.patch("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ ok: false, message: "Both current and new password required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ ok: false, message: "New password must be at least 6 characters." });
    }

    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ ok: false, message: "Current password is incorrect." });
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    return res.status(200).json({ ok: true, message: "Password updated successfully." });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ ok: false, message: "Server error." });
  }
});

module.exports = router;
