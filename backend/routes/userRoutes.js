const express = require("express");
const router = express.Router();
const {
  syncUser,
  getUserByClerkId,
  getUserById
} = require("../controllers/userController");

// Sync Clerk user with MongoDB
router.post("/sync", syncUser);

// Get user by Clerk ID
router.get("/clerk/:clerkId", getUserByClerkId);

// Get user by MongoDB ID
router.get("/:userId", getUserById);

module.exports = router;