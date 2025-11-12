const Transaction = require("../models/TransactionModel");
const User = require("../models/UserModel");

// Handle Add / Withdraw
exports.handleTransaction = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;

    if (!userId || !amount || !type) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields: userId, amount, type" 
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Amount must be greater than 0" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    if (type === "withdraw" && user.balance < amount) {
      return res.status(400).json({ 
        success: false,
        message: "Insufficient balance" 
      });
    }

    // Update balance
    user.balance = type === "add" ? user.balance + amount : user.balance - amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({ 
      userId, 
      amount, 
      type,
      status: "completed",
      balanceAfter: user.balance
    });
    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction successful",
      newBalance: user.balance,
      transaction: {
        id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.createdAt
      }
    });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ 
      success: false,
      message: "Transaction failed", 
      error: err.message 
    });
  }
};

// Get transactions by user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      transactions
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching transactions", 
      error: err.message 
    });
  }
};