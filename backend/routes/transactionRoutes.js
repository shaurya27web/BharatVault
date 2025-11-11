const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Create transaction
router.post("/create", transactionController.createTransaction);

// Get transactions for a user
router.get("/:userId", transactionController.getTransactionsByUser);

// Update status
router.put("/update/:id", transactionController.updateTransactionStatus);

module.exports = router;
