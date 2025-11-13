const express = require("express");
const router = express.Router();
const {
  getUserHoldings,
  getPortfolioSummary,
  addHolding
} = require("../controllers/holdingsController");

// MATCHES: API.get(`/holdings/user/${userId}`)
router.get("/user/:userId", getUserHoldings);

// MATCHES: API.get(`/holdings/summary/${userId}`)
router.get("/summary/:userId", getPortfolioSummary);

// MATCHES: API.post("/holdings", holdingData)
router.post("/", addHolding);

module.exports = router;