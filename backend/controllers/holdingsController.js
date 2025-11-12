const HoldingsModel = require("../models/HoldingsModel");

// ✅ GET all holdings
exports.getAllHoldings = async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.status(200).json(holdings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ message: "Error fetching holdings", error });
  }
};

// ✅ POST new holding
exports.addHolding = async (req, res) => {
  try {
    const newHolding = new HoldingsModel(req.body);
    await newHolding.save();
    res.status(201).json({ message: "Holding added successfully", data: newHolding });
  } catch (error) {
    console.error("Error adding holding:", error);
    res.status(500).json({ message: "Error adding holding", error });
  }
};

// ✅ DELETE holding by ID
exports.deleteHolding = async (req, res) => {
  try {
    const deleted = await HoldingsModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Holding not found" });
    res.status(200).json({ message: "Holding deleted successfully" });
  } catch (error) {
    console.error("Error deleting holding:", error);
    res.status(500).json({ message: "Error deleting holding", error });
  }
};
