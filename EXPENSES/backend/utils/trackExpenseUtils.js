const Expense = require("../models/expenseModel");

const trackExpense = async (filters, userId) => {
  const { startDate, endDate, category, minAmount, maxAmount, to,paymentMethod  } = filters;

  const match = { user_id: userId };

  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = new Date(startDate);
    if (endDate) match.createdAt.$lte = new Date(endDate);
  }

  if (category) {
    match.category = category;
  }
  if (paymentMethod){
  match.paymentMethod = paymentMethod;
  }

  if (minAmount || maxAmount) {
    match.amount = {};
    if (minAmount) match.amount.$gte = minAmount;
    if (maxAmount) match.amount.$lte = maxAmount;
  }

  if (to) {
    match.to = { $regex: to, $options: "i" }; // Case-insensitive search
  }

  const expenses = await Expense.find(match).sort({ createdAt: -1 });
  return expenses;
};

module.exports = {
  trackExpense,
};