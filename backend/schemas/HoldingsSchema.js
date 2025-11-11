const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = HoldingsSchema;
