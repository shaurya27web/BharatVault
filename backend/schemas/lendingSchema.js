const mongoose = require("mongoose");

const lendingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["lend", "borrow"],
    required: true,
  },
  interestRate: {
    type: Number,
    default: 5,
  },
  duration: {
    type: Number,
    default: 30, // days
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  totalPayable: {
    type: Number,
  },
});

module.exports = lendingSchema;
