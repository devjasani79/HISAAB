const express = require("express");
const router = express.Router();
const { getExpenses, createExpense, getExpense, updateExpense, deleteExpense, trackExpenses } = require("../controllers/expenseController");
const validateToken = require("../middleware/validateTokenHandler"); // Ensure this is imported

// Define routes with middleware
router.get("/", validateToken, getExpenses); 
router.post("/", validateToken, createExpense);
router.get("/:id", validateToken, getExpense);
router.put("/:id", validateToken, updateExpense);
router.delete("/:id", validateToken, deleteExpense);
router.post("/track", validateToken, trackExpenses);

module.exports = router;