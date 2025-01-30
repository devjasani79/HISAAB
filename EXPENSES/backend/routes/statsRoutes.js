const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getCategoryStats, getMonthlyStats, getTrends, getTopTransactions,downloadExpensesPDF } = require("../controllers/statsController");

const router = express.Router();

router.use(validateToken); // Protect all routes

router.get("/category-wise", getCategoryStats); // Category-wise stats
router.get("/monthly", getMonthlyStats);         // Monthly stats
router.get("/trend", getTrends);                 // Spending trend with period parameter
router.get("/top-transactions", getTopTransactions); // Top 3 highest transactions
router.get("/download/pdf", downloadExpensesPDF);
module.exports = router;
