const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["buy", "sell"], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = OrdersSchema;
