// controllers/statsController.js
const asyncHandler = require("express-async-handler");
const generatePDF = require("../utils/downloadPDF");
const Expense = require("../models/expenseModel");
const mongoose = require("mongoose");
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Update all the places where you are calling `mongoose.Types.ObjectId()`
const getCategoryStats = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate user ID
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const stats = await Expense.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } }, // Use `new mongoose.Types.ObjectId()`
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
    ]);

    if (!stats || stats.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching category stats:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

const getMonthlyStats = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate user ID
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const stats = await Expense.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } }, // Use `new mongoose.Types.ObjectId()`
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } }, // Sort by month (ascending)
    ]);

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

const getTrends = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id;
      const { period } = req.query; // Get the 'period' query parameter from the request
  
      // Validate user ID
      if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      // Determine the aggregation logic based on the period
      let groupBy;
      switch (period) {
        case "day":
          groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }; // Group by day
          break;
        case "week":
          groupBy = { $isoWeek: "$createdAt" }; // Group by ISO week number
          break;
        case "month":
          groupBy = { $month: "$createdAt" }; // Group by month number
          break;
        case "year":
          groupBy = { $year: "$createdAt" }; // Group by year
          break;
        default:
          return res.status(400).json({ message: "Invalid period parameter" });
      }
  
      const stats = await Expense.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: groupBy,
            total: { $sum: "$amount" },
          },
        },
        { $sort: { "_id": 1 } }, // Sort by the grouping (ascending)
      ]);
  
      return res.status(200).json(stats);
    } catch (error) {
      console.error("Error fetching spending trends:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
const getTopTransactions = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate user ID
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const stats = await Expense.find({ user_id: new mongoose.Types.ObjectId(userId) }) // Use `new mongoose.Types.ObjectId()`
      .sort({ amount: -1 }) // Sort by amount descending
      .limit(3); // Limit to top 3 transactions

    if (!stats || stats.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching top transactions:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
// -------------

const downloadExpensesPDF = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id;
      await generatePDF(userId, res);  // Use the utility function to generate the PDF
    } catch (error) {
      console.error("Error downloading PDF:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  module.exports = { getCategoryStats, getMonthlyStats, getTrends, getTopTransactions, downloadExpensesPDF };