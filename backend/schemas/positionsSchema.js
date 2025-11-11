const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  averagePrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  pnl: { type: Number, required: true },
  type: { type: String, enum: ["long", "short"], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = PositionsSchema;
