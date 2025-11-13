const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  placeOrder
} = require("../controllers/ordersController");

// MATCHES: API.get(`/orders/user/${userId}`)
router.get("/user/:userId", getUserOrders);

// MATCHES: API.post("/orders", orderData)
router.post("/", placeOrder);

module.exports = router;