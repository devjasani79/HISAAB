const mongoose = require("mongoose");
const moment = require("moment");

const budgetSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    month: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM"), // Default to current month
    },
    amount: {
      type: Number,
      required: [true, "Please set a budget amount"],
    },
    exceededCount: {
      type: Number,
      default: 0, // Track how many times the budget has been exceeded
    },
    isExceeded: {
      type: Boolean,
      default: false, // Whether the budget is exceeded this month
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true, // Enable getters for JSON conversion
    },
  }
);

module.exports = mongoose.model("Budget", budgetSchema);
