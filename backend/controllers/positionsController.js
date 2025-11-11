const PositionsModel = require("../models/positionModel");

// Get all positions
exports.getAllPositions = async (req, res) => {
  try {
    const positions = await PositionsModel.find();
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching positions", error: err });
  }
};

// Add a new position (triggered after an order is completed)
exports.addPosition = async (req, res) => {
  try {
    const newPosition = new PositionsModel(req.body);
    await newPosition.save();
    res.status(201).json({ message: "Position added", data: newPosition });
  } catch (err) {
    res.status(500).json({ message: "Error adding position", error: err });
  }
};

// Close position
exports.closePosition = async (req, res) => {
  try {
    await PositionsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Position closed" });
  } catch (err) {
    res.status(500).json({ message: "Error closing position", error: err });
  }
};
