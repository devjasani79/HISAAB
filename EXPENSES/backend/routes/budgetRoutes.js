const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { setBudget, getBudget, trackBudget } = require("../controllers/budgetController");
const checkAndSendBudgetAlerts = require("../utils/budgetChecker");

// Protect all routes
router.use(validateToken);

router.post("/", setBudget); // Set or update budget
router.get("/", getBudget); // Get current budget details
router.get("/track", trackBudget); // Get tracking stats

router.get("/test-budget-check", async (req, res) => {
    try {
      await checkAndSendBudgetAlerts();
      res.json({ message: "Budget check triggered manually!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to check budget" });
    }
  });
  
module.exports = router;
