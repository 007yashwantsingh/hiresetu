// utils/jwt.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "hiresetu_super_secret_change_in_prod";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d"; // token valid for 7 days

/**
 * Generate a signed JWT token
 * @param {Object} payload - Data to embed (id, role, email)
 * @returns {string} JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

/**
 * Verify and decode a JWT token
 * @param {string} token
 * @returns {Object} decoded payload
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
