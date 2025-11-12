const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },      // ✅ use "qty" instead of "quantity"
  avg: { type: Number, required: true },      // ✅ add avg cost to match frontend
  price: { type: Number, required: true },
  net: { type: String, default: "0" },        // optional
  day: { type: String, default: "0" },        // optional
  isLoss: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = HoldingsSchema;
