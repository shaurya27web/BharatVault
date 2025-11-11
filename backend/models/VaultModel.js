// backend/models/VaultModel.js
const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

const VaultModel = mongoose.model("Vault", vaultSchema);
module.exports = VaultModel;
