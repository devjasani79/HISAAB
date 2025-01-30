const mongoose = require("mongoose");
const moment = require("moment");

const expenseSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    amount: {
      type: Number,
      required: [true, "Please add the expense amount"],
    },
    category: {
      type: String,
      required: [true, "Please add the expense category"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please select a payment method"],
      enum: ["UPI", "Credit/Debit Cards", "Bank Transfer", "Wallet"], // Predefined payment methods
    },
    description: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true, // Enable getters when converting to JSON
    },
  }
);

// Custom getter for createdAt and updatedAt fields
expenseSchema.path("createdAt").get(function (value) {
  return moment(value).format("YYYY-MM-DD HH:mm:ss"); // Format createdAt
});

expenseSchema.path("updatedAt").get(function (value) {
  return moment(value).format("YYYY-MM-DD HH:mm:ss"); // Format updatedAt
});

module.exports = mongoose.model("Expense", expenseSchema);
