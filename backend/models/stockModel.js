const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  changePercent: {
    type: Number,
    default: 0
  },
  sector: String,
  marketCap: Number,
  volume: Number,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Stock", stockSchema);