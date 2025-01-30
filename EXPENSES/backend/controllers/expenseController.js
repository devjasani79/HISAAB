const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
// const { trackExpense } = require('../utils/trackExpenseUtils'); 
// Ensure the path is correct
const { trackExpense } = require('../utils/trackExpenseUtils'); // Ensure correct import

// Your controller code where you use trackExpenseUtils


// @desc Get all expenses for the logged-in user
// @route GET /api/expenses
// @access Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user_id: req.user.id });
  res.status(200).json(expenses);
});

// @desc Create a new expense
// @route POST /api/expenses
// @access Private
const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, paymentMethod, description, to } = req.body;

  // Validate required fields
  if (!amount || !category || !paymentMethod) {
    res.status(400);
    throw new Error("Amount, category, and payment method are mandatory");
  }

  const expense = await Expense.create({
    user_id: req.user.id,
    amount,
    category,
    paymentMethod,
    description,
    to,
  });

  res.status(201).json(expense);
});

// @desc Get a single expense by ID
// @route GET /api/expenses/:id
// @access Private
const getExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  // Verify ownership
  if (expense.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to view this expense");
  }

  res.status(200).json(expense);
});

// @desc Update an expense by ID
// @route PUT /api/expenses/:id
// @access Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  // Verify ownership
  if (expense.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to update this expense");
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // Return the updated expense
  );

  res.status(200).json(updatedExpense);
});

// @desc Delete an expense by ID
// @route DELETE /api/expenses/:id
// @access Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  // Verify ownership
  if (expense.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to delete this expense");
  }

  await Expense.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Expense deleted successfully", expense });
});



// @desc Track expenses with dynamic filters
// @route POST /api/expenses/track
// @access Private
const trackExpenses = asyncHandler(async (req, res) => {
  const filters = req.body; // assuming filters are passed in the request body

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const expenses = await trackExpense(filters, req.user.id);
  res.status(200).json(expenses);
});


module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  trackExpenses,
};
