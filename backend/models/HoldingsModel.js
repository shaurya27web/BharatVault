const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: String, default: "0.00" },
  day: { type: String, default: "0.00" },
  isLoss: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

// ✅ consistent name (Holdings)
module.exports = mongoose.model("Holdings", HoldingsSchema);
