const HoldingsModel = require("../models/HoldingsModel");

// Get all holdings
exports.getAllHoldings = async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.status(200).json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching holdings", error: err });
  }
};

// Add new holding
exports.addHolding = async (req, res) => {
  try {
    const newHolding = new HoldingsModel(req.body);
    await newHolding.save();
    res.status(201).json({ message: "Holding added", data: newHolding });
  } catch (err) {
    res.status(500).json({ message: "Error adding holding", error: err });
  }
};

// Delete holding
exports.deleteHolding = async (req, res) => {
  try {
    await HoldingsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Holding deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting holding", error: err });
  }
};
