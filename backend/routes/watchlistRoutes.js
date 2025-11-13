const express = require("express");
const router = express.Router();
const {
  getUserWatchlist,
  addToWatchlist,
  removeFromWatchlist
} = require("../controllers/watchlistController");

// MATCHES: API.get(`/watchlist/user/${userId}`)
router.get("/user/:userId", getUserWatchlist);

// MATCHES: API.post("/watchlist", watchlistData)
router.post("/", addToWatchlist);

// MATCHES: API.delete("/watchlist", { data: watchlistData })
router.delete("/", removeFromWatchlist);

module.exports = router;