const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

const bcrypt=require('bcrypt')
const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assumes Bearer token format

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = validateToken;