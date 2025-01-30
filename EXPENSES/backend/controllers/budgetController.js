const Budget = require("../models/budgetModel");
const Expense = require("../models/expenseModel");
const asyncHandler = require("express-async-handler");

// @desc Set or update the budget for the current or specified month
// @route POST /api/budget
// @access Private
const setBudget = asyncHandler(async (req, res) => {
  const { amount, month } = req.body;

  const currentMonth = month || new Date().toISOString().slice(0, 7); // Default to current month
  let budget = await Budget.findOne({ user_id: req.user.id, month: currentMonth });

  // If no budget is found for this month, check the previous month's budget
  if (!budget) {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1); // Get previous month
    const previousMonthString = previousMonth.toISOString().slice(0, 7); // Format as YYYY-MM

    // Check for previous month's budget
    const previousBudget = await Budget.findOne({
      user_id: req.user.id,
      month: previousMonthString,
    });

    if (previousBudget) {
      // If previous month budget exists, carry it over
      budget = await Budget.create({
        user_id: req.user.id,
        month: currentMonth,
        amount: previousBudget.amount, // Carry over the same amount
        exceededCount: previousBudget.exceededCount,
        isExceeded: previousBudget.isExceeded,
      });
    } else {
      // No previous budget, create a new one
      budget = await Budget.create({
        user_id: req.user.id,
        month: currentMonth,
        amount,
        exceededCount: 0,
        isExceeded: false,
      });
    }
  } else {
    // Budget exists, update it
    budget.amount = amount;
    await budget.save();
  }

  res.status(200).json({ message: `Budget set for ${currentMonth}`, budget });
});

// @desc Get budget details and tracking
// @route GET /api/budget
// @access Private
const getBudget = asyncHandler(async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);

  const budget = await Budget.findOne({
    user_id: req.user.id,
    month,
  });

  if (!budget) {
    res.status(404);
    throw new Error("Budget not found for this month");
  }

  // Calculate total expenses for the month
  const expenses = await Expense.aggregate([
    {
      $match: {
        user_id: budget.user_id,
        createdAt: {
          $gte: new Date(`${month}-01`),
          $lte: new Date(`${month}-31`),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: "$amount" },
      },
    },
  ]);

  const totalSpent = expenses[0]?.totalSpent || 0;
  const remainingBudget = budget.amount - totalSpent;

  res.status(200).json({
    budget: budget.amount,
    totalSpent,
    remainingBudget,
    isExceeded: totalSpent > budget.amount,
    exceededCount: budget.exceededCount,
  });
});

// @desc Track how many months were within or exceeded the budget
// @route GET /api/budget/track
// @access Private
const trackBudget = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({ user_id: req.user.id });

  // Arrays to store months that exceeded budget, and the exceeded amount details
  const exceededDetails = [];
  let withinBudgetMonths = 0;
  let exceededBudgetMonths = 0;

  for (const budget of budgets) {
    const expenses = await Expense.aggregate([
      {
        $match: {
          user_id: budget.user_id,
          createdAt: {
            $gte: new Date(`${budget.month}-01`),
            $lte: new Date(`${budget.month}-31`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },
        },
      },
    ]);

    const totalSpent = expenses[0]?.totalSpent || 0;

    if (totalSpent > budget.amount) {
      exceededBudgetMonths += 1;
      exceededDetails.push({
        month: budget.month,
        budget: budget.amount,
        totalSpent,
        exceededAmount: totalSpent - budget.amount,
      });
    } else {
      withinBudgetMonths += 1;
    }
  }

  res.status(200).json({
    totalMonths: budgets.length,
    withinBudgetMonths,
    exceededBudgetMonths,
    exceededDetails, // Provide the detailed months that exceeded the budget
  });
});

module.exports = { setBudget, getBudget, trackBudget };
