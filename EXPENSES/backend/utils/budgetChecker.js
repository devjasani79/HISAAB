const cron = require("node-cron");
const sendEmail = require("./budgetMailer");
const Budget = require("../models/budgetModel");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

// Function to check budgets and send alerts
const checkAndSendBudgetAlerts = async () => {
  try {
    console.log("Running budget check...");

    const budgets = await Budget.find({}); // Fetch all budgets

    for (const budget of budgets) {
      const { user_id, month, amount } = budget;

      // Calculate total expenses for the given month
      const expenses = await Expense.aggregate([
        {
          $match: {
            user_id,
            createdAt: {
              $gte: new Date(`${month}-01T00:00:00.000Z`),
              $lt: new Date(`${month}-31T23:59:59.999Z`),
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

      // If total expenses exceed budget, send an alert
      if (totalSpent > amount) {
        const user = await User.findById(user_id);
        if (!user) continue;

        const email = user.email;
        const subject = "Budget Exceeded - Action Required!";
        const text = `Hi ${user.name},\n\nYour expenses for ${month} exceeded your budget of ₹${amount}.\n\nTotal Spent: ₹${totalSpent}\nRemaining Budget: ₹${amount - totalSpent}\n\nStay mindful of your spending!\n\nBest,\nExpense Tracker`;

        // Send email notification
        await sendEmail(email, subject, text);
        console.log(`📩 Email sent to ${user.name} for exceeding budget in ${month}`);
      }
    }
  } catch (error) {
    console.error("❌ Error checking budget exceedance:", error);
  }
};

// Schedule cron job to run daily at midnight
cron.schedule("0 0 * * *", checkAndSendBudgetAlerts);

module.exports = checkAndSendBudgetAlerts;
