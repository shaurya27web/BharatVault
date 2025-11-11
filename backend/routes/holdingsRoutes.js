const express = require("express");
const router = express.Router();
const holdingsController = require("../controllers/holdingsController");

// Routes
router.get("/", holdingsController.getAllHoldings);
router.post("/", holdingsController.addHolding);
router.delete("/:id", holdingsController.deleteHolding);

module.exports = router;
