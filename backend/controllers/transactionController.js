const mongoose = require("mongoose");

exports.handleTransaction = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (type === "add") {
      user.balance += amount;
    } else if (type === "withdraw") {
      if (user.balance < amount)
        return res.status(400).json({ message: "Insufficient balance" });
      user.balance -= amount;
    }

    await user.save();
    res.status(200).json({ message: "Transaction successful", balance: user.balance });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
};


const Transaction = require("../models/TransactionModel");
const User = require("../models/UserModel");

// Handle Add / Withdraw
exports.handleTransaction = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;

    if (!userId || !amount || !type) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (type === "withdraw" && user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance = type === "add" ? user.balance + amount : user.balance - amount;
    await user.save();

    const transaction = new Transaction({ userId, amount, type });
    await transaction.save();

    res.status(200).json({
      message: "Transaction successful",
      newBalance: user.balance,
      transaction,
    });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
};

// Fetch transactions by user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions", error: err });
  }
};
