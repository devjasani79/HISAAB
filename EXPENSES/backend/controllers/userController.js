const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");


// Register User
const registerUser  = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("User  already registered with this email");
  }

  const user = await User.create({
    username,
    email,
    phone,
    password, // Password will be hashed in the pre-save hook
  });

  return res.status(201).json({
    message: "User  registered successfully",
    _id: user.id,
    email: user.email,
    phone: user.phone,
    password: user.password,
  });
});

// Login User
const loginUser  = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



// Get current user info (protected route)
const currentUser = asyncHandler(async (req, res) => {
  // Assuming user data is available after validateToken middleware
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "User info retrieved successfully",
    user,
  });
});

// Request Password Reset
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = user.generateResetToken();
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const message = `Click the link to reset your password: ${resetLink}`;
  await sendEmail({ to: email, subject: "Password Reset", text: message });

  res.status(200).json({ message: "Password reset link sent" });
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: "Invalid data" });

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  // Hash the new password before saving
  user.password = password; // Set the new password
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});







/**
 * ================================
 * UPDATE USER INFORMATION
 * ================================
 * Allows a user to update their account information.
 * Ensures unique email and phone validation.
 */
const updateUserInfo = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Extract user ID from the validated token
  const { username, email, phone } = req.body;

  const updates = {};
  if (username) updates.username = username;

  // Check for unique email
  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists.id !== userId) {
      return res.status(400).json({ message: "Email already in use by another user" });
    }
    updates.email = email;
  }

  // Check for unique phone number
  if (phone) {
    const phoneExists = await User.findOne({ phone });
    if (phoneExists && phoneExists.id !== userId) {
      return res.status(400).json({ message: "Phone number already in use by another user" });
    }
    updates.phone = phone;
  }

  // Update the user
  const updatedUser  = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

  if (!updatedUser ) {
    return res.status(404).json({ message: "User  not found" });
  }

  res.status(200).json({
    message: "User  information updated successfully",
    user: updatedUser ,
  });
});


/**
 * ================================
 * DELETE USER ACCOUNT
 * ================================
 * Deletes a user's account from the database.
 */
const deleteUser  = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Extract user ID from the validated token

  // Find and delete the user by their ID
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return res.status(404).json({ message: "User  not found" });
  }

  res.status(200).json({ message: "User  account deleted successfully" });
});
module.exports = { registerUser, loginUser,
  requestPasswordReset,
  resetPassword, currentUser,deleteUser,updateUserInfo}

