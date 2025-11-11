const express = require("express");
const router = express.Router();
const { createLending, getUserLendings, completeLending } = require("../controllers/lendingController");

// POST: create a lending or borrowing record
router.post("/create", createLending);

// GET: fetch all lendings for a specific user
router.get("/:userId", getUserLendings);

// PUT: mark a lending record as completed
router.put("/complete/:id", completeLending);

module.exports = router;
