const express = require("express");
const router = express.Router();
const {
  handleTransaction,
  getTransactions,
} = require("../controllers/transactionController");

// POST /api/transactions/pay
router.post("/pay", handleTransaction);

// GET /api/transactions/:userId
router.get("/:userId", getTransactions);

module.exports = router;