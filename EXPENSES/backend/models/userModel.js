const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
    resetToken: String,
    resetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Generate password reset token
userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetTokenExpires = Date.now() + 3600000; // 1 hour
  return resetToken;
};

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User ", userSchema);