const express = require("express");
const { registerUser,
    loginUser,
    currentUser,
    requestPasswordReset,
    resetPassword,
    updateUserInfo,
     deleteUser,
 } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);   // Register user route
router.post("/login", loginUser);         // Login user route
router.get("/current", validateToken, currentUser);  // Protected route to get current user info
router.post("/reset-password-request", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.put("/userinfo", validateToken, updateUserInfo);
router.delete("/userinfo", validateToken, deleteUser);
module.exports = router;


