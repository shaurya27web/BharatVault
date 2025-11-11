const TransactionModel = require("../models/TransactionModel");

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userId, type, amount, description } = req.body;

    if (!userId || !type || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTransaction = new TransactionModel({
      userId,
      type,
      amount,
      description,
      status: "pending"
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction created successfully", transaction: newTransaction });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ message: "Error creating transaction", error: err });
  }
};

// Get all transactions for a user
exports.getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await TransactionModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Error fetching transactions", error: err });
  }
};

// Update transaction status (mark completed or failed)
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "failed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Transaction status updated", transaction: updatedTransaction });
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ message: "Error updating transaction", error: err });
  }
};
