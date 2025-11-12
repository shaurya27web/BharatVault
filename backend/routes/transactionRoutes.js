const express = require("express");
const router = express.Router();

// ✅ Make sure these functions are exported properly
const transactionController = require("../controllers/transactionController");

router.post("/pay", transactionController.handleTransaction);
router.get("/:userId", transactionController.getTransactions);

module.exports = router;
