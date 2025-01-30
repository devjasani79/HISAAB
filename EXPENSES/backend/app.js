const express = require("express");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes"); // Make sure this is properly imported
const statsRoutes = require('./routes/statsRoutes');  // Path to your statsRoutes file
const budgetRoutes = require('./routes/budgetRoutes')
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");


const app = express();

app.use(express.json());  // Parse incoming JSON data

// Use the user routes
app.use("/api/users", userRoutes);
// Use the expense routes here
app.use("/api/expenses", expenseRoutes); 
// Use the stats routes here
app.use('/api/stats', statsRoutes);  
// Use the budget routes here
app.use("/api/budget", budgetRoutes);
// Error handler middleware (optional)
app.use(errorHandler);

// Connect to MongoDB
connectDb(); 


// Import the cron job checker
require("./utils/budgetChecker");



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
