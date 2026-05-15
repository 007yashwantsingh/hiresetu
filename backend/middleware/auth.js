// middleware/auth.js
const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

/**
 * Protect routes — must be logged in
 */
async function protect(req, res, next) {
  try {
    let token;

    // Check Authorization header: "Bearer <token>"
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ ok: false, message: "Not authenticated. Please login." });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      return res.status(401).json({ ok: false, message: "User not found or account deactivated." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ ok: false, message: "Session expired. Please login again." });
    }
    return res.status(401).json({ ok: false, message: "Invalid token. Please login again." });
  }
}

/**
 * Restrict to specific roles
 * Usage: restrictTo("admin"), restrictTo("admin", "employer")
 */
function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        ok: false,
        message: `Access denied. This route is for: ${roles.join(", ")}.`,
      });
    }
    next();
  };
}

module.exports = { protect, restrictTo };
