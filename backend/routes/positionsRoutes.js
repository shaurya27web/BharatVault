const express = require("express");
const router = express.Router();
const positionsController = require("../controllers/positionsController");

// Routes
router.get("/", positionsController.getAllPositions);
router.post("/", positionsController.addPosition);
router.delete("/:id", positionsController.closePosition);

module.exports = router;
