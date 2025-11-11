const LendingModel = require("../models/LendingModel");

// 📤 Create a new lending or borrowing record
exports.createLending = async (req, res) => {
  try {
    const { userId, amount, type, interestRate, duration } = req.body;

    if (!userId || !amount || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Simple Interest Calculation
    const totalPayable = amount + (amount * (interestRate || 5) * (duration || 30)) / (100 * 365) * duration;

    const lending = new LendingModel({
      userId,
      amount,
      type,
      interestRate,
      duration,
      totalPayable,
    });

    await lending.save();
    res.status(201).json({ message: "Lending record created successfully", lending });
  } catch (err) {
    console.error("Error creating lending:", err);
    res.status(500).json({ message: "Error creating lending record", error: err });
  }
};

// 📋 Get all lending/borrowing records for a user
exports.getUserLendings = async (req, res) => {
  try {
    const { userId } = req.params;
    const lendings = await LendingModel.find({ userId });

    res.status(200).json(lendings);
  } catch (err) {
    console.error("Error fetching lendings:", err);
    res.status(500).json({ message: "Error fetching lendings", error: err });
  }
};

// ✅ Mark lending as completed
exports.completeLending = async (req, res) => {
  try {
    const { id } = req.params;

    const lending = await LendingModel.findById(id);
    if (!lending) return res.status(404).json({ message: "Lending record not found" });

    lending.status = "completed";
    lending.endDate = new Date();
    await lending.save();

    res.status(200).json({ message: "Lending marked as completed", lending });
  } catch (err) {
    console.error("Error completing lending:", err);
    res.status(500).json({ message: "Error completing lending", error: err });
  }
};
