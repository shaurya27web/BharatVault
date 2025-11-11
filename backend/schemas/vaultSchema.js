const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  totalDeposits: { type: Number, default: 0 },
  totalWithdrawals: { type: Number, default: 0 },
  totalLent: { type: Number, default: 0 },
  totalBorrowed: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = vaultSchema;
