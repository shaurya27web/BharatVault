const express = require("express");
const router = express.Router();
const holdingsController = require("../controllers/holdingsController");

// ✅ Base route for holdings
router.get("/", holdingsController.getAllHoldings);
router.post("/", holdingsController.addHolding);
router.delete("/:id", holdingsController.deleteHolding);

module.exports = router;
